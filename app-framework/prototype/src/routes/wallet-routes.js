import { packages, rewardRules } from "../config/credits.js";
import { addCredits } from "../services/wallet.js";

export function getWalletRoute({ wallet }) {
  return {
    creditBalance: wallet.creditBalance,
    pendingCreditBalance: wallet.pendingCreditBalance,
    redeemableCreditBalance: wallet.redeemableCreditBalance,
    reservedCreditBalance: wallet.reservedCreditBalance,
    transactions: wallet.transactions
  };
}

export function getPackagesRoute() {
  return packages.map((item) => ({
    id: item.id,
    label: item.label,
    priceAmount: item.priceAmount,
    currency: item.currency,
    credits: item.credits,
    enabled: item.enabled,
    status: item.enabled ? "available" : "coming_soon"
  }));
}

export function grantSignupRewardRoute({ wallet, user }) {
  if (!user.verified) {
    throw new Error("User must verify email or phone before signup reward.");
  }
  if (user.signupRewardGranted) {
    throw new Error("Signup reward already granted.");
  }

  addCredits(wallet, {
    type: "signup_reward",
    credits: rewardRules.signupVerified.credits,
    note: "Verified signup reward"
  });

  user.signupRewardGranted = true;
  return getWalletRoute({ wallet });
}

export function grantFoundingUserRewardRoute({ wallet, user, campaignCount }) {
  const rule = rewardRules.foundingUserCampaign;
  if (!rule.enabled) {
    throw new Error("Founding user campaign is not enabled.");
  }
  if (!user.verified) {
    throw new Error("User must verify email or phone before founding user reward.");
  }
  if (user.foundingUserRewardGranted) {
    throw new Error("Founding user reward already granted.");
  }
  if (campaignCount >= rule.maxUsers) {
    throw new Error("Founding user campaign limit reached.");
  }

  addCredits(wallet, {
    type: "founding_user_reward",
    credits: rule.credits,
    note: "First 100 verified users starter credit campaign"
  });

  user.foundingUserRewardGranted = true;
  return getWalletRoute({ wallet });
}

export function claimDailyLoginRewardRoute({ wallet, user, now = new Date() }) {
  if (!user?.verified) {
    throw new Error("User must verify email or phone before daily reward.");
  }

  const todayKey = now.toISOString().slice(0, 10);
  const dailyTransactions = wallet.transactions.filter((item) => item.type === "daily_login_reward");

  if (dailyTransactions.some((item) => String(item.createdAt || "").slice(0, 10) === todayKey)) {
    throw new Error("Daily login reward already claimed today.");
  }

  const weekStart = startOfWeek(now);
  const weekCredits = dailyTransactions.reduce((sum, item) => {
    const createdAt = new Date(item.createdAt || 0);
    if (Number.isNaN(createdAt.getTime()) || createdAt < weekStart) return sum;
    return sum + Number(item.credits || 0);
  }, 0);

  if (weekCredits >= rewardRules.dailyLogin.weeklyCap) {
    throw new Error("Weekly daily-login reward cap reached.");
  }

  const remainingWeeklyCredits = rewardRules.dailyLogin.weeklyCap - weekCredits;
  const credits = Math.max(
    rewardRules.dailyLogin.minCredits,
    Math.min(rewardRules.dailyLogin.maxCredits, remainingWeeklyCredits)
  );

  addCredits(wallet, {
    type: "daily_login_reward",
    credits,
    note: "Daily login reward",
    createdAt: now.toISOString()
  });

  return {
    credits,
    wallet: getWalletRoute({ wallet })
  };
}

export function grantReferralRegistrationRewardRoute({ wallet, referrer, referredUser, now = new Date() }) {
  if (!referrer?.verified) {
    throw new Error("Referrer must be verified.");
  }
  if (!referredUser?.verified) {
    throw new Error("Referred user must be verified.");
  }

  addCredits(wallet, {
    type: "referral_reward",
    credits: rewardRules.referralVerifiedRegistration.credits,
    note: `Verified referral reward for user #${referredUser.registrationNumber || "new"}`,
    createdAt: now.toISOString()
  });

  return {
    credits: rewardRules.referralVerifiedRegistration.credits,
    wallet: getWalletRoute({ wallet })
  };
}

function startOfWeek(now) {
  const date = new Date(now);
  const day = date.getDay();
  const diff = day === 0 ? 6 : day - 1;
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() - diff);
  return date;
}
