// src/components/common/FeatureCard.tsx
import React from "react";
import { motion } from "framer-motion";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="p-6 rounded-2xl bg-white shadow-md hover:shadow-lg flex flex-col items-center text-center space-y-4"
    >
      <div className="text-[#DA70D6] text-4xl">{icon}</div>
      <h3 className="text-xl font-semibold text-[#1e3a8a]">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </motion.div>
  );
};

export default FeatureCard;
