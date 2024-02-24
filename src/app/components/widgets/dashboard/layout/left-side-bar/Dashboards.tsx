import icons from "@/asset/icons";
import Image from "next/image";
import Link from "next/link";

export default function Dashboards() {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-gray-400 font-bold text-xs">Dashboards</div>
      <div className="flex gap-2 px-[6px] py-1 bg-sidebarbgselected rounded-lg">
        <div className="w-6 h-6 flex justify-center items-center">
          <Image src={icons.rightVector} alt="" />
        </div>
        <Link href={"../dashboard/overview"} className="font-bold flex items-center hover:text-primary-brand-400 active:scale-95">
          Overview
        </Link>
      </div>
    </div>
  );
}
