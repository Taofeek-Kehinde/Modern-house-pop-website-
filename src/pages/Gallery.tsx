import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  X, 
  ChevronLeft, 
  ChevronRight,
  Maximize2,
  Home,
  Tv,
  Lightbulb,
  Grid3x3
} from 'lucide-react';
import './Gallery.css';

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

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const categories = [
    { id: 'all', name: 'All Projects', icon: <Home size={18} />, count: 48 },
    { id: 'pop', name: 'POP Ceilings', icon: <Home size={18} />, count: 24 },
    { id: 'tv', name: 'TV Units', icon: <Tv size={18} />, count: 16 },
    { id: 'lighting', name: 'Lighting', icon: <Lightbulb size={18} />, count: 18 },
    { id: 'wall', name: 'Wall Panels', icon: <Grid3x3 size={18} />, count: 12 },
    { id: 'commercial', name: 'Commercial', icon: <Home size={18} />, count: 8 },
  ];

  const galleryItems = [
    { id: 1, category: 'pop', title: 'Modern Living Room POP', description: 'Contemporary POP ceiling with LED lighting', tags: ['Modern', 'LED', 'Living Room'], image: '../src/assets/L1.jpg' },
    { id: 2, category: 'tv', title: 'Minimalist TV Unit', description: 'Floating TV unit with hidden storage', tags: ['Minimalist', 'Storage', 'Modern'], image: '../src/assets/L2.jpg' },
    { id: 3, category: 'lighting', title: 'Ambient Bedroom Lighting', description: 'Soft lighting for bedroom ambiance', tags: ['Ambient', 'Bedroom', 'Warm'], image: '../src/assets/L3.jpg' },
    { id: 4, category: 'wall', title: '3D Feature Wall', description: 'Geometric 3D wall panels', tags: ['3D', 'Geometric', 'Feature Wall'], image: '../src/assets/L4.jpg' },
    { id: 5, category: 'pop', title: 'Traditional POP Design', description: 'Classic POP ceiling with intricate patterns', tags: ['Traditional', 'Pattern', 'Classic'], image: '../src/assets/L5.jpg' },
    { id: 6, category: 'tv', title: 'Entertainment Wall Unit', description: 'Complete entertainment wall with shelves', tags: ['Entertainment', 'Shelves', 'Complete'], image: '../src/assets/L6.jpg' },
    { id: 7, category: 'lighting', title: 'Smart Home Lighting', description: 'Voice-controlled smart lighting system', tags: ['Smart', 'Voice Control', 'Modern'], image: '../src/assets/L7.jpg' },
    { id: 8, category: 'commercial', title: 'Office POP Ceiling', description: 'Corporate office ceiling design', tags: ['Commercial', 'Office', 'Professional'], image: '../src/assets/l9.jpg' },
    { id: 9, category: 'pop', title: 'Kitchen POP with Lighting', description: 'Functional kitchen ceiling with task lighting', tags: ['Kitchen', 'Task Lighting', 'Functional'], image: '../src/assets/L8.jpg' },
    { id: 10, category: 'tv', title: 'Corner TV Unit', description: 'Space-saving corner TV installation', tags: ['Corner', 'Space Saving', 'Compact'], image: '../src/assets/L10.jpg' },
    { id: 11, category: 'lighting', title: 'Bathroom Patio Lights', description: 'Weather-proof Bathroom lighting', tags: ['Bathroom', 'Patio', 'Weatherproof'], image: '../src/assets/L11.jpg' },
    { id: 12, category: 'wall', title: 'Balcony Wall Panels', description: 'Decorative accent wall in outside', tags: ['Accent', 'Decorative', 'Bedroom'], image: '../src/assets/L12.jpg' },
  ];

  useEffect(() => {
    // Simulate image loading
    const timer = setTimeout(() => {
      setImagesLoaded(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const filteredItems = galleryItems.filter(item => {
    const matchesCategory = activeFilter === 'all' || item.category === activeFilter;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handlePrevImage = () => {
    if (selectedImage !== null) {
      const prevIndex = selectedImage === 0 ? filteredItems.length - 1 : selectedImage - 1;
      setSelectedImage(prevIndex);
    }
  };

  const handleNextImage = () => {
    if (selectedImage !== null) {
      const nextIndex = selectedImage === filteredItems.length - 1 ? 0 : selectedImage + 1;
      setSelectedImage(nextIndex);
    }
  };

  return (
    <div className="gallery">
      {/* Hero Section */}
      <section className="gallery-hero">
        <div className="container">
          <motion.div
            className="gallery-hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="gallery-title">Our Portfolio</h1>
            <p className="gallery-subtitle">
              Explore our finest work in POP installations, TV units, and lighting solutions
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="gallery-controls">
        <div className="container">
          <div className="controls-wrapper">
            {/* Search */}
            <motion.div 
              className="search-box"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Search size={20} />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              {searchQuery && (
                <button 
                  className="clear-search"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              )}
            </motion.div>

            {/* Categories */}
            <div className="categories-scroll">
              {categories.map((category, index) => (
                <motion.button
                  key={category.id}
                  className={`category-filter ${activeFilter === category.id ? 'active' : ''}`}
                  onClick={() => setActiveFilter(category.id)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="filter-icon">{category.icon}</span>
                  <span className="filter-name">{category.name}</span>
                  <span className="filter-count">{category.count}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="gallery-grid-section">
        <div className="container">
          <AnimatePresence>
            {filteredItems.length > 0 ? (
              <motion.div 
                className="gallery-grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                key={activeFilter + searchQuery}
              >
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    className="gallery-item"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ 
                      opacity: imagesLoaded ? 1 : 0,
                      scale: imagesLoaded ? 1 : 0.8
                    }}
                    transition={{ 
                      duration: 0.5, 
                      delay: index * 0.05,
                      type: "spring",
                      stiffness: 100
                    }}
                    whileHover={{ 
                      scale: 1.03,
                      transition: { duration: 0.2 }
                    }}
                    layout
                  >
                    <div
                      className="gallery-image"
                      onClick={() => setSelectedImage(index)}
                      role="button"
                      tabIndex={0}
                      aria-label={`View ${item.title}`}
                    >
                      <div className="image-overlay">
                        <Maximize2 size={24} />
                      </div>
                      <img
                        src={item.image}
                        alt={item.title}
                        className="gallery-image-src"
                        loading="lazy"
                      />
                    </div>
                    
                    <div className="gallery-info">
                      <div className="gallery-tags">
                        {item.tags.map((tag, tagIndex) => (
                          <span key={tagIndex} className="tag">{tag}</span>
                        ))}
                      </div>
                      <h3 className="gallery-item-title">{item.title}</h3>
                      <p className="gallery-item-description">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                className="no-results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Filter size={48} />
                <h3>No projects found</h3>
                <p>Try adjusting your filters or search terms</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Project Count */}
          <motion.div 
            className="project-count"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Showing <span className="count-highlight">{filteredItems.length}</span> of {galleryItems.length} projects
          </motion.div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="lightbox-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="lightbox-close"
                onClick={() => setSelectedImage(null)}
                aria-label="Close lightbox"
              >
                <X size={24} />
              </button>

              <div className="lightbox-image">
                <img
                  src={filteredItems[selectedImage].image}
                  alt={filteredItems[selectedImage].title}
                  className="lightbox-image-src"
                />
                <div className="image-info">
                  <h3>{filteredItems[selectedImage].title}</h3>
                  <p>{filteredItems[selectedImage].description}</p>
                  <div className="image-tags">
                    {filteredItems[selectedImage].tags.map((tag, index) => (
                      <span key={index} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lightbox-navigation">
                <button
                  className="nav-button prev"
                  onClick={handlePrevImage}
                  aria-label="Previous image"
                >
                  <ChevronLeft size={24} />
                </button>
                
                <div className="image-counter">
                  {selectedImage + 1} / {filteredItems.length}
                </div>
                
                <button
                  className="nav-button next"
                  onClick={handleNextImage}
                  aria-label="Next image"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <section className="gallery-cta">
        <div className="container">
          <motion.div
            className="gallery-cta-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2><TypewriterText text="Inspired by Our Work?" speed={150} delay={2000} /></h2>
            <p>Let's create something amazing for your space</p>
            <div className="cta-buttons-gallery">
              <button className="btn btn-primary" onClick={() => window.location.href = '/book'}>
                Start Your Project
              </button>
              <button className="btn btn-outline" onClick={() => window.location.href = '/contact'}>
                Request Consultation
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;