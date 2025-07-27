import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Users, Globe, Star } from 'lucide-react';

export default function StatsSection() {
  const stats = [
    { number: "500+", label: "MW Tokenizados", icon: Zap },
    { number: "10K+", label: "Inversores Activos", icon: Users },
    { number: "25+", label: "Países", icon: Globe },
    { number: "98%", label: "Satisfacción", icon: Star }
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-r from-emerald-900/30 to-teal-900/30 backdrop-blur-sm">
      <div className="container mx-auto">
        <motion.div 
          className="grid md:grid-cols-4 gap-8 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="p-6"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-emerald-400 mb-2">
                {stat.number}
              </div>
              <div className="text-emerald-100 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}