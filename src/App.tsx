import React from "react";
import QuizCard from "./components/QuizCard";

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#b5e5ff] via-[#e4f3ff] to-[#9cd2ff]">
      <div className="w-[1000px] h-[520px] rounded-[32px] bg-[#e6f5ff] flex items-center justify-center">
        <QuizCard />
      </div>
    </div>
  );
};

export default App;

