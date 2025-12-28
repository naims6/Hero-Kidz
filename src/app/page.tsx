import { getServerSession } from "next-auth";
import Banner from "../components/home/Banner";
import Products from "../components/home/Products";
import Test from "@/components/Test";

export default async function Home() {
  const session = await getServerSession();
  console.log("server session", session);
  return (
    <div className="space-y-20">
      <Test />
      <p>{JSON.stringify(session)}</p>
      <Banner />
      <Products />
    </div>
  );
}
