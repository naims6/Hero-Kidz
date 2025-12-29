"use server";

import { authOptions } from "@/lib/authOptions";
import { collections, dbConnect } from "@/lib/dbConnect";
import { CartMongoType } from "@/types/CartMongoType";
import { getServerSession } from "next-auth";

const cartCollection = dbConnect(collections.CART);

interface ProductProps {
  product: {
    _id: string;
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
  inc: boolean;
}

export const handleCart = async ({ product, inc = true }: ProductProps) => {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    throw new Error("Unauthorized");
  }
  const user = session.user;

  const query = { email: user?.email, productId: product?._id };

  const isAdded = await cartCollection.findOne(query);

  if (isAdded) {
    // if exist : upadte cart
    const updatedData = {
      $inc: {
        quantity: inc ? 1 : -1,
      },
    };

    const result = await cartCollection.updateOne(query, updatedData);
    return { success: !!result.modifiedCount };
  } else {
    // if not exist create cart
    const newData = {
      productId: product?._id,
      email: user?.email,
      title: product.title,
      quantity: 1,
      image: product.image,
      price: product.price - (product.price * (product.discount ?? 0)) / 100,
    };
    const result = await cartCollection.insertOne(newData);
    return { success: result.acknowledged };
  }
};

export const getCart = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    throw new Error("Unauthorized");
  }
  const user = session.user;

  const query = { email: user?.email };
  const result = await cartCollection.find<CartMongoType>(query).toArray();
  return result;
};
