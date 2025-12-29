"use client";
import Image from "next/image";
import { FaArrowLeft, FaShoppingBag } from "react-icons/fa";
import React, { useMemo, useState } from "react";
import Link from "next/link";
import CartItem from "@/components/card/CartItem";
import { CartItemType } from "@/types/CartItemType";

interface CartProps {
  cartItems: CartItemType[];
}

const Cart = ({ cartItems }: CartProps) => {
  const [items, setItems] = useState<CartItemType[]>(cartItems);

  // --- Calculations ---
  const subtotal = useMemo(() => items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  ), [items])
  const shipping = items.length > 0 ? 60 : 0;
  const total = subtotal + shipping;

  const removeItem = (id: string) => {
  setItems(prev => prev.filter(item => item._id !== id));
};


  return (
    <div>
      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side: Product List */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <CartItem key={item._id} item={item} removeItem={removeItem}/>
            ))}

            <Link href="/" className="btn btn-ghost gap-2 mt-4">
              <FaArrowLeft /> Continue Shopping
            </Link>
          </div>

          {/* Right Side: Order Summary */}
          <div className="lg:col-span-1">
            <div className="card bg-base-100 shadow-xl border border-base-300 sticky top-10">
              <div className="card-body">
                <h3 className="text-xl font-bold border-b pb-4">
                  Order Summary
                </h3>

                <div className="space-y-3 mt-4">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="font-semibold">
                      ৳{subtotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Shipping Fee</span>
                    <span className="font-semibold">৳{shipping}</span>
                  </div>
                  <div className="divider"></div>
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">
                      ৳{total.toLocaleString()}
                    </span>
                  </div>
                </div>

                <button className="btn btn-primary w-full mt-6 text-white text-lg">
                  Proceed to Checkout
                </button>

                <div className="mt-4 flex items-center justify-center gap-2 grayscale opacity-50">
                  <Image
                    width={80}
                    height={60}
                    src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                    alt="Paypal"
                    className="h-4"
                  />
                  <Image
                    width={80}
                    height={60}
                    src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
                    alt="Visa"
                    className="h-4"
                  />
                  <Image
                    width={80}
                    height={60}
                    src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                    alt="Mastercard"
                    className="h-4"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Empty Cart State */
        <div className="text-center py-20 bg-base-100 rounded-3xl shadow-xl">
          <FaShoppingBag className="mx-auto text-6xl text-gray-200 mb-4" />
          <h2 className="text-2xl font-bold">Your cart is empty</h2>
          <p className="text-gray-500 mt-2">
            Looks like you haven&apos;t added anything yet.
          </p>
          <Link href="/" className="btn btn-primary mt-6 text-white px-8">
            Start Shopping
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
