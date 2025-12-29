import { getCart } from "@/actions/server/cart";
import Checkout from "@/components/checkout/Checkout";
import React from "react";
import { FaShoppingBag } from "react-icons/fa";

const CheckoutPage = async () => {
  const cartItemsFromMongo = await getCart();
  const cartItems = cartItemsFromMongo.map((item) => ({
    ...item,
    _id: item._id.toString(),
  }));
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
        <p className="flex items-center gap-4"><FaShoppingBag className="text-primary" /> CheckOut Page </p> <br />
        <p>Total: {cartItems.length}</p>
      </h1>
      <Checkout cartItems={cartItems} />
    </div>
  );
};

export default CheckoutPage;
