import { useRef, useState } from "react";

interface Props {
  title: string;
}
const History = ({ title }: Props) => {
  const ref =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const [value, setValue] = useState("Humbly Confident");

  const historyItems = [
    {
      key: 1,
      title: "Humbly Confident",
      description: "We believe in embracing challenges, learning from every experience, and always seeking ways to enhance what we offer you. Our confidence stems from a deep understanding of our capabilities, but it is rooted in a humility that reminds us there is always room to grow. Our dedication to your satisfaction drives us to innovate and adapt while maintaining a steadfast commitment to quality. It's our way of showing you that we're passionate about what we do and dedicated to delivering the best possible results. Rest assured, we approach every task with a sense of responsibility and respect for your trust in us. We listen, we learn, and we evolve, always with your best interests in mind."},
    {
      key: 2,
      title: "Team Player",
      description:
        "At our core, we believe in the power of collaboration and partnership. We're dedicated to fostering close working relationships with our clients, taking the time to truly understand their objectives, and customizing our solutions to suit their individual needs. Your success is our shared goal, and we're committed to working hand-in-hand with you every step of the way to achieve it.",
    },
    {
      key: 3,
      title: "Invested",
      description:
      "Investment in your vision is our driving force. We're deeply committed to understanding your goals and aligning our resources and expertise to support your unique vision. Your success is our investment, and we're dedicated to partnering with you, providing the insights and resources needed to help your ideas grow and thrive.",
    },
    {
      key: 4,
      title: "Attention to Detail",
      description:
      "Precision is our hallmark. We meticulously scrutinize every detail, ensuring that nothing is overlooked. Our commitment to thoroughness and a meticulous approach is woven into the fabric of our work, assuring you that your project or task is executed with the utmost care and attention to even the smallest of particulars.",
    },
    {
      key: 5,
      title: "Solutions Focused",
      description:
      "At our core, we're driven by the pursuit of solutions. We approach challenges with a forward-thinking mindset, seeking innovative paths to overcome obstacles and deliver results. Our dedication to being solution-focused means we're always ready to tackle your unique challenges head-on, providing you with effective answers and strategies to propel your goals forward.",
    },
  ];

  return (
    <section className="min-h-screen grid grid-rows-3 bg-base-200 place-items-center" id="history">
      <div className="text-center mt-5">
        <h2 className="text-5xl">{title}</h2>
      </div>
      <div
        className="w-3/4 h-fit justify-self-center row-start-3 border rounded shadow-lg"
        ref={ref}
      >
        <div className="h-full flex justify-evenly flex-wrap">
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
      className={`w-28 h-28 rounded-full flex justify-center items-center cursor-pointer border shadow-xl z-10 text-center bg-primary-focus hover:bg-primary m-1`}
      onClick={() => {
        setValue(title);
        document.querySelector("#history")?.scrollIntoView({block: "center"})
      }}
    >
      <h2>{title}</h2>
    </div>
  );
};

export default History;
