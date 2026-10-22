import React from "react";
import "./Calculator.css";
import { useState } from "react";

const Calculator = () => {
  const [currentValue, setCurrentValue] = useState("");
  const [pendingOperation, setPendingOperation] = useState(null);
  const [pendingValue, setPendingValue] = useState(null);
  const [completeOperation, setCompleteOperation] = useState("");

  const keypadNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
  const operations = ["+", "-", "*", "/"];

  const handleClick = (value) => {
    setCurrentValue((preventValue) => {
      if (preventValue === "0") {
        return value;
      } else {
        return preventValue + value;
      }
    });
    setCompleteOperation((prevOperation) => prevOperation + value);
  };

  const handleOperation = (operation) => {
    setCompleteOperation(currentValue + " " + operation);
    setPendingOperation(operation);
    setPendingValue(currentValue);
    setCurrentValue("0");
  };

  const handleClear = () => {
    setCurrentValue("0");
    setPendingOperation(null);
    setPendingValue(null);
    setCompleteOperation("");
  };

  const handleCalculate = () => {
    if (!pendingOperation || !pendingValue) return;

    const num1 = parseFloat(pendingValue);
    const num2 = parseFloat(currentValue);
    let result;
    switch (pendingOperation) {
      case "+":
        result = num1 + num2;
        break;
      case "-":
        result = num1 - num2;
        break;
      case "*":
        result = num1 * num2;
        break;
      case "/":
        if (num2 !== 0) {
          result = num1 / num2;
        } else {
          setCurrentValue("Error");
          setCompleteOperation("Error");
          setPendingOperation(null);
          setPendingValue(null);
        }
        break;
      default:
        return;
    }
    setCompleteOperation(
      pendingValue +
        " " +
        pendingOperation +
        " " +
        currentValue +
        " =" +
        result,
    );
    setCurrentValue(result.toString());
    setPendingOperation(null);
    setPendingValue(null);
  };

  return (
    <div className="calculator">
      <div className="complete-operation">{completeOperation}</div>
      <div className="display">{currentValue}</div>
      <div className="buttons">
        <button onClick={() => handleClear()}>AC</button>
        {keypadNumbers.map((num) => (
          <button key={num} onClick={() => handleClick(num)}>
            {num}
          </button>
        ))}
        {operations.map((op) => (
          <button key={op} onClick={() => handleOperation(op)}>
            {op}
          </button>
        ))}
        <button onClick={() => handleCalculate()}>=</button>
      </div>
    </div>
  );
};

export default Calculator;
