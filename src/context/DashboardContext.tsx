"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { ChartdataSrcs, LineChartdataSrcs } from "@/model/interface";
import { setDashboardSize } from "@/redux/slice/mediaSlice";
import axios from "axios";
import { FC, ReactNode, RefObject, createContext, useContext, useEffect, useRef, useState } from "react";

interface DashboardProviderProps {
  children: ReactNode;
}

interface DashboardContext {
  handleToggleLeftSideBar: () => void;
  toggleLeftSideBar: boolean;
  handleToggleRightSideBar: () => void;
  toggleRightSideBar: boolean;
  carbonDonut: ChartdataSrcs[];
  emissionFactor: ChartdataSrcs[];
  carbonCredit: ChartdataSrcs[];
  carbonCreditLine: LineChartdataSrcs[];
}

const DashboardContext = createContext<DashboardContext | null>(null);
const DashboardContextProvider: FC<DashboardProviderProps> = ({ children }) => {
  const [toggleLeftSideBar, setToggleLeftSideBar] = useState(true);
  const [toggleRightSideBar, setToggleRightSideBar] = useState(true);

  const [carbonDonut, setCarbonDonut] = useState<ChartdataSrcs[]>([]);
  const [emissionFactor, setEmissionFactor] = useState<ChartdataSrcs[]>([]);
  const [carbonCredit, setCarbonCredit] = useState<ChartdataSrcs[]>([]);
  const [carbonCreditLine, setCarbonCreditLine] = useState<LineChartdataSrcs[]>([]);
  const dispatch = useAppDispatch();
  const viewport = useAppSelector((s) => s.media.viewport);

  function handleToggleLeftSideBar() {
    setToggleLeftSideBar((prev) => !prev);
  }

  function handleToggleRightSideBar() {
    setToggleRightSideBar((prev) => !prev);
  }
  async function fetchDashboardDate() {
    const mock = await axios.get(String(process.env.INNER_API_URL) + "/api/mock");
    setCarbonDonut(mock.data.carbonDonut);
    setEmissionFactor(mock.data.emissionFactor);
    setCarbonCredit(mock.data.carbonCredit);
    setCarbonCreditLine(mock.data.carbonCreditLine);
  }

  useEffect(() => {
    if (viewport > 0) {
      const right = toggleRightSideBar ? 280 : 0;
      const left = toggleLeftSideBar ? 280 : 0;
      const size = viewport - left - right;
      dispatch(setDashboardSize(size));
    }
  }, [viewport, toggleRightSideBar, toggleLeftSideBar, dispatch]);

  useEffect(() => {
    fetchDashboardDate();
  }, []);
  return (
    <DashboardContext.Provider
      value={{
        handleToggleLeftSideBar,
        toggleLeftSideBar,
        handleToggleRightSideBar,
        toggleRightSideBar,
        emissionFactor,
        carbonCredit,
        carbonCreditLine,
        carbonDonut,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within a DashboardContextProvider");
  }
  return context;
};
export default DashboardContextProvider;
