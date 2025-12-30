"use client";
import { createOrder } from "@/actions/server/order";
import { CartItemType } from "@/types/CartItemType";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FaShieldAlt,
  FaTruck,
  FaCreditCard,
  FaLock,
  FaMapMarkerAlt,
} from "react-icons/fa";
// import { SiBkash, SiNagad } from "react-icons/si";
interface CheckoutProps {
  cartItems: CartItemType[];
}

const Checkout = ({ cartItems }: CheckoutProps) => {
  const { data, status } = useSession();
  const router = useRouter();
  console.log(data);
  console.log("checkout cartitems length:", cartItems.length);
  const [form, setForm] = useState({
    fullName: data?.user?.name ?? "",
    phoneNumber: "",
    streetAddress: "",
    city: "",
    postalCode: "",
    paymentMethod: "cod",
  });

  const paymentMethods = [
    {
      id: "cod",
      label: "Cash on Delivery",
      sub: "Pay when you receive",
    },
    {
      id: "bkash",
      label: "bKash",
      sub: "Online Payment",
      color: "pink",
    },
    {
      id: "nagad",
      label: "Nagad",
      sub: "Online Payment",
      color: "orange",
    },
  ];

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await createOrder(form);
    if (result.success) {
      toast.success("Order confirmed");
      router.push("/checkout/success");
    } else {
      toast.error("something went error");
    }
  };

  useEffect(() => {
    if (status === "authenticated" && data?.user?.name) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm((prev) => ({ ...prev, fullName: data.user.name as string }));
    }
  }, [data, status]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...,
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-extrabold flex items-center gap-3">
            Secure Checkout <FaShieldAlt className="text-success" />
          </h1>
          <div className="flex items-center gap-2 text-sm text-gray-500 bg-base-100 px-4 py-2 rounded-full shadow-sm">
            <FaLock className="text-success" /> SSL Encrypted & Secure
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side: Forms */}
          <div className="lg:col-span-2 space-y-6">
            <form onSubmit={(e) => handleSubmit(e)}>
              {/* 1. Shipping Information */}
              <div className="card bg-base-100 shadow-sm border border-base-300">
                <div className="card-body">
                  <h2 className="card-title flex items-center gap-2 mb-4">
                    <FaMapMarkerAlt className="text-primary" /> Shipping
                    Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold">
                          Full Name
                        </span>
                      </label>
                      <input
                        onChange={(e) => handleChange(e)}
                        name="fullName"
                        type="text"
                        value={form?.fullName}
                        placeholder="John Doe"
                        className="input input-bordered focus:input-primary"
                        required
                        readOnly
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold">
                          Phone Number
                        </span>
                      </label>
                      <input
                        onChange={(e) => handleChange(e)}
                        name="phoneNumber"
                        type="tel"
                        placeholder="017XXXXXXXX"
                        className="input input-bordered focus:input-primary"
                        required
                      />
                    </div>
                    <div className="form-control md:col-span-2">
                      <label className="label">
                        <span className="label-text font-semibold">
                          Street Address
                        </span>
                      </label>
                      <textarea
                        onChange={(e) => handleChange(e)}
                        name="streetAddress"
                        className="textarea textarea-bordered h-24"
                        placeholder="House no, Road no, Area..."
                      ></textarea>
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold">City</span>
                      </label>
                      <select
                        onChange={(e) => handleChange(e)}
                        name="city"
                        className="select select-bordered w-full"
                      >
                        <option disabled>Select City</option>
                        <option>Dhaka</option>
                        <option>Chittagong</option>
                        <option>Sylhet</option>
                      </select>
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold">
                          Postal Code
                        </span>
                      </label>
                      <input
                        onChange={(e) => handleChange(e)}
                        type="text"
                        placeholder="1212"
                        name="postalCode"
                        className="input input-bordered"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Delivery Method */}
              <div className="card bg-base-100 shadow-sm border border-base-300">
                <div className="card-body">
                  <h2 className="card-title flex items-center gap-2 mb-4">
                    <FaTruck className="text-primary" /> Delivery Method
                  </h2>
                  <div className="form-control">
                    <label className="label cursor-pointer border rounded-xl p-4 hover:bg-base-200 transition-colors">
                      <div className="flex items-center gap-4">
                        <input
                          type="radio"
                          name="deliveryMethod"
                          className="radio radio-primary"
                        />
                        <div>
                          <span className="font-bold block">
                            Standard Delivery
                          </span>
                          <span className="text-sm text-gray-500">
                            2-3 Business Days
                          </span>
                        </div>
                      </div>
                      <span className="font-bold">৳60</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* 3. Payment Method */}
              <div className="card bg-base-100 shadow-sm border border-base-300">
                <div className="card-body">
                  <h2 className="card-title flex items-center gap-2 mb-4">
                    <FaCreditCard className="text-primary" /> Payment Method
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {paymentMethods.map((pmethod) => (
                      <label
                        key={pmethod.id}
                        htmlFor={pmethod.id}
                        className="w-full h-full bg-ambe-400"
                      >
                        <input
                          onChange={(e) => handleChange(e)}
                          type="radio"
                          className="hidden peer"
                          name="paymentMethod"
                          id={pmethod.id}
                          value={pmethod.id}
                          defaultChecked={pmethod.id === "cod"}
                        />
                        <div
                          className={`btn btn-outline h-20 flex flex-col gap-1 border-2  peer-checked:border-primary
                         peer-checked:bg-primary/10 w-full `}
                        >
                          <span className="font-bold">{pmethod.label}</span>
                          <span className="text-[10px] opacity-70">
                            {pmethod.sub}
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              <button className="btn btn-primary w-full mt-8">Checkout</button>
            </form>
          </div>

          {/* Right Side: Order Summary */}
          <div className="lg:col-span-1">
            <div className="card bg-base-100 shadow-xl border border-base-300 sticky top-10">
              <div className="card-body">
                <h3 className="text-xl font-bold border-b pb-4">Your Order</h3>

                {/* Mini Product List */}
                <div className="space-y-4 py-4 max-h-60 overflow-y-auto">
                  <div className="flex gap-3">
                    <div className="avatar">
                      <div className="w-12 h-12 rounded-lg">
                        <Image
                          width={100}
                          height={100}
                          src="https://i.ibb.co.com/203h05Sq/image.png"
                          alt="Product"
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold line-clamp-1">
                        Doctor Costume Set
                      </h4>
                      <p className="text-xs text-gray-500">Qty: 2 × ৳1,276</p>
                    </div>
                    <p className="text-sm font-bold">৳2,552</p>
                  </div>
                </div>

                <div className="divider opacity-50"></div>

                {/* Totals */}
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Subtotal</span>
                    <span>৳2,552</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Shipping</span>
                    <span>৳60</span>
                  </div>
                  <div className="divider"></div>
                  <div className="flex justify-between text-lg font-extrabold">
                    <span>Grand Total</span>
                    <span className="text-primary">৳2,612</span>
                  </div>
                </div>

                {/* Submit Button */}
                <button className="btn btn-primary w-full mt-8 text-white text-lg shadow-lg shadow-primary/30">
                  Complete Order
                </button>

                <p className="text-[11px] text-center text-gray-400 mt-4 italic">
                  By clicking &quot;Complete Order&quot;, you agree to our Terms
                  of Service and Privacy Policy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
