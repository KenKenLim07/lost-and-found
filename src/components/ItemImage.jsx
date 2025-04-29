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

  return (
    <div className="relative w-full aspect-square mb-2" ref={imageRef}>
      <div className="absolute inset-0">
        {!imageUrl ? (
          <div className="absolute inset-0 bg-gray-100 rounded-xl flex flex-col items-center justify-center p-4 text-center">
            <svg className="w-16 h-16 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-sm text-gray-500 font-medium">No Image Available</p>
            <p className="text-xs text-gray-400 mt-1">The poster was too lazy to add a picture 😴</p>
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
} 