import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import { useState } from "react";
const theme = {
  navy: "#062E52",
  accent: "#F5841F",
};

const PRIVACY_SECTIONS = [
  {
    title: "Information We Collect",
    body: ["We may collect the following information:"],
    list: [
      "Mobile number",
      "Subscription details",
      "Device information required for activation",
      "Basic application usage information for support and maintenance",
    ],
  },
  {
    title: "Data Storage",
    body: [
      "Most application data, including tender records, work details, project information, and uploaded documents, is stored locally on your device. We do not publicly publish or distribute your data.",
    ],
  },
  {
    title: "Data Ownership",
    body: [
      "All information entered into the application belongs to you. You are responsible for maintaining backups of your data.",
    ],
  },
  {
    title: "Permissions",
    body: ["Ward Vikas requests only the permissions necessary for:"],
    list: [
      "Document selection",
      "Local storage",
      "Internet connectivity for activation, updates, and subscription verification",
    ],
    footNote:
      "The application does not access your contacts, SMS messages, call logs, or location unless you explicitly grant permission in a future version.",
  },
  {
    title: "Data Security",
    body: ["We implement appropriate technical and organizational measures to protect your information. We recommend that users:"],
    list: [
      "Secure their device with a PIN or biometric authentication.",
      "Keep their operating system updated.",
      "Store backup files securely.",
      "Share sensitive documents only with authorized individuals.",
    ],
  },
  {
    title: "Data Sharing",
    body: ["We do not sell or publicly share your personal information. Limited information may be securely transmitted only for:"],
    list: [
      "Subscription verification",
      "Technical support",
      "Legal or regulatory compliance where required",
    ],
  },
  {
    title: "Data Retention",
    body: [
      "Data stored locally remains on your device until you choose to delete it. Subscription-related information may be retained for account management, customer support, and legal compliance.",
    ],
  },
  {
    title: "Your Rights",
    body: ["You have the right to:"],
    list: [
      "Access your personal information.",
      "Request corrections to your information.",
      "Contact us regarding privacy concerns.",
      "Request assistance related to your stored data.",
    ],
  },
  {
    title: "Changes to this Notice",
    body: [
      "We may update this Data Storage & Privacy Notice periodically. Any changes will be published on this page with the updated effective date.",
    ],
  },
];

export default function PrivacyPage() {
  const [activeSection, setActiveSection] = useState("");

  return (
    <div
      className="min-h-screen bg-slate-50 flex flex-col"
      style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 mt-20">

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2" style={{ color: theme.navy }}>
          Data Storage &amp; Privacy Notice
        </h1>

        <p className="text-sm text-slate-600 leading-relaxed mb-8">
          At Ward Vikas, we respect your privacy and are committed to protecting your personal information.
        </p>

        <div className="space-y-8">
          {PRIVACY_SECTIONS.map((section, idx) => (
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