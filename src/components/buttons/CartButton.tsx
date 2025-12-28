"use client";

import { handleCart } from "@/actions/server/cart";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
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

const CartButton = ({ product }: ProductProps) => {
  const session = useSession();
  const [ loading, setLoading ] = useState(false);

  const router = useRouter();
  const path = usePathname();
  const isLogin = session?.status == "authenticated";

  const add2Cart = async () => {
    setLoading(true);
    if (isLogin) {
      const result = await handleCart({ product, inc: true });
      if (result.success) {
        toast.success(`${product.title} added succesfulsly`);
        setLoading(false);
      }
    } else {
      router.push(`/login?callbackUrl=${path}`);
      setLoading(false);
    }
  };
  return (
    <button
      disabled={session.status == "loading" || loading}
      onClick={add2Cart}
      className="btn btn-primary w-full gap-2 text-white"
    >
      <FaShoppingCart />
      Add to Cart
    </button>
  );
};

export default CartButton;
