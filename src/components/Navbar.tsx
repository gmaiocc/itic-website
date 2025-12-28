import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown, LogIn, LogOut, Settings } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileDepartmentsOpen, setIsMobileDepartmentsOpen] = useState(false);
  const { user, userProfile, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const departments = [
    { href: "/departments/trading", label: "Trading" },
    { href: "/departments/asset-management", label: "Asset Management" },
    { href: "/departments/research", label: "Research" },
    { href: "/departments/human-resources", label: "Operations" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center font-heading font-bold text-primary-foreground text-xl">
              <img src="/apple-touch-icon.png" alt="ITIC Logo" className="w-8 h-8" />
            </div>
            <div className="hidden sm:block">
              <div className="font-heading font-bold text-xl text-foreground group-hover:text-primary transition-smooth">
                ITIC
              </div>
              <div className="text-xs text-muted-foreground">
                ISCTE TRADING & INVESTMENT CLUB
              </div>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-foreground hover:text-primary font-medium transition-smooth">Home</Link>
            <Link to="/about" className="text-foreground hover:text-primary font-medium transition-smooth">About</Link>

            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-foreground hover:text-primary font-medium bg-transparent hover:bg-transparent data-[state=open]:bg-transparent text-base [&>svg]:hidden">
                    Departments
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[400px] p-4 bg-card">
                      <ul className="space-y-2">
                        {departments.map((dept) => (
                          <li key={dept.href}>
                            <NavigationMenuLink asChild>
                              <Link to={dept.href} className="block px-4 py-3 rounded-md hover:bg-muted transition-smooth">
                                <div className="font-medium text-foreground">{dept.label}</div>
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

            <Link to="/gallery" className="text-foreground hover:text-primary font-medium transition-smooth">Gallery</Link>
            <Link to="/reports" className="text-foreground hover:text-primary font-medium transition-smooth">Reports</Link>
            <Link to="/contact" className="text-foreground hover:text-primary font-medium transition-smooth">Contact</Link>

            {/* Auth Buttons */}
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">{userProfile?.email || user.email}</span>
                {userProfile?.role === 'admin' && (
                  <Link to="/admin" className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-smooth">
                    <Settings className="w-4 h-4" />
                    <span className="font-medium">Admin Panel</span>
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-smooth"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            ) : (
              <Link to="/auth/login" className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-smooth">
                <LogIn className="w-4 h-4" />
                <span className="font-medium">Login</span>
              </Link>
            )}
          </div>

          <button className="md:hidden p-2 rounded-lg hover:bg-muted transition-smooth" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6 text-foreground" /> : <Menu className="w-6 h-6 text-foreground" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-lg">
          <div className="container mx-auto px-4 py-6 space-y-4">
            <Link to="/" className="block py-2 text-foreground hover:text-primary font-medium transition-smooth" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/about" className="block py-2 text-foreground hover:text-primary font-medium transition-smooth" onClick={() => setIsOpen(false)}>About</Link>

            <div>
              <button onClick={() => setIsMobileDepartmentsOpen(!isMobileDepartmentsOpen)} className="flex items-center justify-between w-full py-2 text-foreground hover:text-primary font-medium transition-smooth">
                Departments
                <ChevronDown className={`w-4 h-4 transition-transform ${isMobileDepartmentsOpen ? "rotate-180" : ""}`} />
              </button>
              {isMobileDepartmentsOpen && (
                <div className="pl-4 mt-2 space-y-2">
                  {departments.map((dept) => (
                    <Link key={dept.href} to={dept.href} className="block py-2 text-muted-foreground hover:text-primary transition-smooth" onClick={() => setIsOpen(false)}>
                      {dept.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link to="/gallery" className="block py-2 text-foreground hover:text-primary font-medium transition-smooth" onClick={() => setIsOpen(false)}>Gallery</Link>
            <Link to="/reports" className="block py-2 text-foreground hover:text-primary font-medium transition-smooth" onClick={() => setIsOpen(false)}>Reports</Link>
            <Link to="/contact" className="block py-2 text-foreground hover:text-primary font-medium transition-smooth" onClick={() => setIsOpen(false)}>Contact</Link>

            {/* Auth Buttons Mobile */}
            <div className="pt-4 mt-4 border-t border-border">
              {user ? (
                <div className="space-y-3">
                  <div className="text-sm text-muted-foreground py-2">{userProfile?.email || user.email}</div>
                  {userProfile?.role === 'admin' && (
                    <Link
                      to="/admin"
                      className="flex items-center gap-2 py-2 text-foreground hover:text-primary font-medium transition-smooth"
                      onClick={() => setIsOpen(false)}
                    >
                      <Settings className="w-4 h-4" />
                      Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="flex items-center gap-2 w-full py-2 text-foreground hover:text-primary font-medium transition-smooth"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/auth/login"
                  className="flex items-center gap-2 py-2 text-foreground hover:text-primary font-medium transition-smooth"
                  onClick={() => setIsOpen(false)}
                >
                  <LogIn className="w-4 h-4" />
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
