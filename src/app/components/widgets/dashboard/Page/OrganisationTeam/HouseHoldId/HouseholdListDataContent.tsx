"use client";
import { useEffect, useState } from "react";
import Pagination from "./Pagination";
import Image from "next/image";
import icons from "@/asset/icons";

interface ListData {
  address: string;
  total_carbon_footprint: number;
}

function HouseholdListDataContent() {
  const data = [
    {
      address: "Address",
      total_carbon_footprint: 1,
    },
    {
      address: "Address",
      total_carbon_footprint: 2,
    },
    {
      address: "Address",
      total_carbon_footprint: 3,
    },
    {
      address: "Address",
      total_carbon_footprint: 4,
    },
    {
      address: "Address",
      total_carbon_footprint: 5,
    },
    {
      address: "Address",
      total_carbon_footprint: 6,
    },
    {
      address: "Address",
      total_carbon_footprint: 7,
    },
    {
      address: "Address",
      total_carbon_footprint: 8,
    },
    {
      address: "Address",
      total_carbon_footprint: 8,
    },
    {
      address: "Address",
      total_carbon_footprint: 10,
    },
    {
      address: "Address",
      total_carbon_footprint: 11,
    },
    {
      address: "Address",
      total_carbon_footprint: 12,
    },
    {
      address: "Address",
      total_carbon_footprint: 13,
    },
    {
      address: "Address",
      total_carbon_footprint: 14,
    },
    {
      address: "Address",
      total_carbon_footprint: 15,
    },
    {
      address: "Address",
      total_carbon_footprint: 16,
    },
    {
      address: "Address",
      total_carbon_footprint: 17,
    },
    {
      address: "Address",
      total_carbon_footprint: 18,
    },
    {
      address: "Address",
      total_carbon_footprint: 19,
    },
  ];

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemPerPage] = useState<number>(14);
  const [allData, setAllData] = useState<ListData[]>([]);
  const [currentItems, setCurrentItems] = useState<ListData[]>([]);
  const [currentFootPrintSortOrder, setCurrentFootPrintSortOrder] = useState<string>("ASC");

  useEffect(() => {
    if (allData.length === 0) {
      setAllData(data || []);
    }

    let list;
    allData.length > 0 ? (list = allData) : (list = data || []);
    setCurrentItems(list.slice(indexOfFirstItem, indexOfLastItem));
  }, [currentPage]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const sortFootPrint = () => {
    console.log(currentFootPrintSortOrder);
    if (currentFootPrintSortOrder === "DESC") {
      allData.sort((a, b) => a.total_carbon_footprint - b.total_carbon_footprint);
      setCurrentItems(allData.slice(indexOfFirstItem, indexOfLastItem));
      setCurrentFootPrintSortOrder("ASC");
      return;
    } else if (currentFootPrintSortOrder === "ASC") {
      allData.sort((a, b) => b.total_carbon_footprint - a.total_carbon_footprint);
      setCurrentItems(allData.slice(indexOfFirstItem, indexOfLastItem));
      setCurrentFootPrintSortOrder("DESC");
      return;
    }
  };

  return (
    <div className="relative h-10 flex flex-col grow ">
      <div className=" w-full h-full  overflow-y-scroll  no-scrollbar">
        <table className="table-fixed w-full h-12">
          <thead className="absolute top-0 left-0 z-40 w-full bg-white  border-b text-gray-400">
            <tr className="w-full flex">
              <th className="text-start w-full p-3">
                <div className="flex justify-between">
                  <div className="flex gap-5">
                    <input type="checkbox" />
                    Address
                  </div>
                  <Image className="cursor-pointer" src={icons.sort} alt="" />
                </div>
              </th>
              <th className="text-start w-full p-3">
                <div className="flex justify-between">
                  <div>Total Carbon Footprint</div>
                  <Image className="cursor-pointer" src={icons.sort} alt="" onClick={() => sortFootPrint()} />
                </div>
              </th>
              <th className=" w-1 p-3"></th>
            </tr>
          </thead>
        </table>

        <table className="table-fixed w-full ">
          <tbody className="w-full">
            {currentItems.map((item, index) => (
              <tr key={index} className="w-full border-b cursor-pointer">
                <td className="w-full p-3">
                  <div className="ps-7 flex gap-4">
                    <Image className="" src={icons.mapPin} alt="" />
                    {item.address}
                  </div>
                </td>
                <td className="w-full p-3">
                  <div className="flex gap-4">
                    <Image src={icons.footPrintUp} alt="" />
                    <div>{item.total_carbon_footprint} kgCO2</div>
                  </div>
                </td>
                <td className="w-10">
                  <div className="aspect-square flex justify-center items-center rounded-full hover:bg-slate-50 active:scale-90">
                    <Image height={16} src={icons.meatball} alt="" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="absolute bottom-0 w-full bg-white  left-0 flex justify-end p-4">
        <Pagination list={data} currentPage={currentPage} setCurrentPage={setCurrentPage} itemsPerPage={itemsPerPage} />
      </div>
    </div>
  );
}

export default HouseholdListDataContent;
