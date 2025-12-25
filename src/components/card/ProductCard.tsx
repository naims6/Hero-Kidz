import React from "react";
import Image from "next/image";
import {
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaShoppingCart,
} from "react-icons/fa";
import { CiViewTimeline } from "react-icons/ci";
import Link from "next/link";

interface ProductProps {
  product: {
    _id: string,
    title: string;
    bangla: string;
    image: string;
    price: number;
    discount?: number; 
    ratings: number;
    reviews: number;
    sold: number;
    youtube?: string;
    description?: string;
    percentage?: number; // Added this since it's in your JSON
  };
}

const ProductCard = ({ product }: ProductProps) => {
  const { title, image, price, discount=0, ratings, reviews, sold, _id = undefined } = product;

  // Calculate discounted price
  const discountedPrice = price - (price * discount) / 100;

  // Function to render stars based on rating
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i - 0.5 <= rating) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400" />);
      }
    }
    return stars;
  };

  return (
    <div className="card w-full mx-auto max-w-sm bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-base-200">
      {/* Image Section */}
      <figure className="relative px-4 pt-4">
        <div className="relative h-64 w-full overflow-hidden rounded-xl">
          <Image
            src={image}
            alt={title}
            className="h-full w-full object-contain bg-gray-50 hover:scale-105 transition-transform duration-500"
            width={300}
            height={220}
          />
        </div>
        {discount > 0 && (
          <div className="absolute top-6 left-6 badge badge-secondary font-bold p-3">
            -{discount}%
          </div>
        )}
      </figure>

      {/* Content Section */}
      <div className="card-body p-5">
        <h2 className="card-title text-lg font-bold leading-tight min-h-14">
          {title}
        </h2>

        {/* Ratings & Reviews */}
        <div className="flex items-center gap-2 mt-1">
          <div className="flex text-sm">{renderStars(ratings)}</div>
          <span className="text-xs text-gray-500 font-medium">
            ({reviews} Reviews)
          </span>
          <div className="divider divider-horizontal mx-0"></div>
          <span className="text-xs text-gray-500">{sold} Sold</span>
        </div>

        {/* Price Section */}
        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-2xl font-extrabold text-primary">
            ৳{discountedPrice.toLocaleString()}
          </span>
          {discount > 0 && (
            <span className="text-sm text-gray-400 line-through">
              ৳{price.toLocaleString()}
            </span>
          )}
        </div>

        {/* Action Button */}
        <div className="card-actions mt-4">
          <button className="btn btn-primary w-full gap-2 text-white">
            <FaShoppingCart />
            Add to Cart
          </button>
          <Link href={`/products/${_id}`} className="btn btn-primary w-full gap-2 text-white">
            <CiViewTimeline />
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
