"use server";

import { collections, dbConnect } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { clearCart, getCart } from "./cart";
import { sendEmail } from "@/lib/sendEmail";
import { orderConfirmationEmail } from "@/lib/orderConfirmationEmail";

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
  if (!!result.acknowledged) {
    await clearCart();

    await sendEmail({
      to: session.user.email!,
      subject: "Order Confirmation - Thank You for Your Purchase",
      html: orderConfirmationEmail({
        fullName: payload.fullName,
        items: cart,
      }),
    });
  }
  return { success: result.acknowledged };
};
