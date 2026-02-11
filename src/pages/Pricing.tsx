import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Check,
  X,
  HelpCircle,
  Calculator,
  TrendingUp,
  Star,
  Zap
} from 'lucide-react';
import './Pricing.css';
import { FaNairaSign } from 'react-icons/fa6';

const TypewriterText = ({ text, speed = 100, delay = 500 }: { text: string; speed?: number; delay?: number }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (isComplete) return;

    const timer = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayText(text.substring(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      } else {
        setIsComplete(true);
      }
    }, currentIndex === 0 ? delay : speed);

    return () => clearTimeout(timer);
  }, [currentIndex, text, speed, delay, isComplete]);

  return (
    <span>
      {displayText}
      {!isComplete && <span className="cursor">|</span>}
    </span>
  );
};

const LoopingTypewriterText = ({ text, speed = 100, delay = 1000 }: { text: string; speed?: number; delay?: number }) => {
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

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const [, setSelectedPlan] = useState<string>('standard');
  const [calculatorValues, setCalculatorValues] = useState({
    area: 100,
    complexity: 'medium',
    material: 'premium',
    lighting: true
  });

  const pricingPlans = [
    {
      id: 'basic',
      name: 'Basic',
      description: 'Essential POP installation for simple designs',
      monthlyPrice: 4999,
      annualPrice: 49999,
      features: [
        { text: 'Simple POP Design', included: true },
        { text: 'Basic Lighting', included: true },
        { text: 'Standard Materials', included: true },
        { text: '1-Year Warranty', included: true },
        { text: '3D Design Preview', included: false },
        { text: 'Premium Materials', included: false },
        { text: 'Smart Lighting', included: false },
        { text: '5-Year Warranty', included: false }
      ],
      popular: false,
      icon: <Zap size={24} />
    },
    {
      id: 'standard',
      name: 'Standard',
      description: 'Most popular choice for residential projects',
      monthlyPrice: 8999,
      annualPrice: 89999,
      features: [
        { text: 'Custom POP Design', included: true },
        { text: 'LED Lighting', included: true },
        { text: 'Premium Materials', included: true },
        { text: '3D Design Preview', included: true },
        { text: '5-Year Warranty', included: true },
        { text: 'Smart Lighting', included: false },
        { text: 'Extended Support', included: false },
        { text: 'Priority Service', included: false }
      ],
      popular: true,
      icon: <Star size={24} />
    },
    {
      id: 'premium',
      name: 'Premium',
      description: 'Complete solution with smart features',
      monthlyPrice: 14999,
      annualPrice: 149999,
      features: [
        { text: 'Advanced POP Design', included: true },
        { text: 'Smart Lighting System', included: true },
        { text: 'Luxury Materials', included: true },
        { text: '3D VR Preview', included: true },
        { text: '10-Year Warranty', included: true },
        { text: 'Extended Support', included: true },
        { text: 'Priority Service', included: true },
        { text: 'Annual Maintenance', included: true }
      ],
      popular: false,
      icon: <TrendingUp size={24} />
    }
  ];

  const addons = [
    { name: 'TV Unit Installation', price: 15000, description: 'Custom TV wall unit with storage' },
    { name: '3D Wall Panels', price: 8000, description: 'Premium 3D wall panel installation' },
    { name: ' Home Integration', price: 12000, description: 'Voice control and automation' },
    { name: 'Extended Warranty', price: 5000, description: 'Additional 5 years warranty' },
    { name: 'Premium Lighting', price: 10000, description: 'Advanced lighting solutions' },
    { name: 'Quick Installation', price: 8000, description: 'Express service (50% faster)' }
  ];

  const faqs = [
    {
      question: 'What is included in the pricing?',
      answer: 'Our pricing includes design, materials, labor, and basic lighting. Additional features like smart lighting or premium materials are extra.'
    },
    {
      question: 'How long does installation take?',
      answer: 'Most projects take 3-7 days depending on complexity. We provide a detailed timeline during consultation.'
    },
    {
      question: 'Do you offer warranty?',
      answer: 'Yes! We offer 1-10 years warranty depending on the package. All our work is guaranteed.'
    },
    {
      question: 'Can I customize my package?',
      answer: 'Absolutely! We can customize any package to fit your specific needs and budget.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept cash, credit/debit cards, bank transfers, and EMI options are available.'
    },
    {
      question: 'Do you provide free consultation?',
      answer: 'Yes, we offer free consultation and quotation for all projects.'
    }
  ];

  const calculateEstimate = () => {
    let base = calculatorValues.area * 150; 
    
    // Complexity multiplier
    if (calculatorValues.complexity === 'simple') base *= 1;
    if (calculatorValues.complexity === 'medium') base *= 1.5;
    if (calculatorValues.complexity === 'complex') base *= 2;
    
    // Material multiplier
    if (calculatorValues.material === 'standard') base *= 1;
    if (calculatorValues.material === 'premium') base *= 1.8;
    if (calculatorValues.material === 'luxury') base *= 2.5;
    
    // Lighting addon
    if (calculatorValues.lighting) base += 5000;
    
    return Math.round(base);
  };

  const estimate = calculateEstimate();

  return (
    <div className="pricing">
      {/* Hero Section */}
      <section className="pricing-hero">
        <div className="container">
          <motion.div
            className="pricing-hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="pricing-title"><TypewriterText text="Transparent Pricing" speed={150} delay={500} /></h1>
            <p className="pricing-subtitle">
              Quality POP installations at competitive prices with no hidden costs
            </p>
          </motion.div>
        </div>
      </section>

      {/* Price Calculator */}
      <section className="calculator-section">
        <div className="container">
          <motion.div
            className="calculator-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="calculator-header">
              <Calculator size={32} />
              <h2>Cost Calculator</h2>
              <p>Get an instant estimate for your project</p>
            </div>

            <div className="calculator-controls">
              {/* Area */}
              <div className="calculator-input">
                <label>
                  <span>Area (sq.ft)</span>
                  <span className="value-display">{calculatorValues.area} sq.ft</span>
                </label>
                <input
                  type="range"
                  min="50"
                  max="1000"
                  step="10"
                  value={calculatorValues.area}
                  onChange={(e) => setCalculatorValues(prev => ({
                    ...prev,
                    area: parseInt(e.target.value)
                  }))}
                  className="range-slider"
                />
                <div className="range-labels">
                  <span>50 sq.ft</span>
                  <span>1000 sq.ft</span>
                </div>
              </div>

              {/* Complexity */}
              <div className="calculator-input">
                <label>Design Complexity</label>
                <div className="complexity-buttons">
                  {['simple', 'medium', 'complex'].map((level) => (
                    <button
                      key={level}
                      className={`complexity-btn ${calculatorValues.complexity === level ? 'active' : ''}`}
                      onClick={() => setCalculatorValues(prev => ({
                        ...prev,
                        complexity: level
                      }))}
                    >
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Material */}
              <div className="calculator-input">
                <label>Material Quality</label>
                <div className="material-buttons">
                  {['standard', 'premium', 'luxury'].map((material) => (
                    <button
                      key={material}
                      className={`material-btn ${calculatorValues.material === material ? 'active' : ''}`}
                      onClick={() => setCalculatorValues(prev => ({
                        ...prev,
                        material: material
                      }))}
                    >
                      {material.charAt(0).toUpperCase() + material.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Lighting */}
              <div className="calculator-input">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={calculatorValues.lighting}
                    onChange={(e) => setCalculatorValues(prev => ({
                      ...prev,
                      lighting: e.target.checked
                    }))}
                  />
                  <span>Include LED Lighting</span>
                </label>
              </div>
            </div>

            {/* Estimate Result */}
            <motion.div
              className="estimate-result"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring" }}
              key={estimate}
            >
              <div className="estimate-label">Estimated Cost</div>
              <div className="estimate-amount"> ₦{estimate.toLocaleString()}</div>
              <div className="estimate-note">* This is an approximate estimate</div>
              <Link to="/book" className="btn btn-primary">
                Get Exact Quote
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="pricing-plans-section">
        <div className="container">
          <div className="pricing-header">
            <h2 className="section-title">Service Packages</h2>
            <p className="pricing-description">
              Choose the perfect package for your needs
            </p>
            
            {/* Billing Toggle */}
            <div className="billing-toggle">
              <span className={!isAnnual ? 'active' : ''}>Monthly</span>
              <button
                className="toggle-switch"
                onClick={() => setIsAnnual(!isAnnual)}
                aria-label="Toggle billing period"
              >
                <div className={`toggle-slider ${isAnnual ? 'annual' : ''}`}></div>
              </button>
              <span className={isAnnual ? 'active' : ''}>
                Annual <span className="discount-badge">Save 20%</span>
              </span>
            </div>
          </div>

          <div className="pricing-grid">
            {pricingPlans.map((plan, index) => {
              const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
              const displayPrice = isAnnual 
                ? ` ₦${(price / 12).toLocaleString()}/mo`
                : ` ₦${price.toLocaleString()}`;
              
              return (
                <motion.div
                  key={plan.id}
                  className={`pricing-card ${plan.popular ? 'popular' : ''}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                >
                  {plan.popular && (
                    <div className="popular-badge">
                      <Star size={12} />
                      <span>Most Popular</span>
                    </div>
                  )}

                  <div className="plan-header">
                    <div className="plan-icon">{plan.icon}</div>
                    <h3 className="plan-name">{plan.name}</h3>
                    <p className="plan-description">{plan.description}</p>
                  </div>

                  <div className="plan-price">
                    <div className="price-amount">{displayPrice}</div>
                    <div className="price-period">
                      {isAnnual ? 'billed annually' : 'per project'}
                    </div>
                  </div>

                  <ul className="plan-features">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className={feature.included ? 'included' : 'excluded'}>
                        {feature.included ? (
                          <Check size={16} />
                        ) : (
                          <X size={16} />
                        )}
                        <span>{feature.text}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="plan-actions">
                    <button
                      className={`btn ${plan.popular ? 'btn-primary' : 'btn-outline'}`}
                      onClick={() => {
                        setSelectedPlan(plan.id);
                        window.location.href = `/book?plan=${plan.id}`;
                      }}
                    >
                      Select Plan
                    </button>
                    {plan.popular
                      // <div className="selected-badge">Currently Selected</div>
                    }
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Addons */}
      <section className="addons-section">
        <div className="container">
          <h2 className="section-title">Additional Services</h2>
          <p className="addons-subtitle">Enhance your package with these addons</p>
          
          <div className="addons-grid">
            {addons.map((addon, index) => (
              <motion.div
                key={addon.name}
                className="addon-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="addon-header">
                  <h3 className="addon-name">{addon.name}</h3>
                  <div className="addon-price"> ₦{addon.price.toLocaleString()}</div>
                </div>
                <p className="addon-description">{addon.description}</p>
                <button className="btn btn-outline addon-btn">
                  Add to Quote
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section">
        <div className="container">
          <h2 className="section-title">Frequently Asked Questions</h2>
          
          <div className="faq-grid">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.question}
                className="faq-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="faq-icon">
                  <HelpCircle size={24} />
                </div>
                <h3 className="faq-question">{faq.question}</h3>
                <p className="faq-answer">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pricing-cta">
        <div className="container">
          <motion.div
            className="pricing-cta-content"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <FaNairaSign size={48} />
            <h2><LoopingTypewriterText text="Ready to Get Started?" speed={150} delay={2000} /></h2>
            <p>Contact us for a free, no-obligation quote tailored to your project</p>
            <div className="cta-buttons-pricing">
              <Link to="/book" className="btn btn-primary">
                Get Free Quote
              </Link>
              <a href="tel:+2348119825334" className="btn btn-outline">
                {/* <Clock size={18} /> */}
                <span >Schedule Call</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;