import { mayabotiFont } from "@/app/layout";
import Image from "next/image";

const Banner = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-center">
      <div className="flex-1">
        <h2 className={`${mayabotiFont.className} text-4xl md:text-6xl font-bold leading-20 max-w-150`}>
          আপনার শিশুকে দিন একটি <span className="text-primary">সুন্দর ভবিষ্যত</span>
        </h2>
        <p>Buy Every toy up to 15% with Discount</p>
        <button>Explore Products</button>
      </div>
      <div className="flex-1 flex justify-end">
        <Image alt="" src={"/assets/hero.png"} width={500} height={400} />
      </div>
    </div>
  );
};

export default Banner;
