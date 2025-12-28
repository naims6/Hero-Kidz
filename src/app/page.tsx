import { getServerSession } from "next-auth";
import Banner from "../components/home/Banner";
import Products from "../components/home/Products";
import Test from "@/components/Test";
import { authOptions } from "@/lib/authOptions";

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log("server session", session);
  return (
    <div className="space-y-20">
      <Test />
      <p className="">{JSON.stringify(session)}</p>
      <Banner />
      <Products />
    </div>
  );
}
