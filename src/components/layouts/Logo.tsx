import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href={"/"} className="flex items-center gap-1">
      <Image src={"/assets/logo.png"} alt="logo" width={50} height={40} />
      <h2 className="text-xl font-extrabold">
        Hero <span className="text-primary">Kidz</span>
      </h2>
    </Link>
  );
};

export default Logo;
