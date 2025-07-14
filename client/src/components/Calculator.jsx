import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, History, Trash2, X } from 'lucide-react';

// Main Calculator Component
export default function Calculator() {
  // --- STATE MANAGEMENT ---
  const [display, setDisplay] = useState('0');
  const [firstOperand, setFirstOperand] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);
  const [memory, setMemory] = useState(0);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [theme, setTheme] = useState('dark'); // Defaulting to dark theme

  // --- CORE LOGIC (memoized with useCallback) ---

  const formatResult = useCallback((value) => {
    if (typeof value !== 'number' || !isFinite(value)) return 'Error';
    const stringValue = String(value);
    // Use exponential notation for very long numbers to prevent overflow
    if (stringValue.length > 12) {
      return value.toExponential(6);
    }
    return stringValue;
  }, []);

  const performCalculation = useCallback(() => {
    const inputValue = parseFloat(display);
    if (isNaN(inputValue) || firstOperand === null) return inputValue;

    const calculations = {
      '+': (a, b) => a + b,
      '-': (a, b) => a - b,
      '×': (a, b) => a * b,
      '÷': (a, b) => (b === 0 ? 'Error' : a / b),
      '%': (a, b) => a % b,
    };
    return calculations[operator] ? calculations[operator](firstOperand, inputValue) : inputValue;
  }, [display, firstOperand, operator]);
  
  const addToHistory = useCallback((calculation, result) => {
    setHistory(prev => [{ calculation, result, id: Date.now() }, ...prev].slice(0, 20));
  }, []);

  const inputDigit = useCallback((digit) => {
    if (display.length >= 16 && !waitingForSecondOperand) return;
    if (waitingForSecondOperand) {
      setDisplay(String(digit));
      setWaitingForSecondOperand(false);
    } else {
      setDisplay(display === '0' ? String(digit) : display + digit);
    }
  }, [display, waitingForSecondOperand]);

  const inputDecimal = useCallback(() => {
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  }, [display]);

  const clearAll = useCallback(() => {
    setDisplay('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  }, []);

  const handleOperator = useCallback((nextOperator) => {
    const inputValue = parseFloat(display);
    if (isNaN(inputValue)) return;

    if (firstOperand !== null && operator) {
      const result = performCalculation();
      const formattedResult = formatResult(result);
      addToHistory(`${formatResult(firstOperand)} ${operator} ${formatResult(inputValue)}`, formattedResult);
      setDisplay(formattedResult);
      setFirstOperand(result === 'Error' ? null : result);
    } else {
      setFirstOperand(inputValue);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  }, [display, firstOperand, operator, performCalculation, formatResult, addToHistory]);

  const handleEquals = useCallback(() => {
    if (!operator || firstOperand === null) return;
    const result = performCalculation();
    const formattedResult = formatResult(result);
    addToHistory(`${formatResult(firstOperand)} ${operator} ${formatResult(parseFloat(display))}`, formattedResult);
    
    setDisplay(formattedResult);
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(true);
  }, [display, firstOperand, operator, performCalculation, formatResult, addToHistory]);
  
  // --- KEYBOARD SUPPORT ---
  useEffect(() => {
    const handleKeyDown = (e) => {
      e.preventDefault();
      if (/\d/.test(e.key)) inputDigit(e.key);
      else if (e.key === '.') inputDecimal();
      else if (e.key === 'Escape') clearAll();
      else if (e.key === 'Backspace') setDisplay(d => d.length > 1 ? d.slice(0, -1) : '0');
      else if (e.key === 'Enter' || e.key === '=') handleEquals();
      else if (['+', '-', '%'].includes(e.key)) handleOperator(e.key);
      else if (e.key === '*') handleOperator('×');
      else if (e.key === '/') handleOperator('÷');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [inputDigit, inputDecimal, clearAll, handleEquals, handleOperator]);

  // --- THEME-AWARE BUTTON COMPONENT ---
  const Button = ({ onClick, children, className = '' }) => {
    const baseClasses = "rounded-lg text-xl sm:text-2xl focus:outline-none focus:ring-2 transition-all duration-150";
    const themeClasses = {
      light: {
        default: 'bg-gray-200/80 hover:bg-gray-300/80 focus:ring-cyan-300 text-gray-800',
        operator: 'bg-cyan-200/70 hover:bg-cyan-300/70 focus:ring-cyan-400 text-cyan-800',
        equals: 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-400 text-white',
      },
      dark: {
        default: 'bg-gray-700/50 hover:bg-gray-600/50 focus:ring-cyan-500 text-gray-100',
        operator: 'bg-cyan-500/80 hover:bg-cyan-400/80 focus:ring-cyan-300 text-white',
        equals: 'bg-blue-600 hover:bg-blue-500 focus:ring-blue-400 text-white',
      }
    };
    
    let type = 'default';
    if (['÷', '×', '-', '+'].includes(children)) type = 'operator';
    if (children === '=') type = 'equals';

    return (
      <motion.button
        onClick={onClick}
        className={`${baseClasses} ${themeClasses[theme][type]} ${className}`}
        whileTap={{ scale: 0.95 }}
      >
        {children}
      </motion.button>
    );
  };

  return (
    <div className={`flex flex-col h-full transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      <div className="flex-grow flex items-center justify-center p-2 sm:p-4">
        <div className={`w-full max-w-sm mx-auto rounded-2xl p-4 shadow-2xl transition-all duration-300 ${theme === 'dark' ? 'bg-gray-800/50 shadow-cyan-500/5' : 'bg-white/70 shadow-gray-400/20'}`}>
          
          {/* --- HEADER --- */}
          <div className="flex justify-between items-center mb-4">
            <AnimatePresence mode="wait">
              <motion.button key={theme} onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')} className="p-2 rounded-full hover:bg-white/10" whileTap={{scale:0.9}} initial={{opacity:0, y:-10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:10}}>
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </motion.button>
            </AnimatePresence>
            <button onClick={() => setShowHistory(s => !s)} className="p-2 rounded-full hover:bg-white/10">
              <History size={18} />
            </button>
          </div>

          {/* --- HISTORY PANEL --- */}
          <AnimatePresence>
            {showHistory && (
              <motion.div
                className={`mb-4 border rounded-lg overflow-hidden ${theme === 'dark' ? 'bg-gray-900/50 border-gray-700' : 'bg-gray-50 border-gray-200'}`}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <div className="p-3">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-semibold">History</h3>
                    <button onClick={() => setHistory([])} className="p-1 rounded-full hover:bg-white/10"><Trash2 size={14} /></button>
                  </div>
                  <div className="max-h-32 overflow-y-auto text-sm space-y-2">
                    {history.length === 0 
                      ? <p className="text-center text-xs text-gray-500 py-4">No history yet</p>
                      : history.map(item => (
                          <div key={item.id} className="text-right">
                            <p className="text-xs text-gray-400">{item.calculation}</p>
                            <p className="font-semibold">{item.result}</p>
                          </div>
                        ))
                    }
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* --- DISPLAY --- */}
          <div className="mb-4 text-right">
            <p className="h-6 text-gray-400 text-lg break-all">{firstOperand !== null && operator ? `${formatResult(firstOperand)} ${operator}` : ' '}</p>
            <p className="text-4xl sm:text-5xl font-bold break-all">{display}</p>
          </div>

          {/* --- BUTTONS --- */}
          <div className="grid grid-cols-4 grid-rows-5 gap-2 sm:gap-3">
            <Button onClick={clearAll}>AC</Button>
            <Button onClick={() => setDisplay(d => String(parseFloat(d) * -1))}>±</Button>
            <Button onClick={() => handleOperator('%')}>%</Button>
            <Button onClick={() => handleOperator('÷')}>÷</Button>
            
            <Button>7</Button>
            <Button>8</Button>
            <Button>9</Button>
            <Button onClick={() => handleOperator('×')}>×</Button>
            
            <Button>4</Button>
            <Button>5</Button>
            <Button>6</Button>
            <Button onClick={() => handleOperator('-')}>-</Button>
            
            <Button>1</Button>
            <Button>2</Button>
            <Button>3</Button>
            <Button onClick={() => handleOperator('+')}>+</Button>
            
            <Button className="col-span-2">0</Button>
            <Button onClick={inputDecimal}>.</Button>
            <Button onClick={handleEquals}>=</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
