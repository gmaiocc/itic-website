import { Target, Users, Lightbulb, Award, BarChart2, PieChart, Search, Globe, CheckCircle2, TrendingUp, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

const About = () => {
  const departments = [
    {
      title: "Trading",
      icon: BarChart2,
      desc: "Develop systematic & discretionary strategies across multiple asset classes using technical analysis.",
      delay: 0.1
    },
    {
      title: "Asset Management",
      icon: PieChart,
      desc: "Master long-term portfolio construction, risk management and fundamental valuation methods.",
      delay: 0.2
    },
    {
      title: "Research",
      icon: Search,
      desc: "Produce deep-dive macro analysis and equity reports to guide investment decisions.",
      delay: 0.3
    },
    {
      title: "Operations",
      icon: Globe,
      desc: "Manage partnerships, organize events, and drive the club's strategic growth and recruitment.",
      delay: 0.4
    },
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: "Applied Finance & Markets",
      desc: "Develop practical skills in financial markets, risk analysis and investment concepts through real case studies and hands-on projects."
    },
    {
      icon: Users,
      title: "Alumni Network",
      desc: "Connect with former members now working in banks, asset managers, consulting and other finance-related institutions."
    },
    {
      icon: BookOpen,
      title: "Career & Technical Development",
      desc: "Strengthen your technical background and career readiness through internal initiatives, projects and peer-to-peer learning."
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden" id="about">
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] opacity-40 pointer-events-none" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-bold uppercase tracking-wider mb-4 border border-red-100">
              Who We Are
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6 leading-tight">
              Bridging Theory & <br />
              <span className="text-red-600">Real-World Finance</span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              Established in 2017, ITIC is ISCTE Business School's premier student organization.
              We are a meritocratic community dedicated to closing the gap between academic concepts and the fast-paced reality of financial markets.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Whether you are interested in high-frequency trading, long-term value investing, or macroeconomic research, ITIC provides the tools, mentorship, and environment to excel.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {[
              { icon: Target, title: "Mission", txt: "Practical Skills" },
              { icon: Users, title: "Community", txt: "Strong Network" },
              { icon: Lightbulb, title: "Innovation", txt: "New Strategies" },
              { icon: Award, title: "Excellence", txt: "Top Standards" },
            ].map((val, i) => (
              <div key={i} className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-red-100 transition-all group">
                <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center mb-4 group-hover:bg-red-600 transition-colors duration-300">
                  <val.icon className="w-5 h-5 text-gray-900 group-hover:text-white transition-colors" />
                </div>
                <h4 className="font-bold text-gray-900 mb-1">{val.title}</h4>
                <p className="text-xs text-gray-500 uppercase tracking-wide">{val.txt}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="mb-24">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h3 className="text-3xl font-heading font-bold text-gray-900 mb-4">Our Ecosystem</h3>
            <p className="text-gray-600">
              Four specialized departments working in synergy to cover every aspect of the financial world.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {departments.map((dept, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: dept.delay }}
                whileHover={{ y: -5 }}
                className="p-8 rounded-2xl bg-white border border-gray-200 hover:border-red-200 hover:shadow-xl hover:shadow-red-900/5 transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-xl bg-red-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <dept.icon className="w-7 h-7 text-red-600" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">{dept.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {dept.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gray-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-red-600/20 blur-[100px] rounded-full pointer-events-none translate-x-1/2 -translate-y-1/2" />

          <div className="relative z-10">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-heading font-bold mb-4">Why Join ITIC?</h3>
              <p className="text-gray-400 max-w-2xl mx-auto">
                We bridge the gap between academic learning and real-world finance, helping students build practical skills for careers in banking, markets and consulting.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {benefits.map((benefit, i) => (
                <div key={i} className="flex flex-col items-center text-center space-y-4 p-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center border border-white/10">
                    <benefit.icon className="w-6 h-6 text-red-500" />
                  </div>
                  <h4 className="text-xl font-semibold">{benefit.title}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {benefit.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default About;