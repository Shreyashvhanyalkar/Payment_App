import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import { useState } from "react";
const theme = {
  navy: "#062E52",
  accent: "#F5841F",
};

const TERMS_SECTIONS = [
  {
    title: "1. Acceptance of Terms",
    body: [
      "By accessing or using the Ward Vikas website or mobile application, you agree to these Terms & Conditions. If you do not agree with any part of these Terms, please discontinue use of our services.",
    ],
  },
  {
    title: "2. License to Use",
    body: [
      "Ward Vikas grants you a limited, non-exclusive, non-transferable, and revocable license to use the application during your active subscription period. The software is licensed, not sold.",
    ],
  },
  {
    title: "3. User Responsibilities",
    body: [
      "By using our services, you agree to:",
    ],
    list: [
      "Provide accurate and complete information.",
      "Keep your login credentials secure.",
      "Use the application only for lawful purposes.",
      "Maintain the confidentiality of your account and subscription details.",
    ],
    footNote:
      "You are solely responsible for the accuracy of any tender, project, contractor, payment, or document information entered into the application.",
  },
  {
    title: "4. Prohibited Activities",
    body: ["Users must not:"],
    list: [
      "Reverse engineer, decompile, or modify the application.",
      "Copy, redistribute, or resell the software.",
      "Upload malicious, illegal, or copyrighted content without authorization.",
      "Use the application for fraudulent or unlawful activities.",
    ],
  },
  {
    title: "5. Subscription",
    list: [
      "Premium features require an active subscription.",
      "Subscription validity depends on the purchased plan.",
      "Expired subscriptions may restrict access to certain features.",
      "Existing locally stored data remains available unless deleted by the user.",
    ],
  },
  {
    title: "6. Intellectual Property",
    body: [
      "All software, source code, trademarks, logos, branding, designs, and documentation are the exclusive property of Euspace Technologies unless otherwise stated.",
    ],
  },
  {
    title: "7. Limitation of Liability",
    body: [
      "Ward Vikas is a management and tracking tool designed to assist users. It does not replace official government procedures, approvals, or legal processes. Euspace Technologies is not responsible for decisions made based on incorrect or incomplete information entered by users.",
    ],
  },
  {
    title: "8. Suspension and Termination",
    body: [
      "We reserve the right to suspend or terminate access to the application if these Terms are violated or the application is misused.",
    ],
  },
  {
    title: "9. Changes to Terms",
    body: [
      "We may update these Terms & Conditions from time to time. Continued use of the application after changes become effective constitutes acceptance of the revised Terms.",
    ],
  },
];

export default function TermsPage() {
  const [activeSection, setActiveSection] = useState("");

  return (
    <div
      className="min-h-screen bg-slate-50 flex flex-col"
      style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 mt-20">

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2" style={{ color: theme.navy }}>
          Terms &amp; Conditions
        </h1>

        <div className="space-y-8">
          {TERMS_SECTIONS.map((section, idx) => (
            <section key={idx}>
              <h2 className="text-lg font-bold mb-2" style={{ color: theme.navy }}>
                {section.title}
              </h2>
              {section.body?.map((para, i) => (
                <p key={i} className="text-sm text-slate-600 leading-relaxed mb-2">
                  {para}
                </p>
              ))}
              {section.list && (
                <ul className="list-disc list-inside space-y-1 text-sm text-slate-600 mb-2">
                  {section.list.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}
              {section.footNote && (
                <p className="text-sm text-slate-600 leading-relaxed">{section.footNote}</p>
              )}
            </section>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}