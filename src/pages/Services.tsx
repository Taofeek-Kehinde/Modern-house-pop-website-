import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Layout, 
  Tv, 
  Lightbulb, 
  Grid3x3, 
  Palette,
  Wrench,
  CheckCircle,
  Clock,
  Shield,
  Award,
  Users,
  Star
} from 'lucide-react';
import './Services.css';

const TypewriterText = ({ text, speed = 100, delay = 1000 }: { text: string; speed?: number; delay?: number }) => {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleType = () => {
      if (!isDeleting) {
        // Typing phase
        if (currentIndex < text.length) {
          setDisplayText(text.substring(0, currentIndex + 1));
          setCurrentIndex(currentIndex + 1);
        } else {
          // Finished typing, wait before deleting
          setTimeout(() => setIsDeleting(true), delay);
        }
      } else {
        // Deleting phase
        if (currentIndex > 0) {
          setDisplayText(text.substring(0, currentIndex - 1));
          setCurrentIndex(currentIndex - 1);
        } else {
          // Finished deleting, start typing again
          setIsDeleting(false);
        }
      }
    };

    const timer = setTimeout(handleType, isDeleting ? speed / 2 : speed);
    return () => clearTimeout(timer);
  }, [currentIndex, isDeleting, text, speed, delay]);

  return (
    <span>
      {displayText}
      <span className="cursor">|</span>
    </span>
  );
};

const Services = () => {
  const [activeService, setActiveService] = useState<string>('all');

  const serviceCategories = [
    { id: 'all', name: 'All Services', icon: <Layout /> },
    { id: 'pop', name: 'POP Ceilings', icon: <Layout /> },
    { id: 'tv', name: 'TV Units', icon: <Tv /> },
    { id: 'lighting', name: 'Lighting', icon: <Lightbulb /> },
    { id: 'wall', name: 'Wall Panels', icon: <Grid3x3 /> },
    { id: 'decoration', name: 'Decoration', icon: <Palette /> },
    { id: 'maintenance', name: 'Maintenance', icon: <Wrench /> },
  ];

  const allServices = [
    {
      id: 1,
      category: 'pop',
      title: ' Pop Installation',
      description: 'Professional installation of Plaster of Paris ceilings with modern and with traditional designs',
      icon: <Layout size={32} />,
      features: [
        'Custom Designs',
        'Moisture Resistant',
        'LED Integration',
        'Acoustic Treatment',
        'Fire Resistant'
      ],
      duration: '3-7 days',
      warranty: '5 years',
      price: '₦2000k',
      popular: true
    },
    {
      id: 2,
      category: 'tv',
      title: 'Console Design',
      description: 'Custom TV wall units with ambient lighting, storage, and wire design management',
      icon: <Tv size={32} />,
      features: [
        'Built-in Lighting',
        'Storage Solutions',
        'Wire Management',
        'Custom Finishes',
        'Ambient Effects'
      ],
      duration: '7-14 days',
      warranty: '3 years',
      price: '₦1500K',
      popular: true
    },
    {
      id: 3,
      category: 'lighting',
      title: 'Light Installation',
      description: 'Ambient, accent, and smart lighting solutions for modern spaces with pop installation',
      icon: <Lightbulb size={32} />,
      features: [
        'LED Strips',
        'Smart Lighting',
        'Mood Lighting',
        'Energy Efficient',
        'Remote Control'
      ],
      duration: '2-5 days',
      warranty: '2 years',
      price: '₦3000K',
      popular: true,
    },
    {
      id: 4,
      category: 'wall',
      title: '3D Wall Panels',
      description: 'Modern 3D wall panels that add depth and texture to your walls',
      icon: <Grid3x3 size={32} />,
      features: [
        '3D Effects',
        'Sound Absorption',
        'Easy Maintenance',
        'Variety of Finishes',
        'Quick Installation'
      ],
      duration: '2-4 days',
      warranty: '4 years',
      price: '₦4500K',
      popular: true
    },
    {
      id: 5,
      category: 'decoration',
      title: 'Interior Design',
      description: 'Complete interior decoration services including furniture and accessories',
      icon: <Palette size={32} />,
      features: [
        'Space Planning',
        'Color Consulting',
        'Furniture Selection',
        'Accessory Styling',
        'Complete Makeover'
      ],
      duration: '14-30 days',
      warranty: '7 year',
      price: '₦6100K',
      popular: false
    },
    {
      id: 6,
      category: ' maintenance',
      title: 'Maintenance',
      description: 'Professional repair and maintenance services for all types of POP styles',
      icon: <Wrench size={32} />,
      features: [
        'Crack Repair',
        'Color Touch-up',
        'Lighting Repair',
        'Regular Maintenance',
        'Emergency Service'
      ],
      duration: '1-2 days',
      warranty: '6 months',
      price: '₦5000k',
      popular: false
    },
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Consultation',
      description: 'Free initial consultation to understand your requirements',
      icon: <Users size={24} />
    },
    {
      step: '02',
      title: 'Design',
      description: 'Create custom designs based on your space and preferences',
      icon: <Palette size={24} />
    },
    {
      step: '03',
      title: 'Quote',
      description: 'Transparent pricing with detailed cost breakdown',
      icon: <Award size={24} />
    },
    {
      step: '04',
      title: 'Installation',
      description: 'Professional installation by certified experts',
      icon: <Wrench size={24} />
    },
    {
      step: '05',
      title: 'Inspection',
      description: 'Quality check and final approval from you',
      icon: <CheckCircle size={24} />
    },
    {
      step: '06',
      title: 'Support',
      description: 'Post-installation support and maintenance',
      icon: <Shield size={24} />
    },
  ];

  const filteredServices = activeService === 'all' 
    ? allServices 
    : allServices.filter(service => service.category === activeService);

  return (
    <div className="services">
      {/* Hero Section */}
      <section className="services-hero">
        <div className="container">
          <motion.div
            className="services-hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="services-title">Our Premium Services</h1>
            <p className="services-subtitle">
              From elegant POP ceilings to stunning TV units, we deliver excellence in every project
            </p>
          </motion.div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="section-padding">
        <div className="container">
          <div className="categories-wrapper">
            <div className="categories">
              {serviceCategories.map((category) => (
                <motion.button
                  key={category.id}
                  className={`category-btn ${activeService === category.id ? 'active' : ''}`}
                  onClick={() => setActiveService(category.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="category-icon">{category.icon}</span>
                  <span className="category-name">{category.name}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Services Grid */}
          <div className="services-grid">
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.id}
                className="service-card-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                {service.popular && (
                  <div className="popular-badge">
                    <Star size={12} />
                    <span>Popular</span>
                  </div>
                )}
                
                <div className="service-header">
                  <div className="service-icon-wrapper">
                    {service.icon}
                  </div>
                  <h3 className="service-title-full">{service.title}</h3>
                </div>
                
                <p className="service-description-full">{service.description}</p>
                
                <div className="service-features-list">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="service-feature">
                      <CheckCircle size={16} />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="service-meta">
                  <div className="meta-item">
                    <Clock size={16} />
                    <span>{service.duration}</span>
                  </div>
                  <div className="meta-item">
                    <Shield size={16} />
                    <span>{service.warranty} Warranty</span>
                  </div>
                  <div className="meta-item price">
                    <span className="price-label">Starting at</span>
                    <span className="price-value">{service.price}</span>
                  </div>
                </div>
                
                <div className="service-actions">
                  <Link to={`/book?service=${service.title}`} className="btn btn-primary">
                    Book US 
                  </Link>
                  <Link to={`/services/${service.category}`} className="btn btn-outline">
                    Learn 
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="process-section">
        <div className="container">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Our Process
          </motion.h2>
          <p className="process-subtitle">
            A seamless journey from concept to completion
          </p>
          
          <div className="process-steps">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.step}
                className="process-step"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="step-number">{step.step}</div>
                <div className="step-icon">{step.icon}</div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
                {index < processSteps.length - 1 && (
                  <div className="step-connector"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-choose-section">
        <div className="container">
          <div className="why-choose-grid">
            <motion.div
              className="why-choose-content"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="section-title">Why Choose Us?</h2>
              <div className="reasons-list">
                <div className="reason-item">
                  <div className="reason-number">01</div>
                  <div className="reason-content">
                    <h3>Expert Craftsmanship</h3>
                    <p>10+ years of experience with certified professionals</p>
                  </div>
                </div>
                <div className="reason-item">
                  <div className="reason-number">02</div>
                  <div className="reason-content">
                    <h3>Quality Materials</h3>
                    <p>Premium materials with 5-year warranty on workmanship</p>
                  </div>
                </div>
                <div className="reason-item">
                  <div className="reason-number">03</div>
                  <div className="reason-content">
                    <h3>On-Time Delivery</h3>
                    <p>98% on-time project completion rate</p>
                  </div>
                </div>
                <div className="reason-item">
                  <div className="reason-number">04</div>
                  <div className="reason-content">
                    <h3>Transparent Pricing</h3>
                    <p>No hidden costs, detailed quotations upfront</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              className="why-choose-image"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="image-placeholder-large">
                <div className="floating-shape shape-1"></div>
                <div className="floating-shape shape-2"></div>
                <div className="floating-shape shape-3"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="services-cta">
        <div className="container">
          <motion.div
            className="cta-content-services"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>
              <TypewriterText text="Ready to Transform Your Space?" speed={150} delay={2000} />
            </h2>
            <p>Get a free consultation and quote from our experts</p>
            <div className="cta-buttons-services">
              <Link to="/book" className="btn btn-large">
                Book Free Consultation
              </Link>
              <a href="tel:+2348119825334" className="btn btn-outline btn-large">
                Call US Now: +234 81198-25334
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;