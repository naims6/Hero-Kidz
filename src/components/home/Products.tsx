import React from "react";
import ProductCard from "../card/ProductCard";
import products from "@/data/toys.json";
const Products = () => {
  return (
    <div>
        <h1 className="text-center text-4xl font-bold mb-10">Our Products</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 mx-auto gap-6"> 
      {products.map((product) => (
        <ProductCard key={product.title} product={product} />
      ))}
        </div>
    </div>
  );
};

export default Products;
