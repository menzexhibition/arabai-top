import { packages, pricingRules } from "../src/config/credits.js";
import { estimateTaskCredits } from "../src/services/pricing.js";
import { createWallet, reserveCredits } from "../src/services/wallet.js";

const wallet = createWallet(100);
let selectedTask = null;
let selectedEstimate = null;

const packageGrid = document.querySelector("#packageGrid");
const taskGrid = document.querySelector("#taskGrid");
const estimateTitle = document.querySelector("#estimateTitle");
const estimateMessage = document.querySelector("#estimateMessage");
const confirmButton = document.querySelector("#confirmButton");

renderWallet();
renderPackages();
renderTasks();

confirmButton.addEventListener("click", () => {
  if (!selectedTask || !selectedEstimate?.estimatedCredits) return;

  try {
    reserveCredits(wallet, `demo-${Date.now()}`, selectedEstimate.estimatedCredits);
    renderWallet();
    estimateTitle.textContent = "تم حجز الرصيد لهذه المهمة";
    estimateMessage.textContent = "في التطبيق الحقيقي ستدخل المهمة الآن إلى التشغيل أو قائمة الانتظار.";
    confirmButton.disabled = true;
  } catch (error) {
    estimateTitle.textContent = "لا يوجد رصيد كاف";
    estimateMessage.textContent = error instanceof Error ? error.message : "حدث خطأ.";
  }
});

function renderWallet() {
  document.querySelector("#creditBalance").textContent = wallet.creditBalance.toFixed(0);
  document.querySelector("#redeemableBalance").textContent = wallet.redeemableCreditBalance.toFixed(0);
  document.querySelector("#reservedBalance").textContent = wallet.reservedCreditBalance.toFixed(0);
}

function renderPackages() {
  packageGrid.innerHTML = packages
    .slice(0, 4)
    .map(
      (item) => `
        <article>
          <span>${item.currency}</span>
          <h3>${formatPrice(item)}</h3>
          <p>${item.credits} credits</p>
          <p>Coming Soon - التكلفة الحقيقية للـ API لا تتجاوز تقريبا 50% من قيمة الباقة.</p>
        </article>
      `
    )
    .join("");
}

function renderTasks() {
  const visibleRules = [
    "premium_short_chat",
    "prompt_improvement",
    "premium_long_answer",
    "long_document_summary",
    "image_prompt_review",
    "image_generation_low",
    "ppt_outline",
    "video_script"
  ];

  taskGrid.innerHTML = pricingRules
    .filter((rule) => visibleRules.includes(rule.id))
    .map(
      (rule) => `
        <article data-rule-id="${rule.id}">
          <span>${translateCost(rule.costLevel)}</span>
          <h3>${translateTask(rule.id)}</h3>
          <p>${rule.minCredits === rule.maxCredits ? rule.minCredits : `${rule.minCredits}-${rule.maxCredits}`} credits</p>
          <p>${rule.freeCreditsAllowed ? "يمكن استخدام الرصيد المجاني ضمن الحدود." : "يتطلب رصيدا مدفوعا غالبا."}</p>
        </article>
      `
    )
    .join("");

  taskGrid.querySelectorAll("article").forEach((card) => {
    card.addEventListener("click", () => {
      taskGrid.querySelectorAll("article").forEach((item) => item.classList.remove("active"));
      card.classList.add("active");
      selectedTask = card.dataset.ruleId;
      selectedEstimate = estimateTaskCredits({
        pricingRuleId: selectedTask,
        taskType: pricingRules.find((rule) => rule.id === selectedTask).taskType,
        prompt: "Demo prompt for ARABAI app prototype.",
        options: { quality: selectedTask.includes("image") ? "standard" : "normal" }
      });
      renderEstimate();
    });
  });
}

function renderEstimate() {
  if (!selectedEstimate.available) {
    estimateTitle.textContent = "هذه المهمة قادمة لاحقا";
    estimateMessage.textContent = selectedEstimate.message;
    confirmButton.disabled = true;
    return;
  }

  estimateTitle.textContent = `${selectedEstimate.estimatedCredits} credits`;
  estimateMessage.textContent = `${selectedEstimate.message} ${
    selectedEstimate.freeCreditsAllowed ? "يمكن استخدام الرصيد المجاني ضمن الحدود." : "هذه المهمة لا تستخدم الرصيد المجاني."
  }`;
  confirmButton.disabled = false;
}

function formatPrice(item) {
  if (item.currency === "USD") return `$${item.priceAmount}`;
  return `${item.priceAmount} SAR`;
}

function translateCost(level) {
  return {
    low: "تكلفة منخفضة",
    medium: "تكلفة متوسطة",
    high: "تكلفة مرتفعة",
    manual: "تسعير يدوي"
  }[level] || level;
}

function translateTask(id) {
  return {
    premium_short_chat: "اسأل نموذجا أقوى",
    prompt_improvement: "حسّن البرومبت",
    premium_long_answer: "إجابة أطول وأقوى",
    long_document_summary: "تلخيص نص طويل",
    image_prompt_review: "برومبت صورة ومراجعة",
    image_generation_low: "توليد صورة بسيطة",
    ppt_outline: "مخطط عرض تقديمي",
    video_script: "سكربت فيديو قصير"
  }[id] || id;
}
