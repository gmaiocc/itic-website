import { Instagram, Linkedin, Mail, MapPin, ArrowRight, type LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

type SocialLinkProps = {
  href: string;
  icon: LucideIcon;
};

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 pt-16 md:pt-20 pb-[calc(2.5rem+3rem)]">      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-12 md:mb-16">

        {/* Brand Column */}
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center font-heading font-bold text-primary-foreground text-xl shrink-0">
              <img src="/apple-touch-icon.png" alt="ITIC Logo" className="w-8 h-8" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-gray-900">ITIC</span>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
            Empowering the next generation of financial leaders through rigorous analysis, practical trading, and community excellence.
          </p>
          <div className="flex gap-4">
            <SocialLink href="https://linkedin.com/company/iticiscte" icon={Linkedin} />
            <SocialLink href="https://instagram.com/itic_ibs" icon={Instagram} />
            <SocialLink href="mailto:global@itic-iscte.com" icon={Mail} />
          </div>
        </div>

        {/* Links 1 */}
        <div>
          <h4 className="font-bold mb-4 md:mb-6 text-gray-900">Club</h4>
          <ul className="space-y-3 text-sm text-gray-500">
            <li><Link to="/about" className="hover:text-red-600 transition-colors block py-1">About Us</Link></li>
            <li><Link to="/strategies" className="hover:text-red-600 transition-colors block py-1">Strategies</Link></li>
            <li><Link to="/alumni" className="hover:text-red-600 transition-colors block py-1">Alumni Network</Link></li>
            <li><Link to="/gallery" className="hover:text-red-600 transition-colors block py-1">Gallery</Link></li>
            <li><Link to="/faq" className="hover:text-red-600 transition-colors block py-1">FAQ</Link></li>
            <li><Link to="/contact" className="hover:text-red-600 transition-colors block py-1">Contact</Link></li>
          </ul>
        </div>

        {/* Links 2 */}
        <div>
          <h4 className="font-bold mb-4 md:mb-6 text-gray-900">Departments</h4>
          <ul className="space-y-3 text-sm text-gray-500">
            <li><Link to="/departments/trading" className="hover:text-red-600 transition-colors block py-1">Trading</Link></li>
            <li><Link to="/departments/asset-management" className="hover:text-red-600 transition-colors block py-1">Asset Management</Link></li>
            <li><Link to="/departments/research" className="hover:text-red-600 transition-colors block py-1">Research</Link></li>
            <li><Link to="/departments/human-resources" className="hover:text-red-600 transition-colors block py-1">Operations</Link></li>
          </ul>
        </div>

        {/* Visit Us */}
        <div>
          <h4 className="font-bold mb-4 md:mb-6 text-gray-900">Visit Us</h4>
          <div className="flex items-start gap-3 text-sm text-gray-500 mb-6 md:mb-8">
            <MapPin className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
            <p>
              ISCTE Business School<br />
              Av. das Forças Armadas<br />
              1649-026 Lisboa, Portugal
            </p>
          </div>

          <Link to="/login" className="inline-flex items-center text-sm font-semibold text-red-600 hover:text-red-700 group">
            Member Portal <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
        <p className="text-xs text-gray-400">
          &copy; {new Date().getFullYear()} ITIC. All rights reserved.
        </p>
        <div className="flex gap-6 text-xs text-gray-400">
          <Link to="/privacy" className="hover:text-gray-900">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-gray-900">Terms of Service</Link>
        </div>
      </div>
    </div>
    </footer>
  );
};

const SocialLink = ({ href, icon: Icon }: SocialLinkProps) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-red-600 hover:text-white transition-all duration-300 transform hover:-translate-y-1"
  >
    <Icon className="w-5 h-5" />
  </a>
);

export default Footer;