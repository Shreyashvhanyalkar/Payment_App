import { useEffect, useState } from "react";
import { db, ref, get, createOrder, verifyPayment, sendEmails } from "../firebase";
import LogoImg from "../assets/logo-ward vikas 1.png";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
// ─── Your 3 phone-screen images ───────────────────────────────────────────
import PhoneScreen1 from "../assets/phone-screen-4.png";
import PhoneScreen2 from "../assets/phone-screen-5.png";
import PhoneScreen3 from "../assets/phone-screen-6.png";
import PlayStoreImg from "../assets/playstore.png";
import AppStoreImg from "../assets/AppStore.png";

const PHONE_SCREENS = [PhoneScreen1, PhoneScreen2, PhoneScreen3];

// ─── Palette ───────────────────────────────────────────────────────────────────
const theme = {
  navy: "#062E52",
  teal: "#062E52",
  tealDark: "#04213C",
  tealLight: "#EAF0F5",
  ink: "#062E52",
  muted: "#64748b",
  danger: "#e5484d",
  success: "#062E52",
  lightBg: "#f8fafc",
  white: "#ffffff",
  accent: "#F5841F",
  accentDark: "#D9720F",
};

const APP_NAME = "Ward Vikas";
const APP_SUBTITLE = "Euspace Technologies";

// ─── Navigation Links ──────────────────────────────────────────────────────
const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "services", label: "Services" },
  { id: "features", label: "Features" },
  { id: "plans", label: "Pricing" },
  { id: "application", label: "Application" },
];



// ─── Phone Mockup Carousel ──────────────────────────────────────────────
function PhoneCarousel({ images, intervalMs = 3500 }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % images.length);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [images, intervalMs]);

  return (
    <div className="relative mx-auto w-[240px] sm:w-[270px] lg:w-[300px] rounded-2xl overflow-hidden shadow-2xl border border-white/20">
      {images.map((src, idx) => (
        <img
          key={idx}
          src={src}
          alt={`App screen ${idx + 1}`}
          className="w-full h-auto block transition-opacity duration-700 ease-in-out"
          style={{
            position: idx === 0 ? "relative" : "absolute",
            top: 0,
            left: 0,
            opacity: active === idx ? 1 : 0,
          }}
        />
      ))}
      {/* Dots */}
      <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 flex gap-1.5">
        {images.map((_, idx) => (
          <span
            key={idx}
            className={`h-1.5 rounded-full transition-all duration-300 ${active === idx ? "w-5 bg-white" : "w-1.5 bg-white/40"
              }`}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Banner ──────────────────────────────────────────────────────────────────
function Banner() {
  return (
    <section id="home" className="relative overflow-hidden rounded-3xl mb-16 sm:mb-24 bg-gradient-to-br from-[#062E52] via-[#0B3D63] to-[#062E52] shadow-2xl mt-20">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
      </div>

      <div className="relative px-6 sm:px-10 py-16 sm:py-20 md:py-24 flex flex-col lg:flex-row items-center justify-between gap-16">
        <div className="text-white max-w-2xl animate-fade-in-up">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
            Every ward work, <br />
            tracked from <br />
            <span className="text-[#EAF0F5] bg-gradient-to-r from-[#EAF0F5] to-white bg-clip-text text-transparent">
              proposal to completion.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-white/80 mt-6 max-w-lg leading-relaxed">
            {APP_NAME} keeps your tender files, PMC letters, and financial-year reports on your own phone —
            organised, backed up, and ready even without signal.
          </p>

          <div className="flex flex-wrap gap-4 mt-8">
            <button
              onClick={() => document.getElementById("plans")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-3.5 rounded-xl font-bold text-sm text-white shadow-lg transition-all hover:scale-105"
              style={{ backgroundColor: theme.accent }}
            >
              Register
            </button>

            <a
              href="#"
              className="flex items-center gap-3 px-5 py-3 rounded-xl border border-white/30 hover:bg-white/10 transition-all"
            >
              <img src={PlayStoreImg} alt="Google Play" className="h-7 w-7 object-contain" />
              <div className="text-left leading-tight">
                <p className="text-sm font-bold text-white">Play Store</p>
              </div>
            </a>

            <a
              href="#"
              className="flex items-center gap-3 px-5 py-3 rounded-xl border border-white/30 hover:bg-white/10 transition-all"
            >
              <img src={AppStoreImg} alt="Apple App Store" className="h-7 w-7 object-contain" />
              <div className="text-left leading-tight">
                <p className="text-sm font-bold text-white">App Store</p>
              </div>
            </a>
          </div>
        </div>

        <div className="flex-shrink-0 animate-float">
          <PhoneCarousel images={PHONE_SCREENS} />
        </div>
      </div>
    </section>
  );
}

// ─── Static single-screen image ──────────────────────────────────────────
function PhoneFrame({ src, alt }) {
  return (
    <div className="relative w-[220px] sm:w-[240px] lg:w-[260px] mx-auto rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
      <img src={src} alt={alt} className="w-full h-auto block" />
    </div>
  );
}

// ─── "Inside the App" Section ───────────────────────────────────────────────
const APP_SCREENS = [
  { src: PhoneScreen1, label: "Dashboard" },
  { src: PhoneScreen2, label: "Work Progress Tracking" },
  { src: PhoneScreen3, label: "Work List" },
];

function InsideAppSection() {
  return (
    <section id="application" className="mb-16 sm:mb-24">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="inline-block text-xs font-bold uppercase tracking-widest mb-3" style={{ color: theme.accent }}>
          Inside the app
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight" style={{ color: theme.navy }}>
          Built for a corporator's desk, and for the field.
        </h2>
        <p className="text-base text-slate-500 mt-4 max-w-2xl mx-auto leading-relaxed">
          A quick look at three screens you'll use most once {APP_NAME} is activated.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-6 justify-items-center">
        {APP_SCREENS.map((screen, idx) => (
          <PhoneFrame key={idx} src={screen.src} alt={screen.label} />
        ))}
      </div>
    </section>
  );
}

const REGISTRATION_STEPS = [
  {
    title: "Website registration",
    desc: "You submit your details through the registration form below.",
  },
  {
    title: "Admin approval",
    desc: "Euspace Technologies verifies your ward and corporator details.",
  },
  {
    title: "License key generated",
    desc: "A unique activation key is created and tied to your subscription.",
  },
  {
    title: "Email + SMS sent",
    desc: "Your key, download link, and user guide arrive within 24 hours.",
  },
  {
    title: "Install the app",
    desc: "Download Ward Vikas and open it on your device.",
  },
  {
    title: "Activate with your key",
    desc: "Enter your mobile number and activation key to unlock full access.",
  },
  {
    title: "Dashboard",
    desc: "You're in — start logging works for your ward straight away.",
  },
];

function FeatureCarousel() {
  return (
    <section id="features" className="mb-16 sm:mb-24">
      <div className="max-w-3xl mx-auto mb-12 text-center">
        <span className="inline-block text-xs font-bold uppercase tracking-widest mb-3" style={{ color: theme.accent }}>
          How registration moves
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight" style={{ color: theme.navy }}>
          From your registration to an active app, in seven desks.
        </h2>
        <p className="text-base text-slate-500 mt-4 max-w-2xl mx-auto leading-relaxed">
          Every registration follows the same routing, the way a file moves through PMC — checked,
          approved, and stamped before it reaches your phone.
        </p>
      </div>

      <div className="rounded-2xl border border-dashed border-sky-300 overflow-hidden">
        {REGISTRATION_STEPS.map((step, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-4 sm:gap-6 px-5 sm:px-8 py-6 ${idx !== REGISTRATION_STEPS.length - 1 ? "border-b border-dashed border-sky-300" : ""
              }`}
          >
            <div className="w-9 h-9 shrink-0 rounded-full bg-slate-100 flex items-center justify-center font-extrabold text-sm" style={{ color: theme.navy }}>
              {idx + 1}
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg text-slate-400 mb-1">
                {step.title}
              </h3>
              <p className="text-sm sm:text-base text-slate-700">
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── "What's Inside" Section ──────────────────────────────────────────────
const WHATS_INSIDE_ITEMS = [
  {
    title: "Tender lifecycle",
    desc: "Move a work from proposal to tender to completion without losing the paper trail along the way.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke={theme.navy} strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    title: "Document storage",
    desc: "Attach scanned PMC letters, sanction copies, and site photos to the exact work they belong to.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke={theme.navy} strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V8.414a1 1 0 00-.293-.707l-4.414-4.414A1 1 0 0013.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 13h6M9 17h6" />
      </svg>
    ),
  },
  {
    title: "Reports",
    desc: "Pull a financial-year summary of every work in your ward, ready to hand across in a few taps.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke={theme.navy} strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 17V9m4 8V5m4 12v-4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 21h16" />
      </svg>
    ),
  },
  {
    title: "Offline first",
    desc: "Log site visits and update statuses in the field. Everything is saved locally and syncs when you're ready.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke={theme.navy} strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.111 16.404a5.5 5.5 0 017.778 0M5.05 13.343a9.9 9.9 0 0113.9 0M2 10.283a14 14 0 0120 0" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 20h.01" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18" />
      </svg>
    ),
  },
];

function ServicesSection() {
  return (
    <section id="services" className="mb-16 sm:mb-24">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="inline-block text-xs font-bold uppercase tracking-widest mb-4" style={{ color: theme.accent }}>
          What's inside
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight" style={{ color: theme.navy }}>
          A single register for every work in your ward.
        </h2>
        <p className="text-base text-slate-600 mt-4 max-w-2xl mx-auto leading-relaxed">
          No more chasing paper across desks. {APP_NAME} gives every tender a home, from the first
          proposal letter to the final completion certificate.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
        {WHATS_INSIDE_ITEMS.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center text-center">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
              style={{ backgroundColor: theme.tealLight }}
            >
              {item.icon}
            </div>
            <h3 className="font-bold text-base mb-2" style={{ color: theme.navy }}>
              {item.title}
            </h3>
            <p className="text-sm leading-relaxed text-slate-500 max-w-[240px]">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── CheckIcon ─────────────────────────────────────────────────────────────
function CheckIcon({ color }) {
  return (
    <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={2}>
      <circle cx="12" cy="12" r="9" strokeOpacity="0.35" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 12.5l2.5 2.5L16 9" />
    </svg>
  );
}

// ─── PlanCard ──────────────────────────────────────────────────────────────
function PlanCard({ plan, index, selected, onSelect }) {
  const isSelected = selected?.id === plan.id;
  const isRecommended = plan.recommended;

  return (
    <div
      className={`plan-card relative rounded-2xl bg-white flex flex-col transition-all duration-300 ease-out border ${isSelected ? "shadow-2xl -translate-y-2" : "shadow-md hover:-translate-y-1 hover:shadow-xl"
        }`}
      style={{
        animationDelay: `${index * 100}ms`,
        borderColor: isSelected ? theme.accent : "#e2e8f0",
        borderWidth: isSelected ? "2px" : "1px",
      }}
    >
      {isRecommended && (
        <div
          className="absolute -top-3 left-6 px-3 py-1 rounded-full text-[11px] font-bold text-white shadow-md"
          style={{ backgroundColor: theme.navy }}
        >
          Recommended · {plan.label}
        </div>
      )}
      <div className="p-6 sm:p-7 flex flex-col flex-1">
        <span
          className="inline-block w-fit text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-md border mb-8"
          style={{ borderColor: theme.navy, color: theme.navy }}
        >
          {plan.label}
        </span>

        <div className="flex items-end gap-1 mb-1">
          <span className="text-xl font-extrabold" style={{ color: isRecommended ? theme.accent : theme.ink }}>₹</span>
          <span className="text-4xl font-extrabold leading-none" style={{ color: isRecommended ? theme.accent : theme.ink }}>
            {plan.price}
          </span>
          <span className="text-sm mb-1 text-slate-400">/ {plan.priceSuffix}</span>
        </div>

        <p className="text-base font-bold mt-3" style={{ color: isRecommended ? theme.accent : theme.navy }}>
          {plan.name} plan
        </p>
        <p className="text-sm mt-1 leading-relaxed" style={{ color: isRecommended ? theme.accent : theme.muted }}>
          {plan.tagline}
        </p>

        <div className="border-t border-dashed border-slate-200 my-5" />

        <div className="flex items-center gap-2 text-sm mb-6">
          <CheckIcon color={isRecommended ? theme.accent : theme.success} />
          <span className="text-slate-600">{plan.durationValue} {plan.durationUnit} of full access</span>
        </div>

        <button
          onClick={() => onSelect(plan)}
          className="mt-auto w-full py-3 rounded-xl font-bold text-sm border transition-all duration-200 hover:scale-105 active:scale-95"
          style={
            isSelected
              ? { backgroundColor: theme.navy, color: "#fff", borderColor: theme.navy }
              : { backgroundColor: "transparent", borderColor: "#cbd5e1", color: theme.navy }
          }
        >
          {isSelected ? "✓ Selected" : `Choose ${plan.name}`}
        </button>
      </div>
    </div>
  );
}

// ─── FAQ Section ───────────────────────────────────────────────────────────
const FAQ_ITEMS = [
  {
    q: "What is the purpose of this Tender Management System?",
    a: "This system helps manage the complete tender lifecycle, from work creation and approvals to payments and project completion, in one centralized platform.",
  },
  {
    q: "Who can access the admin panel?",
    a: "Only authorized administrators with valid login credentials can access the admin panel and manage application data.",
  },
  {
    q: "How do I create a new work or tender?",
    a: "Navigate to the Work Management section, click Add Work, fill in the required details, and save the record.",
  },
  {
    q: "Can I edit work details after they are created?",
    a: "Yes. Authorized users can update work details before the workflow reaches a restricted or completed stage, depending on permissions.",
  },
  {
    q: "How can I track the status of a tender?",
    a: "Open the Work Details page to view the current workflow stage, progress, approvals, payments, and completion status.",
  },
  {
    q: "Can I upload project-related documents?",
    a: "Yes. Documents such as approvals, estimates, sanction letters, and payment records can be uploaded and managed within the respective workflow stages.",
  },
  {
    q: "How can I export reports or PDFs?",
    a: "Go to the Reports section, choose the required filters (such as financial year), and click Export PDF to generate the report.",
  },
  {
    q: "What should I do if PDF export fails?",
    a: "Verify that all required information is available, ensure you have internet connectivity (if applicable), and ensure you selected required financial year.",
  },
  {
    q: "Can I view data for previous financial years?",
    a: "Yes. Use the Financial Year selector on the dashboard to view work, progress, and reports for a specific financial year.",
  }
];

function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (idx) => setOpenIndex((prev) => (prev === idx ? null : idx));

  return (
    <section id="faq" className="mb-16 sm:mb-24">
      <div className="max-w-3xl mx-auto mb-10 text-center">
        <span className="inline-block text-xs font-bold uppercase tracking-widest mb-3" style={{ color: theme.accent }}>
          Before you register
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight" style={{ color: theme.navy }}>
          Frequently asked questions
        </h2>
      </div>

      <div className="max-w-4xl mx-auto rounded-2xl border border-slate-200 overflow-hidden divide-y divide-slate-200 bg-white">
        {FAQ_ITEMS.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx}>
              <button
                onClick={() => toggle(idx)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-slate-50 transition-colors"
                aria-expanded={isOpen}
              >
                <span className="font-semibold text-base sm:text-lg" style={{ color: theme.navy }}>
                  {item.q}
                </span>
                <span
                  className="shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-transform duration-300"
                  style={{ borderColor: theme.accent, color: theme.accent, transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                </span>
              </button>
              <div
                className="overflow-hidden transition-all duration-300 ease-in-out"
                style={{ maxHeight: isOpen ? "200px" : "0px" }}
              >
                <p className="px-6 pb-5 text-sm leading-relaxed text-slate-500">{item.a}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────
export default function PaymentLandingPage() {
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [errors, setErrors] = useState({});
  const [paying, setPaying] = useState(false);
  const [scriptReady, setScriptReady] = useState(false);
  const [loadingPlans, setLoadingPlans] = useState(true);
  const [paymentError, setPaymentError] = useState("");
  const [modalState, setModalState] = useState({ isOpen: false, type: "", data: null });
  const [activeSection, setActiveSection] = useState("home");
  const [emailStatus, setEmailStatus] = useState("");

  // Fetch real plans from Firebase
  // Fetch real plans from Firebase
  useEffect(() => {
    (async () => {
      try {
        const snap = await get(ref(db, "settings/plans"));
        if (snap.exists()) {
          const data = snap.val();
          const order = ["month", "halfyear", "year"];
          const list = order
            .filter((id) => data[id])
            .map((id) => {
              const plan = data[id];
              return {
                id,
                // ✅ All data comes from database now
                name: plan.name,
                price: plan.price,
                durationValue: plan.durationValue,
                durationUnit: plan.durationUnit,
                durationLabel: plan.label || id,  // Use label from DB
                label: plan.label || id,
                tagline: plan.tagline || "Great plan for you",
                priceSuffix: plan.priceSuffix || "month",
                recommended: plan.recommended || false,
                style: plan.style || "light",
              };
            });
          setPlans(list);
          setSelectedPlan(list.find((p) => p.recommended) || list[0]);
        }
      } catch (error) {
        console.error("Error fetching plans:", error);
        alert("Failed to load plans. Please refresh the page.");
      }
      setLoadingPlans(false);
    })();
  }, []);

  // Load Cashfree JS SDK v3
  useEffect(() => {
    if (window.Cashfree) {
      setScriptReady(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
    script.async = true;

    const handleLoad = () => setScriptReady(true);
    const handleError = () => {
      console.error("Failed to load Cashfree script");
      setScriptReady(false);
      setPaymentError("Payment gateway failed to load. Please refresh the page.");
    };

    script.addEventListener("load", handleLoad);
    script.addEventListener("error", handleError);
    document.body.appendChild(script);

    return () => {
      script.removeEventListener("load", handleLoad);
      script.removeEventListener("error", handleError);
    };
  }, []);

  const handleChange = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((er) => ({ ...er, [key]: null }));
    setPaymentError("");
    setEmailStatus("");
  };

  const validate = () => {
    const er = {};
    if (!form.name.trim()) er.name = "Name is required";
    if (!/^\d{10}$/.test(form.phone.trim())) er.phone = "Enter a valid 10-digit phone number";
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) er.email = "Enter a valid email address";
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const handlePay = async () => {
    if (!validate() || !selectedPlan) return;

    if (!scriptReady || !window.Cashfree) {
      setPaymentError("Payment gateway is loading. Please wait a moment and try again.");
      return;
    }

    setPaying(true);
    setPaymentError("");
    setEmailStatus("");

    try {
      const result = await createOrder({
        name: form.name,
        mobile: form.phone,
        email: form.email,
        planId: selectedPlan.id,
      });

      const orderData = result.data;
      const { orderId, paymentSessionId } = orderData;

      // Initialize Cashfree SDK
      const cashfree = window.Cashfree({
        mode: import.meta.env.VITE_CASHFREE_ENV || "sandbox",
      });

      // Open the payment modal
      const checkoutResult = await cashfree.checkout({
        paymentSessionId,
        redirectTarget: "_modal",
      });

      if (checkoutResult.error) {
        // User closed modal or payment failed
        setPaying(false);
        const errMsg = checkoutResult.error.message || "Payment cancelled or failed.";
        setPaymentError(errMsg);
        console.error("Cashfree checkout error:", checkoutResult.error);
        return;
      }

      // Payment may have been completed — verify on server
      try {
        const verifyResult = await verifyPayment({ orderId });
        const verifyData = verifyResult.data;

        // ─── Send emails after successful payment ──────────────────
        setEmailStatus("Sending confirmation emails...");

        try {
          // Get userId from order
          const orderSnap = await get(ref(db, `orders/${orderId}`));
          const orderData = orderSnap.val();
          const userId = orderData?.userId;

          if (userId) {
            await sendEmails({ userId, orderId });
            console.log("✅ Emails sent successfully");
            setEmailStatus("✅ Confirmation emails sent!");
          } else {
            console.warn("⚠️ No userId found for order:", orderId);
            setEmailStatus("⚠️ Payment successful but couldn't find user ID");
          }
        } catch (emailError) {
          console.error("❌ Error sending emails:", emailError);
          setEmailStatus("⚠️ Payment successful but emails may be delayed");
          // Don't fail the payment flow if emails fail
        }

        setPaying(false);
        setModalState({
          isOpen: true,
          type: "success",
          data: {
            accessKey: verifyData.accessKey,
            expiresAt: verifyData.expiresAt,
            mobile: form.phone,
            emailStatus: emailStatus,
          }
        });
      } catch (err) {
        setPaying(false);
        setModalState({
          isOpen: true,
          type: "error",
          data: {
            message: "Payment succeeded but verification failed. Please contact support.",
            paymentId: orderId,
          }
        });
        console.error("Verification error:", err);
      }

    } catch (err) {
      setPaying(false);
      const errorMsg = err.message || "Could not start payment. Please try again.";
      setPaymentError(errorMsg);
      console.error("Payment initiation error:", err);
    }
  };

  if (loadingPlans) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-10 h-10 border-4 border-slate-200 border-t-[#062E52] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50" style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
      {/* Navigation */}
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Banner */}
        <Banner />

        {/* Services Section */}
        <ServicesSection />

        {/* Feature Carousel with Enhanced Features */}
        <FeatureCarousel />

        {/* Inside the App — static screenshots */}
        <InsideAppSection />

        {/* Plans Section */}
        <section
          id="plans"
          className="scroll-mt-20 relative overflow-hidden rounded-3xl mb-16 sm:mb-24 bg-gradient-to-br from-[#062E52] via-[#0B3D63] to-[#062E52] shadow-2xl px-6 sm:px-10 py-16 sm:py-20"
        >
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block text-xs font-bold uppercase tracking-widest mb-4" style={{ color: theme.accent }}>
              Access plans
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Choose your tender access plan
            </h2>
            <p className="text-base text-white/70 mt-4 max-w-2xl mx-auto leading-relaxed">
              Unlock live tenders matched to your ward — pick a plan, fill in your details, and pay securely.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto">
            {plans.map((plan, i) => (
              <PlanCard key={plan.id} plan={plan} index={i} selected={selectedPlan} onSelect={setSelectedPlan} />
            ))}
          </div>

          {selectedPlan && (
            <div className="checkout-panel max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-2">
              {/* Left: what happens next */}
              <div className="p-8 sm:p-10 text-white" style={{ backgroundColor: theme.navy }}>
                <h3 className="text-xl sm:text-2xl font-extrabold mb-4" style={{ color: theme.accent }}>What happens next</h3>
                <p className="text-sm text-white/70 mb-8 leading-relaxed">
                  Your registration is checked by hand before an activation key is issued — usually within 24 hours.
                </p>

                <ol className="space-y-6">
                  <li className="flex gap-3">
                    <span className="font-extrabold shrink-0" style={{ color: theme.accent }}>1</span>
                    <p className="text-sm leading-relaxed">
                      <span className="font-semibold" style={{ color: theme.accent }}>Registration received</span>
                      {" "}— you'll see a confirmation on screen.
                    </p>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-extrabold shrink-0" style={{ color: theme.accent }}>2</span>
                    <p className="text-sm leading-relaxed">
                      <span className="font-semibold" style={{ color: theme.accent }}>Under verification</span>
                      {" "}— we confirm your ward and corporator details.
                    </p>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-extrabold shrink-0" style={{ color: theme.accent }}>3</span>
                    <p className="text-sm leading-relaxed">
                      <span className="font-semibold" style={{ color: theme.accent }}>Key issued</span>
                      {" "}— activation key, download link, and user guide sent to your email and phone.
                    </p>
                  </li>
                </ol>
              </div>

              {/* Right: purchase form */}
              <div className="p-8 sm:p-10 bg-white">
                <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
                  <div>
                    <h2 className="text-xl font-bold" style={{ color: theme.navy }}>Complete Your Purchase</h2>
                    <p className="text-sm text-slate-500">Fill in your details to get started</p>
                  </div>
                  <span className="text-xs font-bold px-4 py-2 rounded-full text-white transition-all duration-300 shadow-md" style={{ backgroundColor: theme.teal }}>
                    {selectedPlan.name} · ₹{selectedPlan.price}/{selectedPlan.durationLabel}
                  </span>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="text-sm font-semibold mb-1.5 block text-slate-700">Full Name</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={handleChange("name")}
                      placeholder="Enter your full name"
                      className={`w-full border rounded-xl px-4 py-3.5 text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-[#062E52] focus:border-transparent ${errors.name ? "border-red-400" : "border-slate-200"
                        }`}
                    />
                    {errors.name && <p className="text-xs text-red-500 mt-1.5">{errors.name}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-semibold mb-1.5 block text-slate-700">Phone Number</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={handleChange("phone")}
                        placeholder="9876543210"
                        maxLength={10}
                        className={`w-full border rounded-xl px-4 py-3.5 text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-[#062E52] focus:border-transparent ${errors.phone ? "border-red-400" : "border-slate-200"
                          }`}
                      />
                      {errors.phone && <p className="text-xs text-red-500 mt-1.5">{errors.phone}</p>}
                    </div>
                    <div>
                      <label className="text-sm font-semibold mb-1.5 block text-slate-700">Email Address</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={handleChange("email")}
                        placeholder="you@example.com"
                        className={`w-full border rounded-xl px-4 py-3.5 text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-[#062E52] focus:border-transparent ${errors.email ? "border-red-400" : "border-slate-200"
                          }`}
                      />
                      {errors.email && <p className="text-xs text-red-500 mt-1.5">{errors.email}</p>}
                    </div>
                  </div>
                </div>

                {paymentError && (
                  <div className="mt-6 bg-red-50 border border-red-200 rounded-xl p-4">
                    <p className="text-sm text-red-600">❌ {paymentError}</p>
                  </div>
                )}

                {emailStatus && (
                  <div className="mt-4 bg-blue-50 border border-blue-200 rounded-xl p-3">
                    <p className="text-sm text-blue-600">{emailStatus}</p>
                  </div>
                )}

                <button
                  onClick={handlePay}
                  disabled={paying}
                  className="w-full mt-6 py-4 rounded-xl font-bold text-white text-sm flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-lg hover:scale-[1.02] active:scale-95 disabled:opacity-60"
                  style={{ backgroundColor: theme.teal }}
                >
                  {paying ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      Processing Payment…
                    </>
                  ) : (
                    <>Pay ₹{selectedPlan.price} Securely</>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 mt-4">
                  <svg className="w-4 h-4 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  <p className="text-xs text-slate-500">🔒 Encrypted & secure payment by Cashfree Payments</p>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* FAQ Section */}
        <FAQSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modal */}
      {modalState.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in-up">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 overflow-hidden relative border border-slate-100">
            {modalState.type === "success" ? (
              <div className="text-center">
                <div className="w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-6" style={{ backgroundColor: theme.tealLight, color: theme.teal }}>
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-extrabold mb-2" style={{ color: theme.navy }}>Payment Successful! 🎉</h2>
                <p className="text-sm text-slate-600 mb-6">Your subscription is now active.</p>

                <div className="bg-slate-50 rounded-xl p-5 text-left space-y-4 mb-6">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Mobile Number</p>
                    <p className="font-bold" style={{ color: theme.navy }}>{modalState.data.mobile}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Access Key</p>
                    <div className="flex items-center justify-between bg-white px-3 py-2.5 border border-slate-200 rounded-lg mt-1">
                      <p className="font-mono font-bold text-lg" style={{ color: theme.teal }}>{modalState.data.accessKey}</p>
                      <button
                        onClick={() => navigator.clipboard.writeText(modalState.data.accessKey)}
                        className="text-xs font-semibold text-slate-500 hover:text-slate-800 px-3 py-1 rounded-lg hover:bg-slate-100 transition-colors"
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Valid Until</p>
                    <p className="font-semibold" style={{ color: theme.navy }}>{new Date(modalState.data.expiresAt).toLocaleString()}</p>
                  </div>
                  {modalState.data.emailStatus && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-2">
                      <p className="text-xs text-green-700">{modalState.data.emailStatus}</p>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => setModalState({ isOpen: false, type: "", data: null })}
                  className="w-full py-3.5 rounded-xl font-bold text-white transition-all duration-200 hover:shadow-lg hover:scale-[1.02] active:scale-95"
                  style={{ backgroundColor: theme.teal }}
                >
                  Close & Continue
                </button>
              </div>
            ) : (
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-red-100 text-red-500 mx-auto flex items-center justify-center mb-6">
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold mb-2 text-red-600">Verification Failed</h2>
                <p className="text-sm text-slate-600 mb-6">{modalState.data.message}</p>
                <div className="bg-red-50 rounded-lg p-4 text-left mb-6 border border-red-100">
                  <p className="text-xs text-red-500 font-semibold mb-1">Payment ID</p>
                  <p className="text-sm font-mono text-red-700 break-all">{modalState.data.paymentId}</p>
                </div>
                <button
                  onClick={() => setModalState({ isOpen: false, type: "", data: null })}
                  className="w-full py-3.5 rounded-xl font-bold text-white bg-slate-800 hover:bg-slate-900 transition-all duration-200 hover:shadow-lg"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .fade-in-down { animation: fadeInDown 0.45s ease-out both; }
        .animate-fade-in-up { animation: fadeInUp 0.6s ease-out both; }
        .plan-card { animation: fadeInUp 0.5s ease-out both; }
        .checkout-panel { animation: fadeInUp 0.6s ease-out 0.2s both; }
        .animate-float { animation: float 4s ease-in-out infinite; }

        /* Scroll margin for fixed header */
        .scroll-mt-20 { scroll-margin-top: 5rem; }

        /* Smooth hover transitions */
        * { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }

        @media (prefers-reduced-motion: reduce) {
          .fade-in-down, .animate-fade-in-up, .plan-card, .checkout-panel, .animate-float {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}