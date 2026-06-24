import { randomUUID } from "node:crypto";

const SUPABASE_URL = process.env.SUPABASE_URL || "";
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

export function createSupabaseStore() {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) return null;

  return {
    isReady: true,
    diagnostics() {
      return supabaseDiagnostics();
    },
    async findUserById(id) {
      const rows = await selectRows("users", { id });
      return rows[0] || null;
    },
    async findUserByEmail(email) {
      const rows = await selectRows("users", { email });
      return rows[0] || null;
    },
    async findUserByPhone(phone) {
      const rows = await selectRows("users", { phone });
      return rows[0] || null;
    },
    async findUserByEmailOrPhone({ email, phone }) {
      if (email) {
        const byEmail = await this.findUserByEmail(email);
        if (byEmail) return byEmail;
      }
      if (phone) {
        const byPhone = await this.findUserByPhone(phone);
        if (byPhone) return byPhone;
      }
      return null;
    },
    async findUserByReferralCode(referralCode) {
      const rows = await selectRows("users", { referral_code: referralCode });
      return rows[0] || null;
    },
    async countUsers() {
      const rows = await selectRows("users", {}, ["id"]);
      return rows.length;
    },
    async createUser(user) {
      const rows = await insertRows("users", [user]);
      return rows[0] || null;
    },
    async updateUser(id, patch) {
      const rows = await patchRows("users", { id }, patch);
      return rows[0] || null;
    },
    async countFoundingRewardsGranted() {
      const rows = await selectRows("users", { founding_user_reward_granted: "eq.true" }, ["id"]);
      return rows.length;
    },
    async getWallet(userId) {
      const rows = await selectRows("wallets", { user_id: userId });
      return rows[0] || null;
    },
    async upsertWallet(userId, wallet) {
      const rows = await upsertRows(
        "wallets",
        [
          {
            user_id: userId,
            credit_balance: numberOrZero(wallet.creditBalance),
            pending_credit_balance: numberOrZero(wallet.pendingCreditBalance),
            redeemable_credit_balance: numberOrZero(wallet.redeemableCreditBalance),
            reserved_credit_balance: numberOrZero(wallet.reservedCreditBalance),
            updated_at: new Date().toISOString()
          }
        ],
        "user_id"
      );
      return rows[0] || null;
    },
    async listTransactions(userId, limit = 50) {
      return selectRows(
        "wallet_transactions",
        { user_id: userId },
        [
          "id",
          "user_id",
          "type",
          "status",
          "credits",
          "money_amount",
          "currency",
          "provider",
          "provider_reference",
          "source_id",
          "reviewed_by",
          "reviewed_at",
          "note",
          "created_at"
        ],
        `created_at.asc&limit=${limit}`
      );
    },
    async findTransactionByProviderReference(provider, providerReference) {
      const rows = await selectRows(
        "wallet_transactions",
        { provider, provider_reference: providerReference },
        ["id", "user_id", "provider", "provider_reference", "created_at"],
        "limit=1"
      );
      return rows[0] || null;
    },
    async insertTransactions(userId, transactions) {
      if (!transactions.length) return [];
      return insertRows(
        "wallet_transactions",
        transactions.map((transaction) => ({
          id: randomUUID(),
          user_id: userId,
          type: transaction.type,
          status: transaction.status || "available",
          credits: numberOrZero(transaction.credits),
          money_amount: transaction.moneyAmount ?? null,
          currency: transaction.currency || "SAR",
          provider: transaction.provider || null,
          provider_reference: transaction.providerReference || null,
          source_id: transaction.sourceId || null,
          note: transaction.note || null,
          created_at: transaction.createdAt || new Date().toISOString()
        }))
      );
    },
    async createReferral(referral) {
      const rows = await insertRows("referrals", [referral]);
      return rows[0] || null;
    },
    async listReferrals(referrerUserId, limit = 20) {
      return selectRows(
        "referrals",
        { referrer_user_id: referrerUserId },
        ["id", "referrer_user_id", "referred_user_id", "status", "reward_credits", "created_at", "verified_at", "rewarded_at"],
        `order=created_at.desc&limit=${limit}`
      );
    },
    async getTask(taskId) {
      const rows = await selectRows("ai_tasks", { id: taskId });
      return rows[0] || null;
    },
    async listTasks(userId, limit = 20) {
      return selectRows(
        "ai_tasks",
        { user_id: userId },
        [
          "id",
          "task_type",
          "pricing_rule_id",
          "status",
          "estimated_credits",
          "actual_credits",
          "output_text",
          "output_url",
          "created_at",
          "completed_at"
        ],
        `order=created_at.desc&limit=${limit}`
      );
    },
    async insertTask(task) {
      const rows = await insertRows("ai_tasks", [task]);
      return rows[0] || null;
    },
    async updateTask(taskId, patch) {
      const rows = await patchRows("ai_tasks", { id: taskId }, patch);
      return rows[0] || null;
    }
  };
}

async function selectRows(table, filters = {}, columns = ["*"], orderQuery = "") {
  const params = new URLSearchParams();
  params.set("select", columns.join(","));
  for (const [key, value] of Object.entries(filters)) {
    if (value === undefined || value === null || value === "") continue;
    if (value === "eq.true" || value === "eq.false") {
      params.set(key, value);
    } else {
      params.set(key, `eq.${value}`);
    }
  }
  const query = orderQuery ? `&${orderQuery}` : "";
  const response = await request(`/rest/v1/${table}?${params.toString()}${query}`, { method: "GET" });
  return response.ok ? response.json() : [];
}

async function insertRows(table, rows) {
  const response = await request(`/rest/v1/${table}`, {
    method: "POST",
    headers: {
      Prefer: "return=representation"
    },
    body: JSON.stringify(rows)
  });
  await assertOk(response, `insert ${table}`);
  return response.json();
}

async function patchRows(table, filters, patch) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(filters)) {
    params.set(key, `eq.${value}`);
  }
  const response = await request(`/rest/v1/${table}?${params.toString()}`, {
    method: "PATCH",
    headers: {
      Prefer: "return=representation"
    },
    body: JSON.stringify(patch)
  });
  await assertOk(response, `patch ${table}`);
  return response.json();
}

async function upsertRows(table, rows, conflict) {
  const response = await request(`/rest/v1/${table}?on_conflict=${conflict}`, {
    method: "POST",
    headers: {
      Prefer: "resolution=merge-duplicates,return=representation"
    },
    body: JSON.stringify(rows)
  });
  await assertOk(response, `upsert ${table}`);
  return response.json();
}

async function request(path, init) {
  const url = buildSupabaseUrl(path);
  try {
    const response = await fetch(url, {
      ...init,
      headers: {
        apikey: SUPABASE_SERVICE_ROLE_KEY,
        authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        "content-type": "application/json",
        ...(init.headers || {})
      }
    });
    return response;
  } catch (error) {
    throw new Error(`Supabase request failed for ${safeUrlLabel(url)}: ${error instanceof Error ? error.message : "fetch failed"}`);
  }
}

async function assertOk(response, action) {
  if (response.ok) return;
  const text = await response.text();
  throw new Error(`Supabase ${action} failed (${response.status}): ${text.slice(0, 500)}`);
}

function numberOrZero(value) {
  const num = Number(value || 0);
  return Number.isFinite(num) ? num : 0;
}

function buildSupabaseUrl(path) {
  try {
    return new URL(path, SUPABASE_URL.endsWith("/") ? SUPABASE_URL : `${SUPABASE_URL}/`).toString();
  } catch {
    throw new Error("SUPABASE_URL must be a valid https://<project>.supabase.co URL.");
  }
}

function supabaseDiagnostics() {
  try {
    const url = new URL(SUPABASE_URL);
    return {
      protocol: url.protocol,
      host: url.host,
      path: url.pathname,
      looksLikeSupabaseUrl: url.protocol === "https:" && url.host.endsWith(".supabase.co")
    };
  } catch {
    return {
      protocol: "invalid",
      host: "invalid",
      path: "invalid",
      looksLikeSupabaseUrl: false
    };
  }
}

function safeUrlLabel(url) {
  try {
    const parsed = new URL(url);
    return `${parsed.protocol}//${parsed.host}${parsed.pathname}`;
  } catch {
    return "invalid Supabase URL";
  }
}
