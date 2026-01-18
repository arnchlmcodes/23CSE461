import React, { useState } from 'react';

const ScientificCalculator = () => {
    const [currentOperand, setCurrentOperand] = useState('');
    const [previousOperand, setPreviousOperand] = useState('');
    const [operation, setOperation] = useState(undefined);
    const [error, setError] = useState(null);

    const clear = () => {
        setCurrentOperand('');
        setPreviousOperand('');
        setOperation(undefined);
        setError(null);
    };

    const deleteNum = () => {
        setCurrentOperand(currentOperand.toString().slice(0, -1));
        setError(null);
    };

    const appendNumber = (number) => {
        if (number === '.' && currentOperand.includes('.')) return;
        setCurrentOperand(currentOperand.toString() + number.toString());
        setError(null);
    };

    const chooseOperation = (op) => {
        if (currentOperand === '') return;
        if (previousOperand !== '') {
            compute();
        }
        setOperation(op);
        setPreviousOperand(currentOperand);
        setCurrentOperand('');
        setError(null);
    };

    const compute = () => {
        let computation;
        const prev = parseFloat(previousOperand);
        const current = parseFloat(currentOperand);
        if (isNaN(prev) || isNaN(current)) return;

        switch (operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '÷':
                if (current === 0) {
                    setError("Div by 0");
                    return;
                }
                computation = prev / current;
                break;
            case '^':
                computation = Math.pow(prev, current);
                break;
            default:
                return;
        }
        setCurrentOperand(computation);
        setOperation(undefined);
        setPreviousOperand('');
    };

    const scientificOp = (func) => {
        const current = parseFloat(currentOperand);
        if (isNaN(current)) return;
        let result;
        switch (func) {
            case 'sin':
                result = Math.sin(current);
                break;
            case 'cos':
                result = Math.cos(current);
                break;
            case 'tan':
                result = Math.tan(current);
                break;
            case 'sqrt':
                if (current < 0) {
                    setError("Invalid Input");
                    return;
                }
                result = Math.sqrt(current);
                break;
            case 'log':
                if (current <= 0) {
                    setError("Invalid Input");
                    return;
                }
                result = Math.log10(current);
                break;
            case 'ln':
                if (current <= 0) {
                    setError("Invalid Input");
                    return;
                }
                result = Math.log(current);
                break;
            default: return;
        }
        setCurrentOperand(result);
        setPreviousOperand('');
        setOperation(undefined);
    }

    const insertConstant = (c) => {
        setCurrentOperand(c === 'pi' ? Math.PI : Math.E);
    }

    return (
        <div className="card" style={{ maxWidth: '500px' }}>
            <h2>Scientific Calculator</h2>
            <div className="calc-display" style={{ minHeight: '80px' }}>
                <div style={{ fontSize: '1rem', opacity: 0.7, minHeight: '1.5rem' }}>
                    {previousOperand} {operation}
                </div>
                <div>{error ? <span>{error}</span> : (currentOperand || '0')}</div>
            </div>

            <div className="calculator-grid" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
                {/* Row 1 */}
                <button className="calc-btn secondary" onClick={clear}>AC</button>
                <button className="calc-btn secondary" onClick={deleteNum}>DEL</button>
                <button className="calc-btn secondary" onClick={() => scientificOp('sin')}>sin</button>
                <button className="calc-btn secondary" onClick={() => scientificOp('cos')}>cos</button>
                <button className="calc-btn secondary" onClick={() => scientificOp('tan')}>tan</button>

                {/* Row 2 */}
                <button className="calc-btn secondary" onClick={() => scientificOp('sqrt')}>√</button>
                <button className="calc-btn secondary" onClick={() => scientificOp('log')}>log</button>
                <button className="calc-btn secondary" onClick={() => scientificOp('ln')}>ln</button>
                <button className="calc-btn secondary" onClick={() => chooseOperation('^')}>^</button>
                <button className="calc-btn primary" onClick={() => chooseOperation('÷')}>÷</button>

                {/* Row 3 */}
                <button className="calc-btn" onClick={() => appendNumber(7)}>7</button>
                <button className="calc-btn" onClick={() => appendNumber(8)}>8</button>
                <button className="calc-btn" onClick={() => appendNumber(9)}>9</button>
                <button className="calc-btn secondary" onClick={() => insertConstant('pi')}>π</button>
                <button className="calc-btn primary" onClick={() => chooseOperation('*')}>*</button>

                {/* Row 4 */}
                <button className="calc-btn" onClick={() => appendNumber(4)}>4</button>
                <button className="calc-btn" onClick={() => appendNumber(5)}>5</button>
                <button className="calc-btn" onClick={() => appendNumber(6)}>6</button>
                <button className="calc-btn secondary" onClick={() => insertConstant('e')}>e</button>
                <button className="calc-btn primary" onClick={() => chooseOperation('+')}>+</button>

                {/* Row 5 */}
                <button className="calc-btn" onClick={() => appendNumber(1)}>1</button>
                <button className="calc-btn" onClick={() => appendNumber(2)}>2</button>
                <button className="calc-btn" onClick={() => appendNumber(3)}>3</button>
                <button className="calc-btn" onClick={() => appendNumber('.')}>.</button>
                <button className="calc-btn primary" onClick={() => chooseOperation('-')}>-</button>

                {/* Row 6 */}
                <button className="calc-btn" style={{ gridColumn: 'span 2' }} onClick={() => appendNumber(0)}>0</button>
                <button className="calc-btn primary wide" style={{ gridColumn: 'span 3' }} onClick={compute}>=</button>
            </div>
        </div>
    );
};

export default ScientificCalculator;
