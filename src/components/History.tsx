import { useRef, useState } from "react";

interface Props {
  title: string;
}
const History = ({ title }: Props) => {
  const ref =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const [value, setValue] = useState("Team Player");

  const historyItems = [
    {
      key: 1,
      title: "Humbly Confident",
      description:
        "Know your stuff, with also the realization that there is something going on that you may not fully understand or realize. We all need to realize everyone is not perfect and we need to give each other grace when a mistake is made. We all succeed and fail as a TEAM",
    },
    {
      key: 2,
      title: "Team Player",
      description:
        "We all succeed and fail as a TEAM. When we work together, we work to help each other and not leave our team members needing help.  Every team member does their part in the work and talks to each other with appreciation and respect.  When we work as a team, it shows each person that we are all INVESTED.",
    },
    {
      key: 3,
      title: "Invested",
      description:
        "When we care about the products that we are creating and doing the best we can for our customers, they notice. We all put our best foot forward each day and do our best to work hard, making quality products, taking care of the equipment that we use and making sure we pay attention to the DETAILS.",
    },
    {
      key: 4,
      title: "Attention to Detail",
      description:
        "The products that we produce are not particularly complex or difficult to make, however, at times our customers have specific requirements. We need to be able to look at the purchase order or work order document to determine what the customer requires so that they get exactly what they ask for. There will be times where the requests or documentation is a little unclear. This is where we need to work as a team to find a SOLUTION.",
    },
    {
      key: 5,
      title: "Solutions Focused",
      description:
        "There is nothing at R&L that is beyond improvement. EVER. Whether it be management or production processes, we must always strive for implementation of new ideas and strategies that assist in making quality and efficiencies better and more consistent. All ideas will be welcomed and considered. We are ALL part of the same team.",
    },
  ];

  return (
    <section className="min-h-screen grid grid-rows-3 bg-base-200" id="history">
      <div className="text-center mt-5">
        <h2 className="text-5xl">{title}</h2>
      </div>
      <div
        className="w-3/4 h-32 justify-self-center row-start-3 border rounded shadow-lg"
        ref={ref}
      >
        <div className="h-full flex justify-evenly">
          {historyItems.map((item) => {
            return (
              <HistoryItem
                title={item.title}
                setValue={setValue}
                key={item.key}
              />
            );
          })}
        </div>
      </div>
      <div className="text-center w-2/3 justify-self-center sm:p-5">
        <h2 className="text-2xl">{value}</h2>
        {historyItems.map((item) => {
          if (item.title === value) {
            return <p key={item.key}>{item.description}</p>;
          }
        })}
      </div>
    </section>
  );
};
interface HistoryItemProps {
  title: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const HistoryItem = ({ title, setValue }: HistoryItemProps) => {
  return (
    <div
      className={`w-28 h-28 rounded-full flex justify-center items-center cursor-pointer border shadow-xl z-10 text-center bg-primary-focus hover:bg-primary`}
      onClick={() => {
        setValue(title);
      }}
    >
      <h2>{title}</h2>
    </div>
  );
};

export default History;
