import React, { useState } from "react";

type Question = {
  text: string;
  options: string[];
  correctIndex: number; // index in options array
};

const questions: Question[] = [
  {
    text: "1. What sound does a cat make?",
    options: ["1. What sound does a cat make?", "Bhau-Bhau", "Meow-Meow", "Oink-Oink"],
    correctIndex: 2, // Meow-Meow
  },
  {
    text: "2. What would you probably find in your fridge?",
    options: ["2. What would you probably find in your fridge?", "Shoes", "Ice Cream", "Books"],
    correctIndex: 2, // Ice Cream
  },
  {
    text: "3. What color are bananas?",
    options: ["3. What color are bananas?", "Blue", "Yellow", "Red"],
    correctIndex: 2, // Yellow
  },
  {
    text: "4. How many stars are in the sky?",
    options: ["4. How many stars are in the sky?", "Two", "Infinite", "One Hundred"],
    correctIndex: 2, // Infinite
  },
];

const QuizCard: React.FC = () => {
  const [current, setCurrent] = useState(0);         // which question
  const [score, setScore] = useState(0);            // number of correct answers
  const [showResult, setShowResult] = useState(false);

  const totalQuestions = questions.length;
  const q = questions[current];

  const handleOptionClick = (index: number) => {
    // ignore clicks on the first row (the blue question row)
    if (index === 0) return;

    const optionIndex = index; // because options[0] is question text
    const isCorrect = optionIndex === q.correctIndex;

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    // Move to next question or end
    if (current < totalQuestions - 1) {
      setCurrent((prev) => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  const goPrev = () => {
    if (current > 0 && !showResult) {
      setCurrent((prev) => prev - 1);
    }
  };

  const handleStartAgain = () => {
    setCurrent(0);
    setScore(0);
    setShowResult(false);
  };

  const percentage = Math.round((score / totalQuestions) * 100);

  if (showResult) {
    // Final score screen like in your Figma
    return (
      <div className="w-[620px] rounded-[24px] bg-[#f3fcff] border border-white/70 px-10 py-16 text-center">
        <button className="mb-6 inline-flex items-center justify-center rounded-full bg-white px-5 py-1 text-[11px] text-[#395c72] shadow-sm">
          Keep Learning!
        </button>
        <p className="text-[24px] text-[#1b4263] italic mb-2">Your Final score is</p>
        <p className="text-[64px] font-semibold text-[#1b4263] mb-2">
          {percentage}
          <span className="text-[28px] align-top ml-1">%</span>
        </p>
        <button
          onClick={handleStartAgain}
          className="mt-6 h-9 px-6 rounded-[8px] bg-[#cae9f9] text-[13px] text-[#1b4263] hover:bg-[#b8dbf3] transition-colors"
        >
          Start Again
        </button>
      </div>
    );
  }

  return (
    <div className="w-[620px] rounded-[24px] bg-[#f9feff] border border-white/70 px-10 py-8 relative overflow-hidden">
      {/* Title */}
      <h1 className="text-[32px] font-semibold leading-tight text-[#1b4263] text-center mb-2">
        Test Your <span className="text-[#3f8bdd]">Knowledge</span>
      </h1>

      {/* Small subtitle like “Answer all questions to see your results” */}
      <p className="text-[11px] text-[#73879a] text-center mb-6">
        Answer all questions to see your results
      </p>

      {/* Progress bars */}
      <div className="flex justify-center mb-6 gap-3">
        {questions.map((_, idx) => (
          <span
            key={idx}
            className={`h-[3px] w-20 rounded-full ${
              idx === current ? "bg-[#1b4263]" : "bg-[#cfd9e5]"
            }`}
          />
        ))}
      </div>

      {/* Options list */}
      <div className="space-y-3 text-[13px]">
        {q.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(index)}
            className={`w-full h-10 rounded-[8px] border transition-colors ${
              index === 0
                ? "bg-[#d5edf9] border-transparent text-[#274664] cursor-default"
                : "bg-[#f5fbff] border-[#e2eef7] text-[#4c6075] hover:bg-[#eaf4ff]"
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      {/* Arrow controls – optional, mainly for visual match */}
      <div className="absolute bottom-6 right-10 flex gap-2">
        <button
          onClick={goPrev}
          disabled={current === 0}
          className="h-8 w-8 rounded-full border border-[#d6e4f2] text-[#5c6b7b] text-xs disabled:opacity-40 disabled:cursor-default hover:bg-[#edf4fb]"
        >
          {"<"}
        </button>
        <button
          onClick={() => handleOptionClick(-1)} // clicking here will behave same as choosing next without answer; you can adjust later
          className="h-8 w-8 rounded-full bg-[#3f8bdd] text-white text-xs hover:bg-[#3477c5]"
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default QuizCard;
