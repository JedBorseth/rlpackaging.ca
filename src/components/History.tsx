import React, { useEffect, useState } from "react";

interface Props {
  title: string;
  subtitle: string;
}
const History = ({ title, subtitle }: Props) => {
  const [currentDate, setCurrentDate] = useState("");

  const historyItems = [
    {
      key: 1,
      year: "1999",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    },
    {
      key: 2,
      year: "2008",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    },
    {
      key: 3,
      year: "2014",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    },
  ];

  return (
    <section className="min-h-screen grid grid-rows-3 bg-base-200" id="history">
      <div className="text-center mt-5">
        <h2 className="text-5xl">{title}</h2>
        <h3 className="px-5">{subtitle}</h3>
      </div>
      <div className="w-3/4 h-32 justify-self-center overflow-x-scroll overflow-y-hidden row-start-3 border rounded shadow-lg">
        <div className="w-[75rem] h-full relative">
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
      <div className="text-center">
        {currentDate}
        {historyItems.map((item) => {
          if (item.year === currentDate) {
            return <p key={item.key}>{item.description}</p>;
          }
        })}
      </div>
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
      className={`w-20 h-20 rounded-full absolute left-[${xpos}%] top-0 bottom-0 m-auto flex justify-center items-center cursor-pointer border shadow-xl z-10`}
      onClick={() => {
        setCurrentDate(year);
      }}
    >
      <h2>{year}</h2>
    </div>
  );
};

export default History;
