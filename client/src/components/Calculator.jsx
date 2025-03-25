import React, { useState, useEffect } from 'react';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [firstOperand, setFirstOperand] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);
  const [memory, setMemory] = useState(0);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [theme, setTheme] = useState('light');

  // Add keyboard support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (/\d/.test(e.key)) {
        inputDigit(e.key);
      } else if (e.key === '.') {
        inputDecimal();
      } else if (e.key === 'Escape') {
        clearDisplay();
      } else if (e.key === 'Backspace') {
        backspace();
      } else if (e.key === 'Enter' || e.key === '=') {
        handleEquals();
      } else if (e.key === '+') {
        handleOperator('+');
      } else if (e.key === '-') {
        handleOperator('-');
      } else if (e.key === '*') {
        handleOperator('×');
      } else if (e.key === '/') {
        handleOperator('÷');
      } else if (e.key === '%') {
        percentage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [display, firstOperand, operator, waitingForSecondOperand]);

  const addToHistory = (calculation, result) => {
    setHistory(prev => [...prev, { calculation, result }]);
  };

  const inputDigit = (digit) => {
    if (waitingForSecondOperand) {
      setDisplay(digit);
      setWaitingForSecondOperand(false);
    } else {
      // Prevent excessive digits
      if (display.replace(/[-.]/g, '').length < 12) {
        setDisplay(display === '0' ? digit : display + digit);
      }
    }
  };

  const inputDecimal = () => {
    if (waitingForSecondOperand) {
      setDisplay('0.');
      setWaitingForSecondOperand(false);
      return;
    }

    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const clearDisplay = () => {
    setDisplay('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const toggleSign = () => {
    setDisplay(parseFloat(display) * -1 + '');
  };

  const handleOperator = (nextOperator) => {
    const inputValue = parseFloat(display);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = performCalculation();
      if (result === 'Error') {
        setDisplay('Error');
        setFirstOperand(null);
        setWaitingForSecondOperand(true);
        return;
      }
      
      const formattedResult = formatResult(result);
      addToHistory(`${firstOperand} ${operator} ${inputValue}`, formattedResult);
      setDisplay(formattedResult);
      setFirstOperand(result);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  const formatResult = (value) => {
    if (typeof value === 'string') return value;
    
    // Format the number to avoid excessive decimals but preserve precision
    if (Number.isInteger(value)) {
      return String(value);
    }
    
    const stringValue = value.toString();
    if (stringValue.length > 12) {
      return value.toExponential(8);
    }
    
    return stringValue;
  };

  const performCalculation = () => {
    const inputValue = parseFloat(display);

    if (operator === '+') {
      return firstOperand + inputValue;
    } else if (operator === '-') {
      return firstOperand - inputValue;
    } else if (operator === '×') {
      return firstOperand * inputValue;
    } else if (operator === '÷') {
      if (inputValue === 0) {
        return 'Error';
      }
      return firstOperand / inputValue;
    } else if (operator === '%') {
      return firstOperand % inputValue;
    }

    return inputValue;
  };

  const handleEquals = () => {
    if (!operator) return;

    const inputValue = parseFloat(display);
    const result = performCalculation();
    
    if (result === 'Error') {
      setDisplay('Error');
      setFirstOperand(null);
      setOperator(null);
      addToHistory(`${firstOperand} ${operator} ${inputValue}`, 'Error');
    } else {
      const formattedResult = formatResult(result);
      addToHistory(`${firstOperand} ${operator} ${inputValue}`, formattedResult);
      setDisplay(formattedResult);
      setFirstOperand(result);
    }
    
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const backspace = () => {
    if (display === 'Error') {
      setDisplay('0');
      return;
    }
    
    if (display.length === 1 || (display.length === 2 && display.startsWith('-'))) {
      setDisplay('0');
    } else {
      setDisplay(display.slice(0, -1));
    }
  };

  const percentage = () => {
    const value = parseFloat(display);
    setDisplay(String(value / 100));
  };

  // Scientific functions
  const square = () => {
    const value = parseFloat(display);
    const result = value * value;
    const formattedResult = formatResult(result);
    setDisplay(formattedResult);
    addToHistory(`sqr(${value})`, formattedResult);
  };

  const squareRoot = () => {
    const value = parseFloat(display);
    if (value < 0) {
      setDisplay('Error');
      addToHistory(`√(${value})`, 'Error');
      return;
    }
    const result = Math.sqrt(value);
    const formattedResult = formatResult(result);
    setDisplay(formattedResult);
    addToHistory(`√(${value})`, formattedResult);
  };

  const reciprocal = () => {
    const value = parseFloat(display);
    if (value === 0) {
      setDisplay('Error');
      addToHistory(`1/(${value})`, 'Error');
      return;
    }
    const result = 1 / value;
    const formattedResult = formatResult(result);
    setDisplay(formattedResult);
    addToHistory(`1/(${value})`, formattedResult);
  };

  // Memory functions
  const memoryClear = () => {
    setMemory(0);
  };

  const memoryRecall = () => {
    setDisplay(String(memory));
    setWaitingForSecondOperand(false);
  };

  const memoryAdd = () => {
    if (display !== 'Error') {
      setMemory(memory + parseFloat(display));
    }
  };

  const memorySubtract = () => {
    if (display !== 'Error') {
      setMemory(memory - parseFloat(display));
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  // Button component for consistency
  const Button = ({ onClick, className, children }) => {
    return (
      <button 
        onClick={onClick}
        className={`p-2 text-sm sm:text-base rounded-md hover:opacity-90
                  focus:outline-none focus:ring-2 focus:ring-blue-300 
                  active:scale-95 transition-all shadow-md
                  ${className}
                  ${theme === 'dark' ? 'shadow-slate-800' : ''}`}
      >
        {children}
      </button>
    );
  };

  return (
    <div className={`flex flex-col h-full p-3 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
      {/* Calculator header */}
      <div className={`flex justify-between items-center mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
        <div className="text-sm font-medium flex items-center">
          <span className="mr-2">Standard</span>
          {memory !== 0 && (
            <span className="text-xs px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">M</span>
          )}
        </div>
        <div className="flex space-x-2">
          <button 
            className={`p-1 rounded ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
            onClick={() => setShowHistory(!showHistory)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
          <button 
            className={`p-1 rounded ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
            onClick={toggleTheme}
          >
            {theme === 'dark' ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* History panel */}
      {showHistory && (
        <div className={`mb-3 border rounded-md p-2 ${theme === 'dark' ? 'bg-gray-900 border-gray-700 text-gray-200' : 'bg-white border-gray-300'}`}>
          <div className="flex justify-between items-center mb-1">
            <h3 className="text-sm font-medium">History</h3>
            <button 
              onClick={() => setHistory([])} 
              className={`text-xs px-2 py-0.5 rounded ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
            >
              Clear
            </button>
          </div>
          <div className="max-h-28 overflow-y-auto text-xs">
            {history.length === 0 ? (
              <div className="text-center py-2 text-gray-500">No history yet</div>
            ) : (
              history.map((item, index) => (
                <div key={index} className="py-1 border-t first:border-0 border-gray-200 dark:border-gray-700">
                  <div className={`text-right ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{item.calculation}</div>
                  <div className="text-right font-medium">{item.result}</div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Calculator display */}
      <div className={`border rounded-md p-2 mb-2 text-right ${
        theme === 'dark' 
          ? 'bg-gray-900 border-gray-700 text-white' 
          : 'bg-white border-gray-300 text-gray-800'
      }`}>
        <div className={`text-xs h-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
          {firstOperand !== null && operator ? `${firstOperand} ${operator}` : ''}
        </div>
        <div className="text-2xl md:text-3xl font-medium overflow-hidden text-ellipsis">
          {display}
        </div>
      </div>

      {/* Memory buttons */}
      <div className="grid grid-cols-5 gap-1 mb-2">
        <Button onClick={memoryClear} className={`text-xs ${
          theme === 'dark' 
            ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' 
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}>MC</Button>
        <Button onClick={memoryRecall} className={`text-xs ${
          theme === 'dark' 
            ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' 
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}>MR</Button>
        <Button onClick={memoryAdd} className={`text-xs ${
          theme === 'dark' 
            ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' 
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}>M+</Button>
        <Button onClick={memorySubtract} className={`text-xs ${
          theme === 'dark' 
            ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' 
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}>M-</Button>
        <Button onClick={() => setMemory(parseFloat(display))} className={`text-xs ${
          theme === 'dark' 
            ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' 
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}>MS</Button>
      </div>

      {/* Scientific function buttons */}
      <div className="grid grid-cols-4 gap-1 mb-2">
        <Button onClick={square} className={
          theme === 'dark' 
            ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' 
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }>
          x²
        </Button>
        <Button onClick={squareRoot} className={
          theme === 'dark' 
            ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' 
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }>
          √
        </Button>
        <Button onClick={reciprocal} className={
          theme === 'dark' 
            ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' 
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }>
          1/x
        </Button>
        <Button onClick={percentage} className={
          theme === 'dark' 
            ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' 
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }>
          %
        </Button>
      </div>

      {/* Main calculator buttons */}
      <div className="grid grid-cols-4 gap-1 flex-grow">
        <Button onClick={clearDisplay} className={
          theme === 'dark' 
            ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' 
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }>
          CE
        </Button>
        <Button onClick={clearDisplay} className={
          theme === 'dark' 
            ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' 
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }>
          C
        </Button>
        <Button onClick={backspace} className={
          theme === 'dark' 
            ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' 
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
          </svg>
        </Button>
        <Button onClick={() => handleOperator('÷')} className={
          theme === 'dark' 
            ? 'bg-blue-700 text-white hover:bg-blue-600' 
            : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
        }>
          ÷
        </Button>

        <Button onClick={() => inputDigit('7')} className={
          theme === 'dark' 
            ? 'bg-gray-600 text-white hover:bg-gray-500' 
            : 'bg-white text-gray-700 hover:bg-gray-100'
        }>
          7
        </Button>
        <Button onClick={() => inputDigit('8')} className={
          theme === 'dark' 
            ? 'bg-gray-600 text-white hover:bg-gray-500' 
            : 'bg-white text-gray-700 hover:bg-gray-100'
        }>
          8
        </Button>
        <Button onClick={() => inputDigit('9')} className={
          theme === 'dark' 
            ? 'bg-gray-600 text-white hover:bg-gray-500' 
            : 'bg-white text-gray-700 hover:bg-gray-100'
        }>
          9
        </Button>
        <Button onClick={() => handleOperator('×')} className={
          theme === 'dark' 
            ? 'bg-blue-700 text-white hover:bg-blue-600' 
            : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
        }>
          ×
        </Button>
        
        <Button onClick={() => inputDigit('4')} className={
          theme === 'dark' 
            ? 'bg-gray-600 text-white hover:bg-gray-500' 
            : 'bg-white text-gray-700 hover:bg-gray-100'
        }>
          4
        </Button>
        <Button onClick={() => inputDigit('5')} className={
          theme === 'dark' 
            ? 'bg-gray-600 text-white hover:bg-gray-500' 
            : 'bg-white text-gray-700 hover:bg-gray-100'
        }>
          5
        </Button>
        <Button onClick={() => inputDigit('6')} className={
          theme === 'dark' 
            ? 'bg-gray-600 text-white hover:bg-gray-500' 
            : 'bg-white text-gray-700 hover:bg-gray-100'
        }>
          6
        </Button>
        <Button onClick={() => handleOperator('-')} className={
          theme === 'dark' 
            ? 'bg-blue-700 text-white hover:bg-blue-600' 
            : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
        }>
          -
        </Button>
        
        <Button onClick={() => inputDigit('1')} className={
          theme === 'dark' 
            ? 'bg-gray-600 text-white hover:bg-gray-500' 
            : 'bg-white text-gray-700 hover:bg-gray-100'
        }>
          1
        </Button>
        <Button onClick={() => inputDigit('2')} className={
          theme === 'dark' 
            ? 'bg-gray-600 text-white hover:bg-gray-500' 
            : 'bg-white text-gray-700 hover:bg-gray-100'
        }>
          2
        </Button>
        <Button onClick={() => inputDigit('3')} className={
          theme === 'dark' 
            ? 'bg-gray-600 text-white hover:bg-gray-500' 
            : 'bg-white text-gray-700 hover:bg-gray-100'
        }>
          3
        </Button>
        <Button onClick={() => handleOperator('+')} className={
          theme === 'dark' 
            ? 'bg-blue-700 text-white hover:bg-blue-600' 
            : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
        }>
          +
        </Button>
        
        <Button onClick={toggleSign} className={
          theme === 'dark' 
            ? 'bg-gray-600 text-white hover:bg-gray-500' 
            : 'bg-white text-gray-700 hover:bg-gray-100'
        }>
          ±
        </Button>
        <Button onClick={() => inputDigit('0')} className={
          theme === 'dark' 
            ? 'bg-gray-600 text-white hover:bg-gray-500' 
            : 'bg-white text-gray-700 hover:bg-gray-100'
        }>
          0
        </Button>
        <Button onClick={inputDecimal} className={
          theme === 'dark' 
            ? 'bg-gray-600 text-white hover:bg-gray-500' 
            : 'bg-white text-gray-700 hover:bg-gray-100'
        }>
          .
        </Button>
        <Button onClick={handleEquals} className="bg-blue-500 text-white hover:bg-blue-600">
          =
        </Button>
      </div>

      {/* Keyboard shortcuts hint */}
      <div className={`mt-2 text-xs text-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
        Keyboard shortcuts: 0-9, +, -, *, /, =, Enter, Backspace, Esc
      </div>
    </div>
  );
}