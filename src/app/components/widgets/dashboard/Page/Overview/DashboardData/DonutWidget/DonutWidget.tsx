import { ChartdataSrcs } from "@/model/interface";
import ScopeItem from "./ScopeItem";
import ChartDoughnut from "@element/ChartDoughnut";

interface props {
  data: ChartdataSrcs[];
  isTitle?: boolean;
}
export default function DonutWidget({ data, isTitle = true }: props) {
  return (
    <div className="w-full h-full max-h-[300px] bg-primary-gray-50 rounded-2xl  flex flex-col p-2  lg:p-6 ">
      {isTitle && <div className="w-full font-bold text-sm">Carbon Emission Summary</div>}
      <div className=" w-full h-10 flex flex-grow">
        <ChartDoughnut rawData={data} />
        <ScopeItem rawData={data} />
      </div>
    </div>
  );
}