import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import './PageLoader.css';

const PageLoader = () => {
  return (
    <motion.div
      className="page-loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="loader-content"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      >
        <Loader2 size={48} />
      </motion.div>
      <p className="loader-text">Loading...</p>
    </motion.div>
  );
};

export default PageLoader;