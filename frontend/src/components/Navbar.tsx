import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Church } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Jemaat", path: "/congregations" },
  { label: "Organization", path: "/organization" },
  { label: "Statistics", path: "/statistics" },
  { label: "Finance", path: "/finance" },
  { label: "Prayer Requests", path: "/prayer-requests" },
];

interface NavbarProps {
  transparent?: boolean;
}

export default function Navbar({ transparent = false }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        transparent ? "bg-transparent" : "bg-primary/95 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between py-4 px-4">
        <Link to="/" className="flex items-center gap-2">
          <Church className="h-7 w-7 text-gold" />
          <span className="font-display text-xl font-bold text-cream">
            GKPS Tangerang
          </span>
        </Link>

        {/* Desktop */}
        <ul className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? "text-gold"
                    : "text-cream/80 hover:text-cream"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="lg:hidden text-cream">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-primary/95 backdrop-blur-sm overflow-hidden"
          >
            <ul className="px-4 pb-4 space-y-1">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => setOpen(false)}
                    className={`block px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                      isActive(item.path)
                        ? "text-gold bg-navy-light"
                        : "text-cream/80 hover:text-cream hover:bg-navy-light"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
