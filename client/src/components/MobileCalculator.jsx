import { useState } from 'react';

const MobileCalculator = () => {
    const [display, setDisplay] = useState('0');
    const [firstOperand, setFirstOperand] = useState(null);
    const [operator, setOperator] = useState(null);
    const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);
    
    // Tracks if the last operation was '=' to handle subsequent input correctly.
    const [isAfterEquals, setIsAfterEquals] = useState(false);

    const inputDigit = (digit) => {
        // Lock the calculator on error until cleared.
        if (display === 'Error') return;

        // If a digit is pressed after '=', start a new calculation.
        if (isAfterEquals) {
            setDisplay(String(digit));
            setIsAfterEquals(false);
        } else if (waitingForSecondOperand) {
            setDisplay(String(digit));
            setWaitingForSecondOperand(false);
        } else {
            setDisplay(display === '0' ? String(digit) : display + digit);
        }
    };

    const inputDecimal = () => {
        if (display === 'Error') return;
        setIsAfterEquals(false);

        // If entering the second operand, start with '0.'
        if (waitingForSecondOperand) {
            setDisplay('0.');
            setWaitingForSecondOperand(false);
            return;
        }

        // Add a decimal point only if one doesn't already exist.
        if (!display.includes('.')) {
            setDisplay(display + '.');
        }
    };

    const handleOperator = (nextOperator) => {
        if (display === 'Error') return;
        
        const inputValue = parseFloat(display);

        // This allows chaining operations (e.g., 5 * 2 + 3)
        if (operator && !waitingForSecondOperand) {
            const result = calculate(firstOperand, inputValue, operator);
            if (result === 'Error') {
                resetOnError();
                return;
            }
            setDisplay(String(result));
            setFirstOperand(result);
        } else {
            setFirstOperand(inputValue);
        }

        setWaitingForSecondOperand(true);
        setOperator(nextOperator);
        setIsAfterEquals(false);
    };
    
    const calculate = (op1, op2, op) => {
        switch (op) {
            case '+': return op1 + op2;
            case '-': return op1 - op2;
            case '*': return op1 * op2;
            case '/': return op2 === 0 ? 'Error' : op1 / op2;
            default: return op2;
        }
    };

    const handleEquals = () => {
        if (display === 'Error' || operator === null || waitingForSecondOperand) return;
        
        const secondOperand = parseFloat(display);
        const result = calculate(firstOperand, secondOperand, operator);

        if (result === 'Error') {
            resetOnError();
            return;
        }

        setDisplay(String(result));
        setFirstOperand(null);
        setOperator(null);
        setWaitingForSecondOperand(false);
        setIsAfterEquals(true);
    };
    
    const clearAll = () => {
        setDisplay('0');
        setFirstOperand(null);
        setOperator(null);
        setWaitingForSecondOperand(false);
        setIsAfterEquals(false);
    };

    const toggleSign = () => {
        if (display === 'Error' || display === '0') return;
        setDisplay(display.startsWith('-') ? display.slice(1) : '-' + display);
    };

    const inputPercent = () => {
        if (display === 'Error') return;
        const currentValue = parseFloat(display);
        setDisplay(String(currentValue / 100));
        setIsAfterEquals(false);
    };

    // Resets state after a calculation error.
    const resetOnError = () => {
        setDisplay('Error');
        setFirstOperand(null);
        setOperator(null);
        setWaitingForSecondOperand(false);
    };

    const buttons = [
        { label: 'AC', class: 'bg-gray-400', action: clearAll },
        { label: '+/-', class: 'bg-gray-400', action: toggleSign },
        { label: '%', class: 'bg-gray-400', action: inputPercent },
        { label: '/', class: 'bg-orange-500 text-white', action: () => handleOperator('/') },
        { label: '7', class: 'bg-gray-600', action: () => inputDigit(7) },
        { label: '8', class: 'bg-gray-600', action: () => inputDigit(8) },
        { label: '9', class: 'bg-gray-600', action: () => inputDigit(9) },
        { label: '*', class: 'bg-orange-500 text-white', action: () => handleOperator('*') },
        { label: '4', class: 'bg-gray-600', action: () => inputDigit(4) },
        { label: '5', class: 'bg-gray-600', action: () => inputDigit(5) },
        { label: '6', class: 'bg-gray-600', action: () => inputDigit(6) },
        { label: '-', class: 'bg-orange-500 text-white', action: () => handleOperator('-') },
        { label: '1', class: 'bg-gray-600', action: () => inputDigit(1) },
        { label: '2', class: 'bg-gray-600', action: () => inputDigit(2) },
        { label: '3', class: 'bg-gray-600', action: () => inputDigit(3) },
        { label: '+', class: 'bg-orange-500 text-white', action: () => handleOperator('+') },
        { label: '0', class: 'col-span-2 bg-gray-600', action: () => inputDigit(0) },
        { label: '.', class: 'bg-gray-600', action: inputDecimal },
        { label: '=', class: 'bg-orange-500 text-white', action: handleEquals },
    ];

    return (
        <div className="bg-black h-full flex flex-col p-4">
            <div className="flex-grow flex items-end justify-end">
                <h1 className="text-white text-7xl font-light break-all">{display}</h1>
            </div>
            <div className="grid grid-cols-4 gap-3 mt-4">
                {buttons.map(btn => (
                    <button key={btn.label} onClick={btn.action} className={`h-20 rounded-full text-3xl text-white flex items-center justify-center focus:outline-none ${btn.class}`}>
                        {btn.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default MobileCalculator;