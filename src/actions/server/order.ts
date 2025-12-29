"use server";

import { collections, dbConnect } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { getCart } from "./cart";

const orderCollection = dbConnect(collections.ORDER);

interface Order {
  fullName: string;
  phoneNumber: string;
  postalCode: string;
  streetAddress: string;
  city: string;
  paymentMethod: string;
}

export const createOrder = async (payload: Order) => {
  console.log(payload);
  const session = await getServerSession();
  if (!session?.user) return { success: false };

  const cart = await getCart();

  if (cart.length === 0) {
    return { success: false };
  }

  const newOrder = {
    ...payload,
    items: cart,
    createdAt: new Date().toISOString(),
  };

  const result = await orderCollection.insertOne(newOrder);

  return { success: result.acknowledged };
};
