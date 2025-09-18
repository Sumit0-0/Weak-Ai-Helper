
import { useState, useEffect } from "react";

const Header = () => {
  const [showDogra, setShowDogra] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowDogra((prev) => !prev);
    }, 6000); 

    return () => clearInterval(interval); 
  }, []);

  return (
    <>
      <div className="flex justify-center items-center bg-zinc-800 pt-3 pb-3 rounded-b-2xl shadow-2xl">
        {showDogra ? (
          <>
            <span className="text-orange-400 pr-2 font-bold text-3xl">Dogra</span>
            <span className="text-red-500 font-bold text-3xl">Ai</span>
          </>
        ) : (
          <span className="text-white font-bold text-3xl">
            I am here to help u...
          </span>
        )}
      </div>
    </>
  );
};

export default Header;
