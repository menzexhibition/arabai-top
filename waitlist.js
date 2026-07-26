const WAITLIST_ENDPOINT = "https://testapi.arabai.top/api/waitlist";

document.querySelectorAll("[data-waitlist-form]").forEach((form) => {
  const status = form.querySelector("[data-waitlist-status]");
  const submit = form.querySelector('button[type="submit"]');
  form.noValidate = true;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const email = String(data.get("email") || "").trim();
    const whatsapp = String(data.get("whatsapp") || "").trim();

    if (!email && !whatsapp) {
      showStatus(status, "أدخل البريد الإلكتروني أو رقم WhatsApp.", "error");
      return;
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showStatus(status, "تحقق من عنوان البريد الإلكتروني.", "error");
      return;
    }
    const normalizedWhatsapp = whatsapp.startsWith("+") ? `+${whatsapp.replace(/\D/g, "")}` : whatsapp.replace(/\D/g, "");
    if (whatsapp && !/^\+[1-9]\d{7,14}$/.test(normalizedWhatsapp)) {
      showStatus(status, "اكتب رقم WhatsApp مع مفتاح الدولة، مثل +966.", "error");
      return;
    }
    if (data.get("consent") !== "on") {
      showStatus(status, "يجب الموافقة على استلام إشعار الإطلاق.", "error");
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const payload = {
      email,
      whatsapp,
      country: String(data.get("country") || ""),
      interestedModels: String(data.get("interestedModels") || form.dataset.modelInterest || ""),
      intendedUse: String(data.get("intendedUse") || ""),
      consent: true,
      website: String(data.get("website") || ""),
      sourcePage: window.location.href,
      referrer: document.referrer,
      utmSource: params.get("utm_source") || "",
      utmMedium: params.get("utm_medium") || "",
      utmCampaign: params.get("utm_campaign") || ""
    };

    submit.disabled = true;
    showStatus(status, "جارٍ تسجيل طلبك...", "pending");
    try {
      const response = await fetch(WAITLIST_ENDPOINT, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.persisted) {
        throw new Error(result.error?.message || "تعذر حفظ الطلب الآن. حاول مرة أخرى لاحقا.");
      }
      form.reset();
      showStatus(status, "تم تسجيلك في القائمة المبكرة. سنرسل لك إشعارا عند فتح الخدمة.", "success");
      window.gtag?.("event", "waitlist_signup", {
        page_path: window.location.pathname,
        contact_method: email && whatsapp ? "email_whatsapp" : email ? "email" : "whatsapp"
      });
    } catch (error) {
      showStatus(status, error instanceof Error ? error.message : "تعذر حفظ الطلب الآن.", "error");
    } finally {
      submit.disabled = false;
    }
  });
});

function showStatus(element, message, state) {
  if (!element) return;
  element.textContent = message;
  element.dataset.state = state;
}
