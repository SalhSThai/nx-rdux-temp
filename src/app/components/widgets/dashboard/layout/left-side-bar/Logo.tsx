import icons from "@/asset/icons";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Logo() {
  return (
    <Link href={"/"} className="w-fit flex  items-center gap-4 active:scale-95" role="button">
      <Image className="rounded-full" height={32} src={icons.ccblogo} alt="" />
      <div className="font-bold">CCB Thailand</div>
    </Link>
  );
}

export default Logo;
