import React from 'react';
import SalaryInput from '../components/SalaryInput';
import CategoryForm from '../components/CategoryForm';
import type { Category } from '../types';

interface SettingsPageProps {
  onSalaryChange: (salary: number) => void;
  onAddCategory: (category: Omit<Category, 'id'>) => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ onSalaryChange, onAddCategory }) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-white">Settings</h1>
      <SalaryInput onSalaryChange={onSalaryChange} />
      <CategoryForm onAddCategory={onAddCategory} />
    </div>
  );
};

export default SettingsPage;
