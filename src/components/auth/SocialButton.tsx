"use client";

import { FcGoogle } from "react-icons/fc";

const SocialButton = () => {
  return (
    <button className="btn btn-outline btn-neutral w-full gap-3">
      <FcGoogle className="text-xl" />
      Sign up with Google
    </button>
  );
};

export default SocialButton;
