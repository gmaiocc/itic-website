import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobileDepartmentsOpen, setIsMobileDepartmentsOpen] = useState(false);
  const { user } = useAuth();

  // Efeito para adicionar sombra/blur ao fazer scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const departments = [
    { href: "/departments/trading", label: "Trading" },
    { href: "/departments/asset-management", label: "Asset Management" },
    { href: "/departments/research", label: "Research" },
    { href: "/departments/human-resources", label: "Operations" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b border-gray-200/50 py-3 shadow-sm"
          : "bg-transparent border-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* LOGO & NOME */}
          <Link to="/" className="flex items-center space-x-3 group">
            {/* Ícone com fundo VERMELHO */}
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center font-heading font-bold text-primary-foreground text-xl">
              <img src="/apple-touch-icon.png" alt="ITIC Logo" className="w-8 h-8" />
            </div>
            <div className="hidden sm:block">
              <div className="font-heading font-bold text-lg tracking-tight text-gray-900 leading-none group-hover:text-red-600 transition-colors">
                ITIC
              </div>
              <div className="text-[10px] font-medium tracking-wider text-gray-500 uppercase mt-0.5">
                ISCTE Trading & Investment Club
              </div>
            </div>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link to="/" className="text-sm font-medium text-gray-700 hover:text-red-600 transition-colors">Home</Link>
            <Link to="/about" className="text-sm font-medium text-gray-700 hover:text-red-600 transition-colors">About</Link>
            <Link to="/alumni" className="text-sm font-medium text-gray-700 hover:text-red-600 transition-colors">Alumni</Link>

            {/* Departments Dropdown - CORRIGIDO O ESPAÇAMENTO */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger 
                    className="bg-transparent hover:bg-transparent text-gray-700 hover:text-red-600 text-sm font-medium data-[state=open]:bg-transparent focus:bg-transparent px-0 h-auto py-0 w-auto"
                  >
                    Departments
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[280px] p-2 bg-white border border-gray-100 rounded-xl shadow-xl">
                      <ul className="space-y-1">
                        {departments.map((dept) => (
                          <li key={dept.href}>
                            <NavigationMenuLink asChild>
                              <Link
                                to={dept.href}
                                className="block px-4 py-2.5 text-sm text-gray-600 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors font-medium"
                              >
                                {dept.label}
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Link to="/reports" className="text-sm font-medium text-gray-700 hover:text-red-600 transition-colors">Reports</Link>
            <Link to="/gallery" className="text-sm font-medium text-gray-700 hover:text-red-600 transition-colors">Gallery</Link>
            <Link to="/faq" className="text-sm font-medium text-gray-700 hover:text-red-600 transition-colors">FAQ</Link>
            
            <Link to="/contact">
              <button className="px-6 py-2.5 text-sm font-bold text-white bg-red-600 rounded-full hover:bg-red-700 transition-all hover:shadow-lg hover:shadow-red-600/20 active:scale-95">
                Contact
              </button>
            </Link>
          </div>

          {/* MOBILE TOGGLE */}
          <button
            className="lg:hidden p-2 text-gray-900 hover:text-red-600 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-gray-200 overflow-hidden absolute w-full top-full left-0 shadow-xl"
          >
            <div className="container px-4 py-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <Link to="/" onClick={() => setIsOpen(false)} className="block py-2 text-gray-900 font-medium hover:text-red-600">Home</Link>
              <Link to="/about" onClick={() => setIsOpen(false)} className="block py-2 text-gray-900 font-medium hover:text-red-600">About</Link>
              <Link to="/alumni" onClick={() => setIsOpen(false)} className="block py-2 text-gray-900 font-medium hover:text-red-600">Alumni</Link>
              
              <button onClick={() => setIsMobileDepartmentsOpen(!isMobileDepartmentsOpen)} className="flex w-full justify-between items-center py-2 text-gray-900 font-medium hover:text-red-600">
                Departments <ChevronDown className={`w-4 h-4 transition-transform ${isMobileDepartmentsOpen ? "rotate-180" : ""}`} />
              </button>
              
              <AnimatePresence>
                {isMobileDepartmentsOpen && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="pl-4 space-y-1 border-l-2 border-red-100 ml-2 overflow-hidden"
                  >
                    {departments.map((dept) => (
                      <Link key={dept.href} to={dept.href} onClick={() => setIsOpen(false)} className="block py-2 text-sm text-gray-600 hover:text-red-600">
                        {dept.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <Link to="/reports" onClick={() => setIsOpen(false)} className="block py-2 text-gray-900 font-medium hover:text-red-600">Reports</Link>
              <Link to="/gallery" onClick={() => setIsOpen(false)} className="block py-2 text-gray-900 font-medium hover:text-red-600">Gallery</Link>
              <Link to="/faq" onClick={() => setIsOpen(false)} className="block py-2 text-gray-900 font-medium hover:text-red-600">FAQ</Link>
              
              <div className="pt-4 border-t border-gray-100">
                <Link to="/contact" onClick={() => setIsOpen(false)} className="block w-full text-center py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700">
                  Contact Us
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;