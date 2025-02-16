// components/TrendingCarousel.tsx
"use client"; // Ensure this component is client-side rendered
import { useState } from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/types";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  products: Product[];
};

const TrendingSection = ({ products }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsToShow = 3;

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % (products.length - itemsToShow + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + (products.length - itemsToShow + 1)) % (products.length - itemsToShow + 1));
  };

  return (
    <div className="relative">
      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-900 p-3 rounded-full text-white z-10"
        onClick={handlePrev}
        disabled={currentIndex === 0}
      >
        <ChevronLeft />
      </button>

      <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)` }}>
        {products.slice(currentIndex, currentIndex + itemsToShow).map((product) => (
          <div key={product._id} className="flex-shrink-0 w-1/3">
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-900 p-3 rounded-full text-white z-10"
        onClick={handleNext}
        disabled={currentIndex >= products.length - itemsToShow}
      >
        <ChevronRight />
      </button>
    </div>
  );
};

export default TrendingSection;