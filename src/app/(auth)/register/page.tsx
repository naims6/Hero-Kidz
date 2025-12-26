import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import Link from 'next/link';

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl">
        <div className="card-body">
          <h2 className="text-center text-3xl font-bold mb-6">Create Account</h2>
          
          <form className="space-y-4">
            {/* Full Name Input */}
            <div className="">
              <label className="label">
                <span className="label-text font-semibold">Full Name</span>
              </label>
              <div className="input w-full input-bordered flex items-center gap-3">
                <FaUser className="text-gray-400" />
                <input type="text" placeholder="John Doe" className="grow" required />
              </div>
            </div>

            {/* Email Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Email Address</span>
              </label>
              <div className="input w-full input-bordered flex items-center gap-3">
                <FaEnvelope className="text-gray-400" />
                <input type="email" placeholder="email@example.com" className="grow" required />
              </div>
            </div>

            {/* Password Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Password</span>
              </label>
              <div className="input w-full input-bordered flex items-center gap-3">
                <FaLock className="text-gray-400" />
                <input type="password" placeholder="••••••••" className="grow" required />
              </div>
            </div>

            {/* Register Button */}
            <div className="form-control mt-6">
              <button className="btn w-full btn-primary text-white">Create Account</button>
            </div>
          </form>

          <div className="divider text-gray-400 text-sm">OR</div>

          <button className="btn btn-outline btn-neutral w-full gap-3">
            <FcGoogle className="text-xl" />
            Sign up with Google
          </button>

          <p className="text-center mt-6 text-sm">
            Already have an account? 
            <Link href="/login" className="link link-primary font-bold ml-1">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;