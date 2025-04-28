import { useState, useEffect, useRef } from "react";

export default function ItemImage({ imageUrl, title, onImageClick }) {
  const [isLoading, setLoading] = useState(true);
  const [isInView, setIsInView] = useState(false);
  const imageRef = useRef(null);

  useEffect(() => {
    if (!imageRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "200px 0px",
        threshold: 0.1,
      }
    );

    observer.observe(imageRef.current);

    return () => {
      if (observer) observer.disconnect();
    };
  }, []);

  if (!imageUrl) return null;

  return (
    <div className="relative w-full aspect-square mb-2" ref={imageRef}>
      <div className="absolute inset-0">
        {/* Placeholder while loading */}
        <div 
          className={`absolute inset-0 bg-gray-200 rounded-xl transition-opacity duration-300 ${
            isLoading ? 'opacity-100' : 'opacity-0'
          }`}
        />
        
        {/* Actual image with lazy loading */}
        {isInView && (
          <img
            src={imageUrl}
            alt={title}
            className={`w-full h-full object-cover rounded-xl cursor-pointer transition-all duration-700 ease-in-out ${
              isLoading
                ? "grayscale blur-2xl scale-110"
                : "grayscale-0 blur-0 scale-100"
            }`}
            onClick={() => onImageClick(imageUrl)}
            onLoad={() => setLoading(false)}
            loading="lazy"
          />
        )}
        
        {/* Tap to view full screen text */}
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs py-1 text-center rounded-b-xl border-t border-gray-700">
          Tap image to see Full Screen
        </div>
      </div>
    </div>
  );
} 