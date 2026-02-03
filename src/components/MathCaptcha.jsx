import React, { useState, useEffect } from "react";

const MathCaptcha = ({ onVerify }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [userAnswer, setUserAnswer] = useState("");
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    generateQuestion();
  }, []);

  const generateQuestion = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    setQuestion(`What is ${num1} + ${num2}?`);
    setAnswer(num1 + num2);
    setUserAnswer("");
    setIsValid(false);
    onVerify(false);
  };

  const handleChange = (e) => {
    const val = e.target.value;
    setUserAnswer(val);

    // Check if valid
    if (parseInt(val) === answer) {
      setIsValid(true);
      onVerify(true);
    } else {
      setIsValid(false);
      onVerify(false);
    }
  };

  return (
    <div className="mb-6">
      <label className="block text-xs font-bold uppercase tracking-widest text-dorabel-gray-dim mb-2">
        Security Check
      </label>
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <input
            type="number"
            value={userAnswer}
            onChange={handleChange}
            className={`w-full bg-white border px-4 py-3 text-dorabel-purple focus:outline-none transition-colors rounded-xl placeholder-gray-300 ${
              isValid
                ? "border-green-500 focus:border-green-500"
                : "border-gray-200 focus:border-dorabel-gold"
            }`}
            placeholder={question}
          />
        </div>
        <button
          type="button"
          onClick={generateQuestion}
          className="p-3 text-dorabel-gray-dim hover:text-dorabel-purple transition-colors"
          title="New Question"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </button>
      </div>
      {userAnswer && !isValid && (
        <p className="text-xs text-red-400 mt-1">Incorrect answer</p>
      )}
      {isValid && <p className="text-xs text-green-500 mt-1">Correct!</p>}
    </div>
  );
};

export default MathCaptcha;
