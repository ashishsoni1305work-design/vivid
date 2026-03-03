import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const GoogleReviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Google Reviews data
  const reviews = [
    {
      id: 1,
      name: "Rajesh Sharma",
      rating: 5,
      date: "2 months ago",
      review: "Excellent service! Installed 2000 LPH RO plant for our factory. Very professional team and great after-sales support. Highly recommended for industrial water treatment.",
      avatar: "RS"
    },
    {
      id: 2,
      name: "Priya Verma",
      rating: 5,
      date: "3 months ago",
      review: "Best water treatment company in Bhopal. They installed ETP for our textile unit. CPCB compliant and running smoothly for 2 years now. Thank you VIVID team!",
      avatar: "PV"
    },
    {
      id: 3,
      name: "Amit Patel",
      rating: 5,
      date: "1 month ago",
      review: "Very satisfied with their STP installation at our residential complex. The team is knowledgeable and provides excellent maintenance service under AMC.",
      avatar: "AP"
    },
    {
      id: 4,
      name: "Dr. Suresh Kumar",
      rating: 5,
      date: "4 months ago",
      review: "We got DM plant installed for our hospital. Water quality is excellent and meets all medical standards. Professional approach and timely delivery.",
      avatar: "SK"
    },
    {
      id: 5,
      name: "Mohit Agarwal",
      rating: 4,
      date: "2 months ago",
      review: "Good experience with VIVID H2O. They provided customized solution for our pharma unit. Reasonable pricing and reliable equipment.",
      avatar: "MA"
    },
    {
      id: 6,
      name: "Sunita Joshi",
      rating: 5,
      date: "5 months ago",
      review: "Installed commercial RO for our restaurant chain. Water taste has improved significantly. Customers are happy. Great service!",
      avatar: "SJ"
    },
    {
      id: 7,
      name: "Vikram Singh",
      rating: 5,
      date: "1 month ago",
      review: "SCADA system installation was done perfectly. Now we can monitor our entire water treatment plant remotely. Very impressed with the technology.",
      avatar: "VS"
    },
    {
      id: 8,
      name: "Neha Gupta",
      rating: 5,
      date: "3 months ago",
      review: "Pool filtration system working great at our resort. Crystal clear water and low maintenance. VIVID team is very responsive to queries.",
      avatar: "NG"
    }
  ];

  // Auto-slide every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  // Get visible reviews (3 at a time on desktop)
  const getVisibleReviews = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      visible.push(reviews[(currentIndex + i) % reviews.length]);
    }
    return visible;
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-white overflow-hidden" data-testid="google-reviews">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <svg className="w-8 h-8" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span className="font-heading font-bold text-xl text-gray-800">Google Reviews</span>
          </div>
          <h2 className="font-heading font-bold text-3xl lg:text-4xl text-gray-900">
            What Our Customers Say
          </h2>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-lg font-semibold text-gray-700">4.6/5</span>
            <span className="text-gray-500">(102 reviews)</span>
          </div>
        </motion.div>

        {/* Reviews Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors hidden lg:flex"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors hidden lg:flex"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>

          {/* Reviews Grid */}
          <div className="grid md:grid-cols-3 gap-6 px-4">
            <AnimatePresence mode="wait">
              {getVisibleReviews().map((review, index) => (
                <motion.div
                  key={`${review.id}-${currentIndex}`}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow relative"
                >
                  {/* Quote Icon */}
                  <Quote className="absolute top-4 right-4 w-8 h-8 text-blue-100" />
                  
                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                    {[...Array(5 - review.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-gray-300" />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-gray-600 mb-6 line-clamp-4">"{review.review}"</p>

                  {/* Reviewer Info */}
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#0d47a1] to-[#1976d2] rounded-full flex items-center justify-center text-white font-bold">
                      {review.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{review.name}</p>
                      <p className="text-sm text-gray-500">{review.date}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? 'bg-[#0d47a1] w-6' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div 
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <a 
            href="https://g.page/r/vivid-h2o-solutions/review" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#0d47a1] font-semibold hover:underline"
          >
            Write a Review on Google
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default GoogleReviews;
