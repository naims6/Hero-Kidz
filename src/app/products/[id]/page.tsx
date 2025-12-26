import { getSingleProducts } from "@/actions/server/product";
import CartButton from "@/components/buttons/CartButton";
import type { Metadata } from "next";
import Image from "next/image";

import {
  FaStar,
  FaCheckCircle,
  FaQuestionCircle,
} from "react-icons/fa";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = await getSingleProducts(id);

  if(!product) {
    return {title: "Product Not Found"}
  }

  return {
    title: product.title,
    description: product.description.slice(0, 160), // Google likes < 160 chars
    openGraph: {
      title: `${product.title} | Hero Kidz`,
      description: product.description.slice(0, 160),
      images: [
        {
          url: product.image,
          width: 800,
          height: 600,
          alt: product.title,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: product.title,
      description: product.description.slice(0, 160),
      images: [product.image],
    },
  };
}

const ProductDetails = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const product = await getSingleProducts(id);
  const uiProduct = {
  ...product,
  _id: product._id.toString(),
};
const {price, discount, image, title, bangla, info} = uiProduct

  const discountedPrice = (price - (price * discount) / 100);

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 bg-base-100">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left: Image Gallery */}
        <div className="space-y-4">
          <div className="rounded-3xl overflow-hidden bg-gray-50 border border-base-200">
            <Image
              src={image}
              alt={title}
              width={600}
              height={420}
              className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {/* Thumbnail placeholders if you had multiple images */}
            <div className="border-2 border-primary rounded-xl overflow-hidden cursor-pointer">
              <Image
                width={200}
                height={150}
                src={image}
                className="opacity-80"
                alt="thumb"
              />
            </div>
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="flex flex-col">
          <div className="badge badge-outline mb-2">Educational Toys</div>
          <h1 className="text-3xl md:text-4xl font-bold text-base-content mb-2">
            {title}
          </h1>
          <p className="text-xl text-primary font-medium mb-4">
            {bangla}
          </p>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center text-yellow-400">
              <FaStar />{" "}
              <span className="ml-1 font-bold text-base-content">
                {product.ratings}
              </span>
            </div>
            <span className="text-gray-400">|</span>
            <span className="text-sm font-medium">
              {product.reviews} Reviews
            </span>
            <span className="text-gray-400">|</span>
            <span className="text-sm font-medium">{product.sold} Sold</span>
          </div>

          <div className="bg-base-200 p-6 rounded-2xl mb-6">
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-black text-primary">
                ৳{discountedPrice}
              </span>
              {discount > 0 && (
                <span className="text-xl text-gray-400 line-through">
                  ৳{price}
                </span>
              )}
              <span className="badge badge-secondary ml-2">
                SAVE {discount}%
              </span>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <h3 className="font-bold text-lg">Key Features:</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {info.map((item: string, index: number) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <FaCheckCircle className="text-success" /> {item}
                </li>
              ))}
            </ul>
          </div>

          <CartButton product={uiProduct}/>
        </div>
      </div>

      {/* Bottom: Description & QNA */}
      <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-6 border-b pb-2">Description</h2>
          <p className="text-base-content/80 leading-relaxed whitespace-pre-line">
            {product.description}
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-6 border-b pb-2">
            Common Questions
          </h2>
          {product.qna.map((item, index: number) => (
            <div key={index} className="collapse collapse-plus bg-base-200">
              <input
                type="radio"
                name="my-accordion-3"
                defaultChecked={index === 0}
              />
              <div className="collapse-title font-medium flex items-center gap-2">
                <FaQuestionCircle className="text-primary" /> {item.question}
              </div>
              <div className="collapse-content text-sm">
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
