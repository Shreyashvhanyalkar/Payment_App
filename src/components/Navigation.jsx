import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LogoImg from "../assets/logo-ward vikas 1.png";

const theme = {
  navy: "#062E52",
  teal: "#062E52",
  accent: "#F5841F",
};

const APP_NAME = "Ward Vikas";
const APP_SUBTITLE = "Euspace Technologies";

const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "services", label: "Services" },
  { id: "features", label: "Features" },
  { id: "plans", label: "Pricing" },
  { id: "application", label: "Application" },
];

export default function Navigation({ activeSection, setActiveSection }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // If we've just navigated to "/" with a #hash (from another page), scroll to it
  useEffect(() => {
    if (location.pathname === "/" && location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        setActiveSection?.(id);
      }
    }
  }, [location, setActiveSection]);

  const handleNavClick = (id) => {
    setIsOpen(false);

    if (location.pathname !== "/") {
      navigate(`/#${id}`);
      return;
    }

    setActiveSection?.(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? "bg-white/95 backdrop-blur-lg shadow-lg border-b border-slate-100"
        : "bg-white/80 backdrop-blur-sm border-b border-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => handleNavClick("home")}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105">
              <img src={LogoImg} alt="Ward Vikas Logo" className="w-full h-full object-contain" />
            </div>
            <div className="leading-tight">
              <span className="font-extrabold text-lg lg:text-xl tracking-tight block" style={{ color: theme.navy }}>
                {APP_NAME}
              </span>
              <span className="text-[10px] lg:text-xs font-medium tracking-wide text-slate-400 block">
                {APP_SUBTITLE}
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`px-3.5 py-2.5 text-xs font-bold uppercase tracking-wide rounded-xl transition-all duration-200 ${activeSection === link.id
                  ? "text-white shadow-lg"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                style={activeSection === link.id ? { backgroundColor: theme.teal } : {}}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Register Button (desktop) */}
          <div className="hidden lg:block">
            <button
              onClick={() => handleNavClick("plans")}
              className="px-6 py-2.5 rounded-xl font-bold text-sm text-white shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
              style={{ backgroundColor: theme.accent }}
            >
              Register
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2.5 rounded-xl hover:bg-slate-100 transition-colors duration-200"
            aria-label="Toggle navigation"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span
                className={`block h-0.5 bg-slate-700 rounded-full transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""
                  }`}
              />
              <span
                className={`block h-0.5 bg-slate-700 rounded-full transition-all duration-300 ${isOpen ? "opacity-0" : ""
                  }`}
              />
              <span
                className={`block h-0.5 bg-slate-700 rounded-full transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0"
            }`}
        >
          <div className="py-4 border-t border-slate-100 space-y-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full text-left px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200 ${activeSection === link.id
                  ? "text-white"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                style={activeSection === link.id ? { backgroundColor: theme.teal } : {}}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick("plans")}
              className="w-full mt-2 px-4 py-3 rounded-xl font-bold text-sm text-white shadow-md"
              style={{ backgroundColor: theme.accent }}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}