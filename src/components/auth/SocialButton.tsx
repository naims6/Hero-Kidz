"use client";

import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";

const SocialButton = () => {
  const router = useRouter();
  const params = useSearchParams();
  const handleSignIn = async () => {
    const result = await signIn("google", {
      redirect: false,
      callbackUrl: params.get("callbackUrl") || "/",
    });
    console.log("google sign in result: ", result);
    if (!result) return null;
    if (result.ok) {
      router.push(params.get("callbackUrl") || "/");
      toast.success("google sign in successfull");
    }
  };
  return (
    <button
      onClick={handleSignIn}
      className="btn btn-outline btn-neutral w-full gap-3"
    >
      <FcGoogle className="text-xl" />
      Sign up with Google
    </button>
  );
};

export default SocialButton;
