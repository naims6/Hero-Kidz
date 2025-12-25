const ProductDetailsSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 animate-pulse">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Left: Image Skeleton */}
        <div className="skeleton h-100 md:h-150 w-full rounded-3xl"></div>

        {/* Right: Info Skeleton */}
        <div className="space-y-6">
          <div className="skeleton h-4 w-24"></div>
          <div className="skeleton h-12 w-3/4"></div>
          <div className="skeleton h-6 w-1/2"></div>
          
          <div className="flex gap-4">
            <div className="skeleton h-4 w-20"></div>
            <div className="skeleton h-4 w-20"></div>
          </div>

          <div className="skeleton h-24 w-full rounded-2xl"></div>

          <div className="space-y-3">
            <div className="skeleton h-6 w-32"></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="skeleton h-4 w-full"></div>
              <div className="skeleton h-4 w-full"></div>
              <div className="skeleton h-4 w-full"></div>
              <div className="skeleton h-4 w-full"></div>
            </div>
          </div>

          <div className="skeleton h-14 w-48 rounded-lg mt-4"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton