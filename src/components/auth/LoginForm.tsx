"use client";
import { FaEnvelope, FaLock } from "react-icons/fa";
import Link from "next/link";
import SocialButton from "@/components/auth/SocialButton";

const LoginForm = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl">
        <div className="card-body">
          <h2 className="text-center text-3xl font-bold mb-6">Welcome Back</h2>

          <form className="space-y-4">
            {/* Email Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Email Address</span>
              </label>
              <div className="input w-full input-bordered flex items-center gap-3">
                <FaEnvelope className="text-gray-400" />
                <input
                  type="email"
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
                  type="password"
                  placeholder="••••••••"
                  className="grow"
                  required
                />
              </div>
              <label className="label">
                <a
                  href="#"
                  className="label-text-alt link link-hover text-primary"
                >
                  Forgot password?
                </a>
              </label>
            </div>

            {/* Login Button */}
            <div className="form-control mt-6">
              <button className="btn w-full  btn-primary text-white">
                Login
              </button>
            </div>
          </form>

          <div className="divider text-gray-400 text-sm">OR</div>

          {/* Google Login */}
          <SocialButton />

          <p className="text-center mt-6 text-sm">
            Don&apos;t have an account?
            <Link href="/register" className="link link-primary font-bold ml-1">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
