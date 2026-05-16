import { rewardRules } from "../config/credits.js";
import { createWallet } from "../services/wallet.js";
import { grantFoundingUserRewardRoute, grantSignupRewardRoute } from "./wallet-routes.js";

export function verifiedSigninRoute({ user, currentRegistrationCount, currentFoundingRewardCount }) {
  if (!user.verified) {
    throw new Error("User must verify email or phone before registration is completed.");
  }

  const isNewUser = !user.registrationNumber;
  if (isNewUser) {
    user.registrationNumber = currentRegistrationCount + 1;
  }

  const wallet = user.wallet || createWallet(0);
  if (!user.signupRewardGranted) {
    grantSignupRewardRoute({ wallet, user });
  }

  const rule = rewardRules.foundingUserCampaign;
  let foundingUserReward = {
    eligible: false,
    granted: false,
    credits: 0,
    remainingSlots: Math.max(rule.maxUsers - currentFoundingRewardCount, 0)
  };

  if (rule.enabled && !user.foundingUserRewardGranted) {
    const eligibleByCount = currentFoundingRewardCount < rule.maxUsers;
    foundingUserReward = {
      eligible: eligibleByCount,
      granted: false,
      credits: eligibleByCount ? rule.credits : 0,
      remainingSlots: Math.max(rule.maxUsers - currentFoundingRewardCount, 0)
    };

    if (eligibleByCount) {
      grantFoundingUserRewardRoute({
        wallet,
        user,
        campaignCount: currentFoundingRewardCount
      });
      foundingUserReward.granted = true;
    }
  }

  user.wallet = wallet;

  return {
    isNewUser,
    user: {
      id: user.id,
      email: user.email,
      registrationNumber: user.registrationNumber,
      verified: user.verified
    },
    wallet,
    foundingUserReward,
    message: buildRegistrationMessage({
      registrationNumber: user.registrationNumber,
      foundingUserReward
    })
  };
}

function buildRegistrationMessage({ registrationNumber, foundingUserReward }) {
  if (foundingUserReward.granted) {
    return `You are ARABAI user #${registrationNumber}. Your early user trial credits have been added.`;
  }
  return `You are ARABAI user #${registrationNumber}.`;
}
