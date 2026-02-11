import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './ServiceCard.css';

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  features: string[];
  link: string;
}

const ServiceCard = ({ title, description, image, features, link }: ServiceCardProps) => {
  return (
    <motion.div
      className="service-card"
      whileHover={{
        y: -10,
        boxShadow: "0 20px 40px rgba(212, 175, 55, 0.15)"
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="service-image-container">
        <motion.img
          src={image}
          alt={title}
          className="service-image"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
      </div>
      <h3 className="service-title">{title}</h3>
      <p className="service-description">{description}</p>
      
      <ul className="service-features">
        {features.map((feature, index) => (
          <li key={index}>
            <span className="feature-check">✓</span>
            {feature}
          </li>
        ))}
      </ul>
      
      <Link to={link} className="service-link">
        Learn More
        <ArrowRight size={16} />
      </Link>
    </motion.div>
  );
};

export default ServiceCard;