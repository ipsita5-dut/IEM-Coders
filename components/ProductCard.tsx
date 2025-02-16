import { Product } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  return (
    <Link 
      href={`/products/${product._id}`} 
      className="product-card block bg-white shadow-lg rounded-2xl overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-2xl"
    >
      <div className="product-card_img-container relative overflow-hidden">
        <Image 
          src={product.image} 
          alt={product.title} 
          width={300} 
          height={300} 
          className="product-card_img w-full h-64 object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>

      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-gray-900 truncate">{product.title}</h3>

        <div className="flex justify-between items-center text-gray-600 text-sm">
          <p className="capitalize">{product.category}</p>
          <p className="text-gray-900 font-semibold text-lg">
            <span>{product?.currency}</span>
            <span>{product?.currentPrice}</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
