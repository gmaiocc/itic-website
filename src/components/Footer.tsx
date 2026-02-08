import { Instagram, Linkedin, Mail, MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 pt-20 pb-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center font-heading font-bold text-primary-foreground text-xl">
                <img src="/apple-touch-icon.png" alt="ITIC Logo" className="w-8 h-8" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-gray-900">ITIC</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Empowering the next generation of financial leaders through rigorous analysis, practical trading, and community excellence.
            </p>
            <div className="flex gap-4">
              <SocialLink href="https://linkedin.com/company/iticiscte" icon={Linkedin} />
              <SocialLink href="https://instagram.com/itic_ibs" icon={Instagram} />
              <SocialLink href="mailto:global@itic-iscte.com" icon={Mail} />
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-gray-900">Club</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><Link to="/about" className="hover:text-red-600 transition-colors">About Us</Link></li>
              <li><Link to="/alumni" className="hover:text-red-600 transition-colors">Alumni Network</Link></li>
              <li><Link to="/gallery" className="hover:text-red-600 transition-colors">Gallery</Link></li>
              <li><Link to="/faq" className="hover:text-red-600 transition-colors">FAQ</Link></li>
              <li><Link to="/contact" className="hover:text-red-600 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-gray-900">Departments</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><Link to="/departments/trading" className="hover:text-red-600 transition-colors">Trading</Link></li>
              <li><Link to="/departments/asset-management" className="hover:text-red-600 transition-colors">Asset Management</Link></li>
              <li><Link to="/departments/research" className="hover:text-red-600 transition-colors">Research</Link></li>
              <li><Link to="/departments/human-resources" className="hover:text-red-600 transition-colors">Operations</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-gray-900">Visit Us</h4>
            <div className="flex items-start gap-3 text-sm text-gray-500 mb-8">
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

        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
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

const SocialLink = ({ href, icon: Icon }: any) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-red-600 hover:text-white transition-all duration-300"
  >
    <Icon className="w-5 h-5" />
  </a>
);

export default Footer;