"use server";

import { ObjectId } from "mongodb";
import { collections, dbConnect } from "../../lib/dbConnect";
import { Product } from "@/types/product";
import { ProductDetails } from "@/types/product-details";

export const getProducts = async () => {
  const products = await dbConnect(collections.PRODUCTS)
    .find<Product>({})
    .toArray();
  return products;
};

export const getSingleProducts = async (id: string) => {
  if (id.length != 24) {
    throw new Error("Invalid product id")
  }

  const query = { _id: new ObjectId(id) };
  const product = await dbConnect(collections.PRODUCTS).findOne<ProductDetails>(
    query
  );

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};
