import Image from "next/image";
import React from "react";

const Banner = () => {
  return <div className="flex justify-between items-center">
    <div className="flex-1">
    <h2 className="text-4xl font-bold">আপনার শিশুকে দিন একটি সুন্দর ভবিষ্যত</h2>
    <p>Buy Every toy up to 15% with Discount</p>
    <button>Explore Products</button>
    </div>
    <div className="flex-1">
        <Image alt="" src={"/assets/hero.png"} width={500} height={400}/>
    </div>
  </div>;
};

export default Banner;
