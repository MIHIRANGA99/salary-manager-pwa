import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const DebugStoragePage: React.FC = () => {
  const navigate = useNavigate();
  const [storageData, setStorageData] = useState<Record<string, any>>({});

  useEffect(() => {
    const data: Record<string, any> = {};
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key) {
            const value = localStorage.getItem(key);
            try {
                data[key] = value ? JSON.parse(value) : null;
            } catch (e) {
                data[key] = value;
            }
        }
    }
    setStorageData(data);
  }, []);

  return (
    <div className="container mx-auto p-4 pb-20 text-white min-h-screen">
      <div className="flex items-center mb-6">
        <button onClick={() => navigate(-1)} className="mr-4 p-2 rounded-full hover:bg-slate-700">
            <ArrowLeft className="w-6 h-6 text-slate-100" />
        </button>
        <h1 className="text-2xl font-bold">Local Storage Debugger</h1>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {Object.entries(storageData).length === 0 ? (
            <p className="text-slate-400">Local storage is empty.</p>
        ) : (
            Object.entries(storageData).map(([key, value]) => (
                <div key={key} className="bg-slate-800 rounded-lg p-4 shadow-lg border border-slate-700">
                    <h3 className="text-lg font-semibold text-emerald-400 mb-2">{key}</h3>
                    <pre className="bg-slate-900 p-3 rounded overflow-x-auto text-xs sm:text-sm font-mono text-slate-300">
                        {JSON.stringify(value, null, 2)}
                    </pre>
                </div>
            ))
        )}
      </div>
    </div>
  );
};

export default DebugStoragePage;
