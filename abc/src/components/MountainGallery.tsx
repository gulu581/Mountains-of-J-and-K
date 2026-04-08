import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Maximize2, MapPin, Info } from "lucide-react";

interface Mountain {
  id: string;
  name: string;
  location: string;
  description: string;
  height: string;
  imageUrl: string;
}

const MOUNTAINS: Mountain[] = [
  {
    id: "1",
    name: "Kolahoi Peak",
    location: "Anantnag, Kashmir",
    description: "Known as the 'Matterhorn of Kashmir', Kolahoi is a spectacular pyramid-shaped peak and the highest in the Kashmir Valley.",
    height: "5,425 m",
    imageUrl: "https://picsum.photos/seed/kolahoi/1920/1080?blur=1",
  },
  {
    id: "2",
    name: "Nun Kun Peaks",
    location: "Suru Valley, Ladakh",
    description: "The Nun Kun mountain massif consists of two main peaks: Nun (7,135m) and Kun (7,077m), separated by a snowy plateau.",
    height: "7,135 m",
    imageUrl: "https://picsum.photos/seed/nunkun/1920/1080",
  },
  {
    id: "3",
    name: "Harmukh",
    location: "Ganderbal, Kashmir",
    description: "A sacred mountain standing tall above the Gangabal Lake, Harmukh is steeped in local folklore and spiritual significance.",
    height: "5,142 m",
    imageUrl: "https://picsum.photos/seed/harmukh/1920/1080?grayscale",
  },
  {
    id: "4",
    name: "Sunset Peak",
    location: "Pir Panjal Range",
    description: "The highest peak in the Pir Panjal range, offering breathtaking views of the entire Kashmir Valley during the golden hour.",
    height: "4,745 m",
    imageUrl: "https://picsum.photos/seed/sunsetpeak/1920/1080",
  },
  {
    id: "5",
    name: "Amarnath Peak",
    location: "Ganderbal, Kashmir",
    description: "Located near the holy Amarnath Cave, this peak is a prominent landmark in the Lidder Valley region.",
    height: "5,186 m",
    imageUrl: "https://picsum.photos/seed/amarnath/1920/1080?sepia=1",
  }
];

export default function MountainGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % MOUNTAINS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const next = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % MOUNTAINS.length);
  };

  const prev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + MOUNTAINS.length) % MOUNTAINS.length);
  };

  const currentMountain = MOUNTAINS[currentIndex];

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black text-white font-sans">
      {/* Background Image with Blur Effect */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentMountain.id}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.6, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <img
            src={currentMountain.imageUrl}
            alt={currentMountain.name}
            className="h-full w-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
        </motion.div>
      </AnimatePresence>

      {/* Atmospheric Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col justify-between p-8 md:p-16 lg:p-24">
        {/* Header */}
        <motion.header 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex justify-between items-start"
        >
          <div>
            <h2 className="text-xs uppercase tracking-[0.4em] font-medium text-white/60 mb-2">Majestic Peaks</h2>
            <h1 className="text-4xl md:text-6xl font-serif font-light tracking-tight italic">Jammu & Kashmir</h1>
          </div>
          <button className="p-3 rounded-full border border-white/20 hover:bg-white/10 transition-colors">
            <Maximize2 size={20} />
          </button>
        </motion.header>

        {/* Main Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentMountain.id}
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 30, opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex items-center gap-2 text-white/60 mb-4">
                  <MapPin size={16} />
                  <span className="text-sm uppercase tracking-widest">{currentMountain.location}</span>
                </div>
                <h3 className="text-6xl md:text-8xl lg:text-9xl font-serif font-light mb-8 tracking-tighter leading-none">
                  {currentMountain.name}
                </h3>
                <p className="text-lg md:text-xl text-white/70 max-w-xl leading-relaxed font-light">
                  {currentMountain.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="lg:col-span-5 flex flex-col items-end gap-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentMountain.id + "-stats"}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                className="flex flex-col items-end"
              >
                <span className="text-xs uppercase tracking-[0.3em] text-white/40 mb-1">Elevation</span>
                <span className="text-5xl md:text-7xl font-light tabular-nums">{currentMountain.height}</span>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Controls */}
            <div className="flex items-center gap-6">
              <div className="flex gap-2">
                {MOUNTAINS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setIsAutoPlaying(false);
                      setCurrentIndex(idx);
                    }}
                    className={`h-1 transition-all duration-500 ${
                      idx === currentIndex ? "w-12 bg-white" : "w-4 bg-white/20"
                    }`}
                  />
                ))}
              </div>
              <div className="flex gap-4">
                <button
                  onClick={prev}
                  className="p-4 rounded-full border border-white/20 hover:bg-white/10 transition-all active:scale-95"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={next}
                  className="p-4 rounded-full border border-white/20 hover:bg-white/10 transition-all active:scale-95"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <motion.footer 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 pt-8 border-t border-white/10 flex flex-wrap justify-between items-center gap-4"
        >
          <div className="flex items-center gap-8">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-widest text-white/40">Season</span>
              <span className="text-sm">Summer / Autumn</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-widest text-white/40">Difficulty</span>
              <span className="text-sm">Technical / High Altitude</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-white/40 hover:text-white transition-colors cursor-pointer">
            <Info size={14} />
            <span className="text-[10px] uppercase tracking-widest">Explore Expedition Details</span>
          </div>
        </motion.footer>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-px h-32 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-px h-32 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
    </div>
  );
}
