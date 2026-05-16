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
