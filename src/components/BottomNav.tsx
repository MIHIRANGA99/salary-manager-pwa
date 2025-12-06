import { NavLink } from 'react-router-dom';
import { FaHome, FaCog, FaPlus } from 'react-icons/fa';

const menuItems = [
  { path: '/', label: 'Home', icon: FaHome },
  { path: '/log-expense', label: 'Log Expense', icon: FaPlus },
  { path: '/settings', label: 'Settings', icon: FaCog },
];

const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-emerald-950/60 m-4 rounded-2xl shadow-lg z-50">
      <ul className="flex justify-around items-center h-16">
        {menuItems.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center w-full h-full transition-all ${
                  isActive ? 'text-emerald-400 bg-emerald-950 p-3 rounded-2xl transform -translate-y-4 shadow-2xl shadow-emerald-300/30' : 'text-white'
                }`
              }
            >
              <item.icon size={24} />
              <span className="text-xs">{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default BottomNav;
