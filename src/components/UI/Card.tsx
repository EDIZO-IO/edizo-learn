import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { useThemeStore } from '../../stores/themeStore';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  hover = true 
}) => {
  const { isDark } = useThemeStore();

  return (
    <motion.div
      whileHover={hover ? { y: -4 } : {}}
      className={cn(
        'rounded-xl p-6 shadow-lg border transition-shadow',
        isDark
          ? 'bg-gray-800 border-gray-700 hover:shadow-xl'
          : 'bg-white border-gray-200 hover:shadow-xl',
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export default Card;