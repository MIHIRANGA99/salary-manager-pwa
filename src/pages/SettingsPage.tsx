import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Binoculars } from 'lucide-react';
import SalaryInput from '../components/SalaryInput';
import CategoryForm from '../components/CategoryForm';
import type { Category } from '../types';
import { modalBackdrop, modalContent, shakeAnimation } from '../utils/animationVariants';

interface SettingsPageProps {
  onSalaryChange: (salary: number) => void;
  onAddCategory: (category: Omit<Category, 'id'>) => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ onSalaryChange, onAddCategory }) => {
  const navigate = useNavigate();
  const [showPinModal, setShowPinModal] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  const handleWatchStorageClick = () => {
    setShowPinModal(true);
    setPinInput('');
    setPinError(false);
  };

  const handlePinSubmit = () => {
    if (pinInput === '0001') {
      setShowPinModal(false);
      navigate('/debug-storage');
    } else {
      setPinError(true);
      setPinInput('');
    }
  };

  const handlePinKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handlePinSubmit();
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-white">Settings</h1>
      <SalaryInput onSalaryChange={onSalaryChange} />
      <CategoryForm onAddCategory={onAddCategory} />
      
      {/* Debug Button */}
      <div className="mt-8">
        <motion.button
          onClick={handleWatchStorageClick}
          className="flex items-center gap-2 bg-gray-500/10 text-white font-semibold py-3 px-6 rounded-lg"
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring' as const, stiffness: 400, damping: 17 }}
        >
          <Binoculars className="w-5 h-5" />
          Watch Local Storage
        </motion.button>
      </div>

      {/* PIN Modal */}
      <AnimatePresence>
        {showPinModal && (
          <>
            <motion.div 
              className="fixed inset-0 bg-black bg-opacity-60 z-50 backdrop-blur-sm modal-backdrop-gradient"
              variants={modalBackdrop}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => setShowPinModal(false)}
            />
            <motion.div 
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-800 rounded-xl shadow-2xl p-6 w-80 border border-slate-700 z-50"
              variants={modalContent}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <h2 className="text-xl font-bold text-white mb-4">Enter PIN</h2>
              <p className="text-slate-400 text-sm mb-4">Please enter the PIN to access the storage debugger.</p>
              
              <motion.input
                type="password"
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  setPinError(false);
                }}
                onKeyDown={handlePinKeyDown}
                placeholder="Enter PIN"
                maxLength={4}
                autoFocus
                className="w-full px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white text-center text-xl tracking-widest focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4 input-gradient-focus"
                animate={pinError ? shakeAnimation : {}}
                whileFocus={{ scale: 1.02 }}
                transition={{ type: 'spring' as const, stiffness: 300, damping: 20 }}
              />
              
              {pinError && (
                <motion.p 
                  className="text-red-400 text-sm mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 1, 1, 0] }}
                  transition={{ duration: 2 }}
                >
                  Incorrect PIN. Please try again.
                </motion.p>
              )}
              
              <div className="flex gap-3">
                <motion.button
                  onClick={() => setShowPinModal(false)}
                  className="flex-1 btn-gradient-secondary text-white font-semibold py-2 px-4 rounded-lg"
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring' as const, stiffness: 400, damping: 17 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  onClick={handlePinSubmit}
                  className="flex-1 btn-gradient-primary btn-glow-primary text-white font-semibold py-2 px-4 rounded-lg"
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring' as const, stiffness: 400, damping: 17 }}
                >
                  Submit
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SettingsPage;
