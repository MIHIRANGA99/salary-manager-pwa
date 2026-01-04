import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { saveToLocalStorage, getFromLocalStorage } from '../utils/localStorage';
import Input from './Input';
import { fadeInUp } from '../utils/animationVariants';

interface SalaryInputProps {
  onSalaryChange: (salary: number) => void;
}

const SalaryInput: React.FC<SalaryInputProps> = ({ onSalaryChange }) => {
  const [salary, setSalary] = useState<string>('');
  const [savedSalary, setSavedSalary] = useState<number | null>(null);

  useEffect(() => {
    const storedSalary = getFromLocalStorage('monthlySalary');
    if (storedSalary) {
      const salaryValue = parseFloat(storedSalary);
      setSavedSalary(salaryValue);
      onSalaryChange(salaryValue);
    }
  }, [onSalaryChange]);

  const handleSave = () => {
    const newSalary = parseFloat(salary);
    if (!isNaN(newSalary) && newSalary >= 0) {
      saveToLocalStorage('monthlySalary', newSalary.toString());
      setSavedSalary(newSalary);
      onSalaryChange(newSalary);
      setSalary('');
    } else {
      alert('Please enter a valid positive number for your salary.');
    }
  };

  const handleReset = () => {
    saveToLocalStorage('monthlySalary', '0');
    setSavedSalary(0);
    onSalaryChange(0);
    setSalary('');
  };

  return (
    <motion.div 
      className="p-4 bg-linear-30 from-black/25 to-emerald-300/10 shadow-lg shadow-emerald-200/25 rounded-lg mb-4"
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
    >
      <h2 className="text-xl font-semibold mb-2">Monthly Salary</h2>
      {savedSalary !== null ? (
        <p className="text-lg mb-4">Current Monthly Salary: <span className="font-bold">${savedSalary.toFixed(2)}</span></p>
      ) : (
        <p className="text-lg mb-4">No monthly salary set yet.</p>
      )}
      <div className="flex space-x-2">
        {!savedSalary && <Input
          type="number"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          placeholder="Enter monthly salary"
          className="flex-grow p-2 bg-linear-90 focus:border-0 focus:border-transparent from-emerald-50/10 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />}
        <motion.button
          onClick={savedSalary ? handleReset : handleSave}
          className="px-4 py-2 btn-gradient-emerald btn-glow-success text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring' as const, stiffness: 400, damping: 17 }}
        >
          {savedSalary ? 'Reset Salary' : 'Save Salary' }
        </motion.button>
      </div>
    </motion.div>
  );
};

export default SalaryInput;
