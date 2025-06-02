import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import initialData from "./data.json";
import "./App.css";

function App() {
  const [cardData, setcardData] = useState(initialData);
  const [flippedCard, setFlippedCard] = useState([]);
  const [turns, setTurns] = useState(0);

  const colorMap = {
    amber: "bg-amber-600",
    blue: "bg-blue-600",
    red: "bg-red-600",
    green: "bg-green-600",
    purple: "bg-purple-600",
    orange: "bg-orange-600",
    yellow: "bg-yellow-600",
    fuchsia: "bg-fuchsia-600",
    gray: "bg-gray-600",
    cyan: "bg-cyan-600",
    emerald: "bg-emerald-600",
    indigo: "bg-indigo-600",
  };

  function flipHandler(data) {
    if (flippedCard.length == 2 || data.isVisible) return;
    setcardData((prevCard) =>
      prevCard.map((card) =>
        card.id === data.id ? { ...card, isVisible: true } : card
      )
    );
    setFlippedCard((prev) => [...prev, data]);
  }

  useEffect(() => {
    if (flippedCard.length == 2) {
      setTurns((prev) => prev + 1);
      const [first, second] = flippedCard;
      if (first.value != second.value) {
        setTimeout(() => {
          setcardData((prevCard) =>
            prevCard.map((card) =>
              card.id === first.id || card.id === second.id
                ? { ...card, isVisible: false }
                : card
            )
          );
        }, 1000);
      }
      setTimeout(() => {
        setFlippedCard([]);
      }, 1000);
    }
  }, [flippedCard]);

  return (
    <>
      <div className="flex justify-center items-center h-screen w-screen flex-col gap-5">
        <h1>Memory Game</h1>
        <div className="grid grid-cols-4 gap-4">
          {}

          {cardData?.map((data) => (
            <div
              key={data.id}
              className={`${colorMap[data.color]}
                h-28 w-28 grid place-content-center text-3xl font-bold hover:cursor-pointer animate-flip`}
              onClick={() => flipHandler(data)}
            >
              <h2
                className={`${
                  data.isVisible ? "block" : "hidden"
                } text-amber-50`}
              >
                {data.value}
              </h2>
            </div>
          ))}
        </div>
        <h3>Number of turns:</h3>
        <p>{turns}</p>
      </div>
    </>
  );
}

export default App;
