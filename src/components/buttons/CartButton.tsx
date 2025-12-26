"use client";

import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { FaShoppingCart } from "react-icons/fa";

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
}

const CartButton = ({product} : ProductProps) => {
  const session = useSession()
  const router = useRouter()
  const path = usePathname()
  const isLogin = session?.status == "authenticated";

    const add2Cart = () => {
        if(isLogin) {
            alert(product._id)
        } else {
            router.push(`/login?callbackUrl=${path}`)
        }
    }
  return (
    <button onClick={add2Cart} className="btn btn-primary w-full gap-2 text-white">
      <FaShoppingCart />
      Add to Cart
    </button>
  );
};

export default CartButton;
