import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import './TestimonialSlider.css';

const TestimonialSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      role: 'Home Owner',
      rating: 5,
      content: 'Excellent work on my living room POP ceiling. The team was professional and the design exceeded my expectations.',
      image: '👨'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      role: 'Office Manager',
      rating: 5,
      content: 'Transformed our office space with beautiful lighting and wall panels. Highly recommend their services!',
      image: '👩'
    },
    {
      id: 3,
      name: 'Amit Patel',
      role: 'Restaurant Owner',
      rating: 4,
      content: 'Great work on our restaurant interior. The POP ceiling with ambient lighting created the perfect atmosphere.',
      image: '👨‍🍳'
    },
    {
      id: 4,
      name: 'Sneha Reddy',
      role: 'Interior Designer',
      rating: 5,
      content: 'Professional team with attention to detail. Their TV unit installations are top-notch.',
      image: '👩‍🎨'
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="testimonial-slider">
      <div className="slider-header">
        <h2 className="section-title">What Our Clients Say</h2>
        <p className="section-subtitle">Trusted by homeowners and businesses across the city</p>
      </div>

      <div className="slider-container">
        <button 
          className="slider-nav prev" 
          onClick={prevSlide}
          aria-label="Previous testimonial"
        >
          <ChevronLeft size={24} />
        </button>

        <div className="slider-wrapper">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="testimonial-card"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            >
              <div className="quote-icon">
                <Quote size={24} />
              </div>
              
              <div className="testimonial-content">
                <p>{testimonials[currentIndex].content}</p>
              </div>
              
              <div className="testimonial-rating">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={i < testimonials[currentIndex].rating ? 'filled' : 'empty'}
                  />
                ))}
              </div>
              
              <div className="testimonial-author">
                <div className="author-avatar">{testimonials[currentIndex].image}</div>
                <div className="author-info">
                  <h4>{testimonials[currentIndex].name}</h4>
                  <p>{testimonials[currentIndex].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <button 
          className="slider-nav next" 
          onClick={nextSlide}
          aria-label="Next testimonial"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="slider-dots">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`slider-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialSlider;