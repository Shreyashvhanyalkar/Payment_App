import { Link } from "react-router-dom";
import LogoImg from "../assets/logo-ward vikas 1.png";
const theme = {
  navy: "#062E52",
};

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center">
  <img src={LogoImg} alt="Ward Vikas Logo" className="w-full h-full object-contain" />
</div>
            <span className="font-bold text-sm" style={{ color: theme.navy }}>Ward Vikas</span>
          </div>

          <div className="flex gap-4 text-xs text-slate-400">
            <Link to="/" className="hover:text-slate-600 transition-colors">Home</Link>
            <Link to="/privacy" className="hover:text-slate-600 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-slate-600 transition-colors">Terms &amp; Conditions</Link>
          </div>
        </div>

        {/* Contact Info */}
        <div
          id="contact"
          className="mt-6 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4 text-center sm:text-left"
        >
          <div className="text-xs text-slate-500 leading-relaxed max-w-md">
            <p className="font-semibold text-slate-700 mb-1">Euspace Technologies Pvt. Ltd</p>
            <p>
              Indralok Apartment, B31, Pune - Satara Rd, near Cotton King,
              Vasant Baug, Padmadarshan Society, Sant Nagar, Parvati Paytha,
              Pune, Maharashtra 411009
            </p>
          </div>

          <div className="flex flex-col gap-1 text-xs text-slate-500">
            <a
              href="https://euspacetech.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-700 transition-colors font-medium"
            >
              euspacetech.com
            </a>
            <a
              href="tel:+912045327379"
              className="hover:text-slate-700 transition-colors"
            >
              +91 020 4532 7379
            </a>
          </div>
        </div>

        <p className="text-center text-[11px] text-slate-300 mt-6">
          © {new Date().getFullYear()} Euspace Technologies Pvt. Ltd. All rights reserved.
        </p>
      </div>
    </footer>
  );
}