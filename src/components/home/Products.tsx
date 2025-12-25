import ProductCard from "../card/ProductCard";
import { getProducts } from "@/actions/server/product";

const Products = async () => {
  const products = await getProducts();
  const uiProducts = products.map(product => ({
  ...product,
  _id: product._id.toString(),
}));

  return (
    <div>
      <h1 className="text-center text-4xl font-bold mb-10">Our Products</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 mx-auto gap-6">
        {uiProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
