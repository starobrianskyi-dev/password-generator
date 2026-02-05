import { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const buttonRef = useRef(null);
  const [otp, setOTP] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (timeLeft <= 0) return;

    buttonRef.current.disabled = true;
    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => {
      buttonRef.current.disabled = false;
      clearTimeout(timer);
    };
  }, [timeLeft]);

  function handleGenerateOTP() {
    const genOTP = Math.floor(100000 + Math.random() * 900000);
    setOTP(genOTP);
    setTimeLeft(5);
  }
  return (
    <div className="container">
      <h1 id="otp-title">OTP Generator</h1>
      <h2 id="otp-display">{otp || "Click 'Generate OTP' to get a code"}</h2>
      <p id="otp-timer" aria-live="polite">
        {timeLeft > 0
          ? `Expires in: ${timeLeft} seconds`
          : timeLeft === 0 && otp
            ? "OTP expired. Click the button to generate a new OTP."
            : ""}
      </p>
      <button
        ref={buttonRef}
        id="generate-otp-button"
        onClick={handleGenerateOTP}
      >
        Generate OTP
      </button>
    </div>
  );
}

export default App;
