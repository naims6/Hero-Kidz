"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import Link from "next/link";
import SocialButton from "@/components/auth/SocialButton";
import { useRouter } from "next/navigation";
import { postUser } from "@/actions/server/auth";

const RegisterForm = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await postUser(form);
if(!result) {
  alert("Something went wrong")
  return 
}
    if ("error" in result) {
      return { message: "Error occured" };
    } else if (result.acknowledged) {
      alert("succesfully. please login");
      router.push("/login");
    } 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl">
        <div className="card-body">
          <h2 className="text-center text-3xl font-bold mb-6">
            Create Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name Input */}
            <div className="">
              <label className="label">
                <span className="label-text font-semibold">Full Name</span>
              </label>
              <div className="input w-full input-bordered flex items-center gap-3">
                <FaUser className="text-gray-400" />
                <input
                  onChange={(e) => handleChange(e)}
                  type="text"
                  placeholder="John Doe"
                  name="name"
                  className="grow"
                  required
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Email Address</span>
              </label>
              <div className="input w-full input-bordered flex items-center gap-3">
                <FaEnvelope className="text-gray-400" />
                <input
                  onChange={(e) => handleChange(e)}
                  type="email"
                  name="email"
                  placeholder="email@example.com"
                  className="grow"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Password</span>
              </label>
              <div className="input w-full input-bordered flex items-center gap-3">
                <FaLock className="text-gray-400" />
                <input
                  onChange={(e) => handleChange(e)}
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  className="grow"
                  required
                />
              </div>
            </div>

            {/* Register Button */}
            <div className="form-control mt-6">
              <button className="btn w-full btn-primary text-white">
                Create Account
              </button>
            </div>
          </form>

          <div className="divider text-gray-400 text-sm">OR</div>

          <SocialButton />

          <p className="text-center mt-6 text-sm">
            Already have an account?
            <Link href="/login" className="link link-primary font-bold ml-1">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
