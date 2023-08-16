import React, { useEffect, useState } from "react";

interface Props {
  title: string;
  subtitle: string;
}
const History = ({ title, subtitle }: Props) => {
  const [currentDate, setCurrentDate] = useState("");
  useEffect(() => {
    console.log(currentDate);
  }, [currentDate]);
  return (
    <section className="min-h-screen grid grid-rows-3">
      <div className="text-center">
        <h2 className="text-4xl">{title}</h2>
        <h3>{subtitle}</h3>
      </div>
      <div className="w-3/4 h-32 justify-self-center overflow-x-auto overflow-y-hidden row-start-3 border">
        <div className="w-[100rem] h-full relative">
          <HistoryItem
            xpos={25}
            year="1999"
            setCurrentDate={setCurrentDate}
          ></HistoryItem>
          <HistoryItem
            xpos={50}
            year="2008"
            setCurrentDate={setCurrentDate}
          ></HistoryItem>
          <HistoryItem
            xpos={80}
            year="2014"
            setCurrentDate={setCurrentDate}
          ></HistoryItem>
        </div>
      </div>
      <div className="text-center">{currentDate}</div>
      <span className="left-[25%] left-[50%] left-[80%] hidden content-none">
        {/* span is just to make sure tailwind generates classes */}
      </span>
    </section>
  );
};
interface HistoryItemProps {
  xpos: number;
  year: string;
  setCurrentDate: React.Dispatch<React.SetStateAction<string>>;
}

const HistoryItem = ({ xpos, year, setCurrentDate }: HistoryItemProps) => {
  return (
    <div
      className={`w-20 h-20 rounded-full absolute left-[${xpos}%] top-auto flex justify-center items-center cursor-pointer border`}
      onClick={() => {
        setCurrentDate(year);
      }}
    >
      {year}
    </div>
  );
};

export default History;
