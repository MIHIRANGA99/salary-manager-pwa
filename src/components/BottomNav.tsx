import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome, FaCog, FaPlus, FaHistory } from 'react-icons/fa';

const menuItems = [
  { path: '/', label: 'Home', icon: FaHome },
  { path: '/log-expense', label: 'Log', icon: FaPlus },
  { path: '/history', label: 'History', icon: FaHistory },
  { path: '/settings', label: 'Settings', icon: FaCog },
];

const BottomNav = () => {
  return (
    <motion.nav 
      className="fixed bottom-0 left-0 right-0 bg-emerald-950/60 m-4 rounded-2xl shadow-lg z-50"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring' as const, stiffness: 300, damping: 30 }}
    >
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
              {({ isActive }) => (
                <motion.div
                  className="flex flex-col items-center"
                  whileTap={{ scale: 0.9 }}
                  animate={isActive ? { scale: 1.1, y: -4 } : { scale: 1, y: 0 }}
                  transition={{ type: 'spring' as const, stiffness: 400, damping: 20 }}
                >
                  <motion.div
                    animate={isActive ? { rotate: item.path === '/log-expense' ? 90 : 0 } : { rotate: 0 }}
                    transition={{ type: 'spring' as const, stiffness: 300 }}
                  >
                    <item.icon size={24} />
                  </motion.div>
                  <span className="text-xs">{item.label}</span>
                </motion.div>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
};

export default BottomNav;
