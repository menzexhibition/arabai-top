export function createWallet(initialCredits = 0) {
  return {
    creditBalance: initialCredits,
    pendingCreditBalance: 0,
    redeemableCreditBalance: initialCredits,
    reservedCreditBalance: 0,
    transactions: []
  };
}

export function addCredits(wallet, transaction) {
  requirePositiveCredits(transaction.credits);
  wallet.creditBalance += transaction.credits;
  wallet.redeemableCreditBalance += transaction.credits;
  wallet.transactions.push({
    ...transaction,
    status: transaction.status || "available",
    createdAt: new Date().toISOString()
  });
  return wallet;
}

export function reserveCredits(wallet, taskId, credits) {
  requirePositiveCredits(credits);
  if (wallet.redeemableCreditBalance < credits) {
    throw new Error("Not enough redeemable credits.");
  }

  wallet.redeemableCreditBalance -= credits;
  wallet.reservedCreditBalance += credits;
  wallet.transactions.push({
    type: "reserve",
    taskId,
    credits,
    status: "reserved",
    createdAt: new Date().toISOString()
  });
  return wallet;
}

export function completeReservedSpend(wallet, taskId, reservedCredits, actualCredits = reservedCredits) {
  requirePositiveCredits(reservedCredits);
  requirePositiveCredits(actualCredits);
  if (actualCredits > reservedCredits) {
    throw new Error("Actual credits cannot exceed reserved credits in the first launch flow.");
  }
  if (wallet.reservedCreditBalance < reservedCredits) {
    throw new Error("Not enough reserved credits.");
  }

  wallet.reservedCreditBalance -= reservedCredits;
  wallet.creditBalance -= actualCredits;

  const releasedCredits = reservedCredits - actualCredits;
  if (releasedCredits > 0) {
    wallet.redeemableCreditBalance += releasedCredits;
  }

  wallet.transactions.push({
    type: "spend",
    taskId,
    credits: actualCredits,
    status: "spent",
    createdAt: new Date().toISOString()
  });

  if (releasedCredits > 0) {
    wallet.transactions.push({
      type: "release",
      taskId,
      credits: releasedCredits,
      status: "available",
      createdAt: new Date().toISOString()
    });
  }

  return wallet;
}

export function failReservedTask(wallet, taskId, reservedCredits) {
  requirePositiveCredits(reservedCredits);
  if (wallet.reservedCreditBalance < reservedCredits) {
    throw new Error("Not enough reserved credits.");
  }

  wallet.reservedCreditBalance -= reservedCredits;
  wallet.redeemableCreditBalance += reservedCredits;
  wallet.transactions.push({
    type: "refund",
    taskId,
    credits: reservedCredits,
    status: "available",
    createdAt: new Date().toISOString()
  });
  return wallet;
}

function requirePositiveCredits(credits) {
  if (typeof credits !== "number" || credits <= 0) {
    throw new Error("Credits must be a positive number.");
  }
}

