import React from 'react';
import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      <div className="relative flex items-center justify-center w-64 h-64">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border-primary/30"
            style={{
              borderWidth: '2px',
              width: '100%',
              height: '100%',
            }}
            animate={{
              scale: [0.5, 1.5],
              opacity: [0.8, 0],
            }}
            transition={{
              duration: 2.5,
              ease: "easeInOut",
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
        <motion.div
          className="relative"
          animate={{
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 2.5,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        >
          <img 
            src="https://hhoyatmfelywylbpeylz.supabase.co/storage/v1/object/public/general_documents//Logo%20ENGYX%20Grande.png" 
            alt="Engyx Logo" 
            className="w-40 h-40"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Loader;