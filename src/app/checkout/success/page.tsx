import Link from "next/link";
import React from "react";

const CheckoutSuccess = () => {
  return (
    <div>
      <h1 className="text-xl">Checkout Success</h1>
      <Link href={"/products"}>Continue Shoping</Link>
    </div>
  );
};

export default CheckoutSuccess;
