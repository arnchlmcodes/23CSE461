import React, { useState } from 'react';

const MathLab3 = () => {
    const [numA, setNumA] = useState('');
    const [numB, setNumB] = useState('');
    const [result, setResult] = useState(null);
    const [message, setMessage] = useState('');

    const calculateExpression = () => {
        const a = parseFloat(numA);
        const b = parseFloat(numB);

        if (isNaN(a) || isNaN(b)) {
            setResult("Please enter valid numbers for A and B");
            return;
        }

        if (a - b === 0) {
            setResult("Division by zero error (a - b = 0)");
            return;
        }

        // Result=(a+b)/(a-b)*(a+b)
        // Note: Division and multiplication have same precedence, evaluated left to right.
        // ((a+b)/(a-b)) * (a+b)
        const res = ((a + b) / (a - b)) * (a + b);
        setResult(`Expression Result: ${res.toFixed(4)}`);
    };

    const modSumSquare = () => {
        const cleanNum = numA.toString().replace(/[^0-9]/g, '');
        if (!cleanNum) {
            setResult("Please enter a valid number in A");
            return;
        }

        const sumSq = cleanNum
            .split('')
            .reduce((acc, digit) => acc + Math.pow(parseInt(digit), 2), 0);

        setResult(`MoD Sum Square of A: ${sumSq}`);
    };

    const checkEvenOdd = () => {
        const a = parseInt(numA);
        if (isNaN(a)) {
            setMessage("Please enter a valid integer in A");
            return;
        }
        setMessage(`${a} is ${a % 2 === 0 ? 'Even' : 'Odd'}`);
    };

    return (
        <div className="card" style={{ maxWidth: '600px' }}>
            <h2>Ex 3: Complex Calculator</h2>

            <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Number A:</label>
                    <input
                        type="number"
                        value={numA}
                        onChange={(e) => setNumA(e.target.value)}
                        placeholder="Enter value a"
                        style={{ width: '100%' }}
                    />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Number B:</label>
                    <input
                        type="number"
                        value={numB}
                        onChange={(e) => setNumB(e.target.value)}
                        placeholder="Enter value b"
                        style={{ width: '100%' }}
                    />
                </div>
            </div>

            <div style={{ display: 'grid', gap: '10px', gridTemplateColumns: '1fr 1fr' }}>
                <button onClick={calculateExpression} className="primary" style={{ gridColumn: 'span 2' }}>
                    Evaluate: (a+b)/(a-b)*(a+b)
                </button>

                <button onClick={modSumSquare} className="secondary">
                    MoD_Sum_square
                </button>

                <button onClick={checkEvenOdd} className="secondary">
                    Even_ODD
                </button>
            </div>

            {(result || message) && (
                <div className="result-box" style={{ marginTop: '1.5rem' }}>
                    {result && <div style={{ marginBottom: '0.5rem' }}><strong>{result}</strong></div>}
                    {message && <div><strong>{message}</strong></div>}
                </div>
            )}
        </div>
    );
};

export default MathLab3;
