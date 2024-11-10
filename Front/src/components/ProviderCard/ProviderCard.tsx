"use client";
import React from 'react';
import Image from 'next/image';
import { ProviderCardProps } from '@/interfaces/IProviderCardProps';

// interface ProviderCardProps {
//   providerName: string;
//   description: string;
//   imageUrl: string;
//   rating: number;
// }

const ProviderCard: React.FC<ProviderCardProps> = ({ providerName, description, imageUrl, rating }) => {
  const flooredRating = Math.floor(rating);

  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <Image className="p-8 rounded-t-lg" src={imageUrl} alt={`${providerName} image`} width={400} height={250} />
      <div className="px-5 pb-5">
        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{providerName}</h5>
        <p className="text-sm text-gray-500 dark:text-gray-400 my-2">{description}</p>
        
        <div className="flex items-center mt-2.5 mb-5">
          {Array.from({ length: 5 }).map((_, index) => (
            <svg
              key={index}
              className={`w-5 h-5 ${index < flooredRating ? 'text-yellow-400' : 'text-gray-300'}`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.39 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.538 1.118l-3.39-2.46a1 1 0 00-1.175 0l-3.39 2.46c-.783.57-1.838-.197-1.538-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.2 8.394c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.967z" />
            </svg>
          ))}
          <span className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">{rating.toFixed(1)}</span>
        </div>

        <button
          className="w-full py-2 mt-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
          onClick={() => console.log(`Navigate to provider page`)}
        >
          Hire Services
        </button>
      </div>
    </div>
  );
};

export default ProviderCard;
