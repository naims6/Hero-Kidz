"use client";
import { CartItemType } from "@/types/CartItemType";
import Image from "next/image";
import React from "react";
import { FaTrashAlt, FaPlus, FaMinus } from "react-icons/fa";

const CartItem = ({ item }: { item: CartItemType }) => {
  console.log("ITEM", item);
  // --- Handlers ---
  const updateQuantity = () => {
    console.log("updating...");
  };

  const removeItem = () => {
    alert("removing...");
  };

  return (
    <div className="card card-side bg-base-100 shadow-sm border border-base-300 p-2 sm:p-4">
      <figure className="w-24 h-24 sm:w-32 sm:h-32 border border-gray-200 rounded-xl">
        <Image
          src={item?.image}
          width={100}
          height={100}
          alt={item.title}
          className="object-contain w-full h-full"
        />
      </figure>

      <div className="card-body p-4 justify-between">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="card-title text-md sm:text-lg">{item.title}</h2>
            <p className="text-sm text-gray-500 font-mono">{item.productId}</p>
          </div>
          <button
            onClick={() => removeItem()}
            className="btn btn-ghost btn-circle btn-sm text-error"
          >
            <FaTrashAlt />
          </button>
        </div>

        <div className="flex justify-between items-center mt-4">
          <p className="text-xl font-bold text-primary">
            ৳{(item.price * item.quantity).toLocaleString()}
          </p>

          {/* Quantity Controller */}
          <div className="join border border-base-300 bg-base-100">
            <button
              onClick={() => updateQuantity()}
              className="btn btn-ghost join-item btn-sm"
            >
              <FaMinus size={12} />
            </button>
            <span className="join-item px-4 flex items-center justify-center font-bold text-sm">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity()}
              className="btn btn-ghost join-item btn-sm"
            >
              <FaPlus size={12} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
