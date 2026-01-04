import React from "react";
import { motion } from "framer-motion";
import { inputFocus } from "../utils/animationVariants";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input: React.FC<InputProps> = ({ label, id, className, ...props }) => {
  return (
    <div className="flex flex-col">
      {label && (
        <motion.label
          htmlFor={id}
          className="mb-1 text-sm font-medium text-gray-700"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {label}
        </motion.label>
      )}
      <motion.input
        id={id}
        className={`px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm input-gradient-focus transition-all ${className || ''}`}
        whileFocus={inputFocus}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring' as const, stiffness: 400, damping: 17 }}
        {...(props as any)}
      />
    </div>
  );
};

export default Input;
