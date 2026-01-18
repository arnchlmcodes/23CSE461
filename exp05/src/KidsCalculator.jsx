import React, { useState, useEffect } from 'react';

const KidsCalculator = () => {
    const [mode, setMode] = useState('calc'); // 'calc' or 'game'
    const [display, setDisplay] = useState('0');
    const [equation, setEquation] = useState(null); // For calculator logic
    const [gameQuestion, setGameQuestion] = useState(null);
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState('');

    // --- Calculator Logic ---
    const handleCalcInput = (val) => {
        if (val === 'C') {
            setDisplay('0');
            setEquation(null);
            return;
        }
        if (val === '=') {
            try {
                // Safe evaluation
                const result = Function('"use strict";return (' + display + ')')();
                setDisplay(String(result));
            } catch (e) {
                setDisplay('Error');
            }
            return;
        }

        if (val === 'DEL') {
            setDisplay(prev => prev.length > 1 ? prev.slice(0, -1) : '0');
            return;
        }

        // Append number or operator
        setDisplay(prev => prev === '0' && !['+', '-', '*', '/'].includes(val) ? val : prev + val);
    };

    // --- Game Logic ---
    const generateQuestion = () => {
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        const ops = ['+', '-'];
        const op = ops[Math.floor(Math.random() * ops.length)];

        // Ensure positive result for subtraction
        if (op === '-' && num1 < num2) {
            setGameQuestion({ str: `${num2} - ${num1} = ?`, ans: num2 - num1 });
        } else {
            setGameQuestion({ str: `${num1} ${op} ${num2} = ?`, ans: op === '+' ? num1 + num2 : num1 - num2 });
        }
        setDisplay('');
        setFeedback('');
    };

    useEffect(() => {
        if (mode === 'game') {
            generateQuestion();
            setScore(0);
        } else {
            setDisplay('0');
        }
    }, [mode]);

    const handleGameInput = (val) => {
        if (val === 'C') {
            setDisplay('');
            return;
        }
        if (val === 'DEL') {
            setDisplay(prev => prev.length > 1 ? prev.slice(0, -1) : '');
            return;
        }
        if (['+', '-', '*', '/'].includes(val)) return; // No operators in answer

        if (val === '=') {
            const answer = parseInt(display);
            if (answer === gameQuestion.ans) {
                setScore(src => src + 1);
                setFeedback('Correct! 🎉');
                setTimeout(() => {
                    generateQuestion();
                }, 1000);
            } else {
                setFeedback('Try Again! ❌');
                setDisplay('');
            }
            return;
        }

        setDisplay(prev => prev + val);
    };

    const handlePress = (val) => {
        if (mode === 'calc') handleCalcInput(val);
        else handleGameInput(val);
    };

    const btnClass = (type) => `calc-btn ${type}`;

    return (
        <div className="card game-container">
            <div className="mode-switch">
                <button
                    className={`mode-btn ${mode === 'calc' ? 'active' : ''}`}
                    onClick={() => setMode('calc')}
                >
                    🧮 Calculator
                </button>
                <button
                    className={`mode-btn ${mode === 'game' ? 'active' : ''}`}
                    onClick={() => setMode('game')}
                >
                    🎮 Math Game
                </button>
            </div>

            {mode === 'game' && (
                <div className="text-center">
                    <span className="score-badge">Score: {score}</span>
                    <div className="question-box">
                        {gameQuestion?.str}
                    </div>
                    <div className={`feedback ${feedback.includes('Correct') ? 'success' : 'error'}`}>
                        {feedback}
                    </div>
                </div>
            )}

            {/* Display Screen */}
            <div className="calc-display">
                {display || (mode === 'game' ? '?' : '0')}
            </div>

            <div className="calc-grid">
                <button className={btnClass('action')} onClick={() => handlePress('C')}>C</button>
                <button className={btnClass('operator')} onClick={() => handlePress('/')}>÷</button>
                <button className={btnClass('operator')} onClick={() => handlePress('*')}>×</button>
                <button className={btnClass('action')} onClick={() => handlePress('DEL')}>⌫</button>

                <button className={btnClass('number')} onClick={() => handlePress('7')}>7</button>
                <button className={btnClass('number')} onClick={() => handlePress('8')}>8</button>
                <button className={btnClass('number')} onClick={() => handlePress('9')}>9</button>
                <button className={btnClass('operator')} onClick={() => handlePress('-')}>-</button>

                <button className={btnClass('number')} onClick={() => handlePress('4')}>4</button>
                <button className={btnClass('number')} onClick={() => handlePress('5')}>5</button>
                <button className={btnClass('number')} onClick={() => handlePress('6')}>6</button>
                <button className={btnClass('operator')} onClick={() => handlePress('+')}>+</button>

                <button className={btnClass('number')} onClick={() => handlePress('1')}>1</button>
                <button className={btnClass('number')} onClick={() => handlePress('2')}>2</button>
                <button className={btnClass('number')} onClick={() => handlePress('3')}>3</button>

                <button className={btnClass('number')} style={{ gridColumn: 'span 2' }} onClick={() => handlePress('0')}>0</button>

                <button className={btnClass('equals')} onClick={() => handlePress('=')}>
                    {mode === 'game' ? 'Submit' : '='}
                </button>
            </div>

            <p className="description" style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.9rem' }}>
                {mode === 'calc' ? 'Standard Calculator Mode' : 'Solve the math problem above!'}
            </p>
        </div>
    );
};

export default KidsCalculator;
