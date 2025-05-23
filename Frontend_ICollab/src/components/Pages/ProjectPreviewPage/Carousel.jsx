import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const images = [
  '/Avatarman1.png',
  '/AvtarImage1.avif',
  '/AvtarImage2.avif',
  '/AvtarImage3.webp',
  '/Avatarman1.png',
  '/AvtarImage2.avif',
  'https://devfolio.co/_next/image?url=https%3A%2F%2Fassets.devfolio.co%2Fhackathons%2Fd64ead180bfc42bda8cee408f6d39b80%2Fprojects%2F84739795d17344eca8a79f49c1e1316f%2F97fa2051-3d80-46ab-b033-bf45971e78fa.jpeg&w=1440&q=75'
];

function Carousel({media}) {
  const [loaded, setLoaded] = useState(Array(media?.length).fill(false));
  const scrollRef = useRef(null);
  const hasMedia = media?.length > 0;
  const scroll = (direction) => {
    if (!scrollRef.current) return;
    
    const { scrollLeft, clientWidth } = scrollRef.current;
    const scrollAmount = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;

    scrollRef.current.scrollTo({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <div className="relative w-full max-w-screen  p-4">
      {hasMedia && (
        <>
      {/* Left Arrow */}
      <button
        onClick={() => scroll('left')}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-gray-100 shadow-lg rounded-full p-2"
      >
        <ChevronLeft />
      </button>
      
      {/* Gradient Overlay Left */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-32 z-10 bg-gradient-to-r from-white to-transparent"></div>

      {/* Gradient Overlay Right */}
      <div className="pointer-events-none absolute right-0 top-0 h-full w-32 z-10 bg-gradient-to-l from-white to-transparent"></div>

      {/* Right Arrow */}
      <button
        onClick={() => scroll('right')}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-gray-100 shadow-lg rounded-full p-2"
      >
        <ChevronRight />
      </button>
      </>
)}
      {/* Scrollable Carousel */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-4 scroll-smooth px-12"
        style={{ scrollbarWidth: 'none' }}
      >
        {media?.map((url, index) => (
          <div
            key={index}
            className="min-w-[13rem] max-w-[13rem] rounded-xl overflow-hidden shadow-md border transition-opacity duration-300"
          >
            {!loaded[index] && (
          <div className="animate-pulse bg-gray-200 h-full w-full" />
        )}
            <img src={url} alt={`project-media-${index}`}  onLoad={() => setLoaded(prev => [...prev.slice(0, index), true, ...prev.slice(index + 1)])}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/placeholder-media.jpg";
          }} className={`w-full h-auto object-cover ${loaded[index] ? 'block' : 'hidden'}`}/>
          </div>
        ))}
      </div>

      
    </div>
  );
}

export default Carousel;
