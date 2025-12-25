const ProductSkeleton = () => {
  return (
    <div className="card w-full max-w-sm bg-base-100 shadow-xl border border-base-200">
      {/* Image Skeleton */}
      <div className="px-4 pt-4">
        <div className="skeleton h-64 w-full rounded-xl"></div>
      </div>

      <div className="card-body p-5">
        {/* Title Skeleton */}
        <div className="skeleton h-6 w-3/4 mb-2"></div>
        <div className="skeleton h-6 w-1/2"></div>

        {/* Ratings Skeleton */}
        <div className="flex items-center gap-2 mt-4">
          <div className="skeleton h-4 w-24"></div>
          <div className="skeleton h-4 w-12"></div>
        </div>

        {/* Price Skeleton */}
        <div className="mt-4 flex items-center gap-2">
          <div className="skeleton h-8 w-20"></div>
          <div className="skeleton h-5 w-16"></div>
        </div>

        {/* Button Skeleton */}
        <div className="card-actions mt-4">
          <div className="skeleton h-12 w-full rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;