import ProductSkeleton from "@/components/skeleton/ProductCardSkeleton";

const loading = () => {
  return (
  [...Array(6)].map((_, i) => <ProductSkeleton key={i} />)
  );
};

export default loading;