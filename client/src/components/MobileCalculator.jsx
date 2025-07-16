import { useReducer } from 'react';

/**
 * Action types for the calculator's reducer.
 * Using a constant object prevents typos and centralizes action names.
 */
const ACTIONS = {
    INPUT_DIGIT: 'input-digit',
    INPUT_DECIMAL: 'input-decimal',
    CHOOSE_OPERATOR: 'choose-operator',
    CALCULATE: 'calculate',
    CLEAR_ALL: 'clear-all',
    CLEAR_ENTRY: 'clear-entry', // For the 'C' button
    TOGGLE_SIGN: 'toggle-sign',
    INPUT_PERCENT: 'input-percent',
};

/**
 * The initial state of the calculator.
 */
const initialState = {
    display: '0',
    firstOperand: null,
    operator: null,
    waitingForSecondOperand: false,
    isAfterEquals: false,
};

/**
 * A pure function to perform the calculation.
 * @param {number} op1 - The first operand.
 * @param {number} op2 - The second operand.
 * @param {string} op - The operator ('+', '-', '*', '/').
 * @returns {number|string} The result of the calculation or 'Error'.
 */
const performCalculation = (op1, op2, op) => {
    switch (op) {
        case '+': return op1 + op2;
        case '-': return op1 - op2;
        case '*': return op1 * op2;
        case '/': return op2 === 0 ? 'Error' : op1 / op2;
        default: return op2;
    }
};

/**
 * The reducer function that handles all state logic based on dispatched actions.
 * @param {object} state - The current state.
 * @param {object} action - The action dispatched, with a 'type' and optional 'payload'.
 * @returns {object} The new state.
 */
function reducer(state, { type, payload }) {
    if (state.display === 'Error' && type !== ACTIONS.CLEAR_ALL) {
        return state; // Lock calculator on error until 'AC' is pressed
    }

    switch (type) {
        case ACTIONS.INPUT_DIGIT:
            if (state.isAfterEquals) {
                return { ...initialState, display: payload.digit, isAfterEquals: false };
            }
            if (state.waitingForSecondOperand) {
                return { ...state, display: payload.digit, waitingForSecondOperand: false };
            }
            return {
                ...state,
                display: state.display === '0' ? payload.digit : state.display + payload.digit,
            };

        case ACTIONS.INPUT_DECIMAL:
            if (state.display.includes('.')) return state;
            if (state.waitingForSecondOperand || state.isAfterEquals) {
                return { ...state, display: '0.', waitingForSecondOperand: false, isAfterEquals: false };
            }
            return { ...state, display: state.display + '.' };

        case ACTIONS.CHOOSE_OPERATOR:
            const inputValue = parseFloat(state.display);
            if (state.operator && !state.waitingForSecondOperand) {
                const result = performCalculation(state.firstOperand, inputValue, state.operator);
                if (result === 'Error') return { ...initialState, display: 'Error' };
                return {
                    ...state,
                    display: String(result),
                    firstOperand: result,
                    operator: payload.operator,
                    waitingForSecondOperand: true,
                    isAfterEquals: false,
                };
            }
            return {
                ...state,
                firstOperand: inputValue,
                operator: payload.operator,
                waitingForSecondOperand: true,
                isAfterEquals: false,
            };

        case ACTIONS.CALCULATE:
            if (!state.operator || state.waitingForSecondOperand) return state;
            const secondOperand = parseFloat(state.display);
            const result = performCalculation(state.firstOperand, secondOperand, state.operator);
            if (result === 'Error') return { ...initialState, display: 'Error' };
            return { ...initialState, display: String(result), isAfterEquals: true };
            
        case ACTIONS.TOGGLE_SIGN:
            if (state.display === '0') return state;
            return {
                ...state,
                display: state.display.startsWith('-') ? state.display.slice(1) : '-' + state.display,
            };
            
        case ACTIONS.INPUT_PERCENT:
            return { ...state, display: String(parseFloat(state.display) / 100) };

        case ACTIONS.CLEAR_ENTRY:
            return { ...state, display: '0', isAfterEquals: false };

        case ACTIONS.CLEAR_ALL:
            return initialState;

        default:
            return state;
    }
}

const MobileCalculator = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    // Determine if the clear button should be 'AC' (All Clear) or 'C' (Clear Entry)
    const clearButtonLabel = state.display !== '0' && !state.waitingForSecondOperand ? 'C' : 'AC';
    const clearAction = clearButtonLabel === 'C' ? ACTIONS.CLEAR_ENTRY : ACTIONS.CLEAR_ALL;

    const buttons = [
        { label: clearButtonLabel, type: 'action', action: () => dispatch({ type: clearAction }) },
        { label: '+/-', type: 'action', action: () => dispatch({ type: ACTIONS.TOGGLE_SIGN }) },
        { label: '%', type: 'action', action: () => dispatch({ type: ACTIONS.INPUT_PERCENT }) },
        { label: '÷', type: 'operator', action: () => dispatch({ type: ACTIONS.CHOOSE_OPERATOR, payload: { operator: '/' } }) },
        { label: '7', type: 'digit', action: () => dispatch({ type: ACTIONS.INPUT_DIGIT, payload: { digit: '7' } }) },
        { label: '8', type: 'digit', action: () => dispatch({ type: ACTIONS.INPUT_DIGIT, payload: { digit: '8' } }) },
        { label: '9', type: 'digit', action: () => dispatch({ type: ACTIONS.INPUT_DIGIT, payload: { digit: '9' } }) },
        { label: '×', type: 'operator', action: () => dispatch({ type: ACTIONS.CHOOSE_OPERATOR, payload: { operator: '*' } }) },
        { label: '4', type: 'digit', action: () => dispatch({ type: ACTIONS.INPUT_DIGIT, payload: { digit: '4' } }) },
        { label: '5', type: 'digit', action: () => dispatch({ type: ACTIONS.INPUT_DIGIT, payload: { digit: '5' } }) },
        { label: '6', type: 'digit', action: () => dispatch({ type: ACTIONS.INPUT_DIGIT, payload: { digit: '6' } }) },
        { label: '−', type: 'operator', action: () => dispatch({ type: ACTIONS.CHOOSE_OPERATOR, payload: { operator: '-' } }) },
        { label: '1', type: 'digit', action: () => dispatch({ type: ACTIONS.INPUT_DIGIT, payload: { digit: '1' } }) },
        { label: '2', type: 'digit', action: () => dispatch({ type: ACTIONS.INPUT_DIGIT, payload: { digit: '2' } }) },
        { label: '3', type: 'digit', action: () => dispatch({ type: ACTIONS.INPUT_DIGIT, payload: { digit: '3' } }) },
        { label: '+', type: 'operator', action: () => dispatch({ type: ACTIONS.CHOOSE_OPERATOR, payload: { operator: '+' } }) },
        { label: '0', type: 'digit', layout: 'col-span-2 justify-start pl-8', action: () => dispatch({ type: ACTIONS.INPUT_DIGIT, payload: { digit: '0' } }) },
        { label: '.', type: 'digit', action: () => dispatch({ type: ACTIONS.INPUT_DECIMAL }) },
        { label: '=', type: 'operator', action: () => dispatch({ type: ACTIONS.CALCULATE }) },
    ];

    const baseButtonClass = 'h-20 rounded-full text-3xl flex items-center justify-center focus:outline-none transition-all duration-100';
    const buttonTypeStyles = {
        digit:    'bg-[#333333] text-white hover:brightness-150 active:brightness-90',
        operator: 'bg-[#F1A33C] text-white hover:brightness-125 active:brightness-95',
        action:   'bg-[#A5A5A5] text-black hover:brightness-125 active:brightness-95',
    };

    return (
        <div className="bg-black h-full flex flex-col p-4 font-sans">
            <div className="flex-grow flex items-end justify-end overflow-hidden">
                <h1 className="text-white text-8xl font-light text-right break-all p-4">
                    {state.display}
                </h1>
            </div>
            <div className="grid grid-cols-4 gap-3 mt-4">
                {buttons.map(btn => (
                    <button
                        key={btn.label}
                        onClick={btn.action}
                        className={`${baseButtonClass} ${buttonTypeStyles[btn.type]} ${btn.layout || ''}`}
                    >
                        {btn.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default MobileCalculator;