import React, { useState, useEffect } from 'react';
import { getFromLocalStorage } from '../utils/localStorage';
import type { MonthHistory } from '../types';

const HistoryPage: React.FC = () => {
  const [history, setHistory] = useState<MonthHistory[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<MonthHistory | null>(null);

  useEffect(() => {
    const storedHistory = getFromLocalStorage('expenseHistory');
    if (storedHistory) {
      // Sort by date descending (newest first)
      const parsedHistory: MonthHistory[] = JSON.parse(storedHistory);
      parsedHistory.sort((a, b) => b.id.localeCompare(a.id));
      setHistory(parsedHistory);
    }
  }, []);

  if (selectedMonth) {
      return (
          <div className="container mx-auto p-4 pb-20 text-slate-100">
               <button onClick={() => setSelectedMonth(null)} className="mb-4 text-blue-400 hover:text-blue-300 flex items-center">
                   &larr; Back to History
               </button>
               <h1 className="text-2xl font-bold mb-4">{selectedMonth.monthLabel} Summary</h1>
               
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                   <div className="bg-slate-800 p-4 rounded-xl shadow-lg border border-slate-700">
                       <p className="text-slate-400 text-sm">Income</p>
                       <p className="text-2xl font-bold text-emerald-400">${selectedMonth.salary.toFixed(2)}</p>
                   </div>
                   <div className="bg-slate-800 p-4 rounded-xl shadow-lg border border-slate-700">
                       <p className="text-slate-400 text-sm">Total Spent</p>
                       <p className="text-2xl font-bold text-red-400">${selectedMonth.totalSpent.toFixed(2)}</p>
                   </div>
                   <div className="bg-slate-800 p-4 rounded-xl shadow-lg border border-slate-700">
                       <p className="text-slate-400 text-sm">Total Saved</p>
                       <p className="text-2xl font-bold text-blue-400">${selectedMonth.totalSaved.toFixed(2)}</p>
                   </div>
               </div>

               <h2 className="text-xl font-semibold mb-3">Category Breakdown</h2>
               <div className="space-y-3">
                   {selectedMonth.categories.map(cat => (
                       <div key={cat.categoryId} className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                           <div className="flex justify-between items-center mb-2">
                               <h3 className="font-semibold text-lg">{cat.categoryName}</h3>
                               <span className={cat.saved >= 0 ? "text-green-400" : "text-red-400"}>
                                   {cat.saved >= 0 ? "Saved" : "Overspent"}: ${Math.abs(cat.saved).toFixed(2)}
                               </span>
                           </div>
                           <div className="w-full bg-slate-700 rounded-full h-2.5 mb-2">
                               <div 
                                    className={`h-2.5 rounded-full ${cat.totalSpent > cat.allocatedBudget ? 'bg-red-500' : 'bg-green-500'}`} 
                                    style={{ width: `${Math.min((cat.totalSpent / (cat.allocatedBudget || 1)) * 100, 100)}%` }}
                               ></div>
                           </div>
                           <div className="flex justify-between text-sm text-slate-400">
                               <span>Spent: ${cat.totalSpent.toFixed(2)}</span>
                               <span>Budget: ${cat.allocatedBudget.toFixed(2)}</span>
                           </div>
                       </div>
                   ))}
               </div>
          </div>
      )
  }

  return (
    <div className="container mx-auto p-4 pb-20 text-slate-100">
      <h1 className="text-2xl font-bold mb-6">History</h1>
      {history.length === 0 ? (
        <div className="text-center text-slate-400 mt-10">
            <p>No month history available yet.</p>
            <p className="text-sm mt-2">Summaries are generated automatically at the start of each new month.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((month) => (
            <div 
                key={month.id} 
                onClick={() => setSelectedMonth(month)}
                className="bg-slate-800 hover:bg-slate-700 cursor-pointer p-4 rounded-xl shadow-md transition-colors border border-slate-700 flex justify-between items-center"
            >
                <div>
                    <h3 className="font-bold text-lg">{month.monthLabel}</h3>
                    <p className="text-sm text-slate-400">Saved: <span className="text-blue-400">${month.totalSaved.toFixed(2)}</span></p>
                </div>
                <div className="text-slate-400">
                    &rarr;
                </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
