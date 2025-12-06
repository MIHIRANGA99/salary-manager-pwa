// src/components/Dashboard.tsx
import React from 'react';

const Dashboard = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="container mx-auto p-4">
      <h2 className="text-xl text-white mb-4">Your Budget Overview</h2>
      {children}
    </main>
  );
};

export default Dashboard;
