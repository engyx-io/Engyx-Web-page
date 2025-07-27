import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Linkedin, Twitter } from 'lucide-react';

export default function TeamPage() {
  const teamMembers = [
    {
      name: "Dra. Elena Vance",
      role: "CEO & Fundadora",
      bio: "Visionaria de la energía con más de 20 años de experiencia en el sector renovable y experta en finanzas descentralizadas.",
      image: "Mujer de negocios sonriendo en una oficina moderna",
      socials: {
        linkedin: "#",
        twitter: "#"
      }
    },
    {
      name: "Javier Ríos",
      role: "CTO & Co-Fundador",
      bio: "Arquitecto de blockchain y genio tecnológico, responsable de construir la robusta y segura plataforma de ENGYX.",
      image: "Desarrollador de software enfocado frente a monitores",
      socials: {
        linkedin: "#",
        twitter: "#"
      }
    },
    {
      name: "Sofía Chen",
      role: "Directora de Operaciones",
      bio: "Experta en escalabilidad de negocios y operaciones globales, asegurando que nuestra visión se ejecute a la perfección.",
      image: "Mujer profesional asiática en una reunión de equipo",
      socials: {
        linkedin: "#",
        twitter: "#"
      }
    },
    {
      name: "Marco Silva",
      role: "Jefe de Producto",
      bio: "Innovador de productos centrado en el usuario, transformando ideas complejas en experiencias intuitivas y valiosas.",
      image: "Hombre creativo presentando ideas en una pizarra",
      socials: {
        linkedin: "#",
        twitter: "#"
      }
    }
  ];

  return (
    <>
      <Helmet>
        <title>Nuestro Equipo - ENGYX</title>
        <meta name="description" content="Conoce a los expertos y visionarios que impulsan la revolución de la energía renovable en ENGYX." />
      </Helmet>
      <div className="pt-24 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent neon-text">
              Conoce a Nuestro Equipo
            </h1>
            <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
              Un grupo de innovadores, expertos y apasionados por un futuro energético sostenible y descentralizado.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="glass-card rounded-2xl overflow-hidden group tech-border"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
              >
                <div className="relative">
                  <img  
                    alt={member.name} 
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                   src="https://images.unsplash.com/photo-1644424235476-295f24d503d9" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>
                  <div className="absolute bottom-0 left-0 p-4">
                    <h3 className="text-2xl font-bold text-white">{member.name}</h3>
                    <p className="text-emerald-400 font-medium">{member.role}</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-emerald-200/80 text-sm mb-4">
                    {member.bio}
                  </p>
                  <div className="flex space-x-3">
                    <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon-link w-9 h-9">
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <a href={member.socials.twitter} target="_blank" rel="noopener noreferrer" className="social-icon-link w-9 h-9">
                      <Twitter className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}