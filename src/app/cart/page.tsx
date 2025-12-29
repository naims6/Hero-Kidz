import { FaShoppingBag } from "react-icons/fa";

import { getCart } from "@/actions/server/cart";
import Cart from "@/components/cart/Cart";

const CartPage = async () => {
  const cartItemsFromMongo = await getCart();
  const cartItems = cartItemsFromMongo.map((item) => ({
    ...item,
    _id: item._id.toString(),
  }));

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
        <FaShoppingBag className="text-primary" /> Shopping Cart
      </h1>

      <Cart cartItems={cartItems}></Cart>
    </div>
  );
};

export default CartPage;
