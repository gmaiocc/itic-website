import { Target, Users, Lightbulb, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Mission",
      description: "To bridge academic finance theory with real-world trading practice, creating a community of informed investors."
    },
    {
      icon: Users,
      title: "Community",
      description: "A diverse network of students passionate about markets, sharing knowledge and growing together."
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Embracing cutting-edge financial technologies and strategies to stay ahead in dynamic markets."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Committed to the highest standards in education, networking, and professional development."
    }
  ];

  return (
    <section className="py-24 bg-background" id="about">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-heading font-bold text-foreground mb-6">
            About <span className="text-accent">ITIC</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Established in 2017, ITIC is ISCTE Business School's premier student organization dedicated to finance and investment education. We provide a platform for ambitious students to develop practical trading skills, network with industry professionals, and explore career opportunities in finance.
          </p>
        </motion.div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <Card className="border-2 hover:border-accent/50 transition-smooth shadow-card hover:shadow-elegant group h-full">
                <CardContent className="p-6 space-y-4">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-smooth"
                  >
                    <value.icon className="w-7 h-7 text-accent" />
                  </motion.div>
                  <h3 className="text-xl font-heading font-semibold text-foreground">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* What We Do Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="gradient-hero rounded-3xl p-8 sm:p-12 text-white"
        >
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl sm:text-4xl font-heading font-bold mb-6">
              What We Do
            </h3>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { title: "", description: "" },
                { title: "", description: "" },
                { title: "", description: "" },
                { title: "", description: "" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="space-y-3 cursor-pointer"
                >
                  <h4 className="text-xl font-semibold text-accent">{item.title}</h4>
                  <p className="text-white/90">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
