import React, { useState } from 'react';

const MathOperations = () => {
    const [activeTab, setActiveTab] = useState('factorial');

    const [factNum, setFactNum] = useState('');
    const [factResult, setFactResult] = useState(null);

    const [fiboCount, setFiboCount] = useState('');
    const [fiboResult, setFiboResult] = useState([]);

    const [primeNum, setPrimeNum] = useState('');
    const [primeResult, setPrimeResult] = useState(null);

    const calculateFactorial = () => {
        const n = parseInt(factNum);
        if (isNaN(n) || n < 0) {
            setFactResult("Please enter a non-negative integer.");
            return;
        }
        let result = 1;
        for (let i = 2; i <= n; i++) result *= i;
        setFactResult(result);
    };

    const generateFibonacci = () => {
        const n = parseInt(fiboCount);
        if (isNaN(n) || n <= 0) {
            setFiboResult(["Please enter a positive integer."]);
            return;
        }
        const series = [0, 1];
        if (n === 1) {
            setFiboResult([0]);
            return;
        }
        for (let i = 2; i < n; i++) {
            series.push(series[i - 1] + series[i - 2]);
        }
        setFiboResult(series.slice(0, n));
    };

    const checkPrime = () => {
        const n = parseInt(primeNum);
        if (isNaN(n)) {
            setPrimeResult("Please enter a valid number.");
            return;
        }
        if (n <= 1) {
            setPrimeResult(`${n} is NOT a Prime Number`);
            return;
        }
        for (let i = 2; i <= Math.sqrt(n); i++) {
            if (n % i === 0) {
                setPrimeResult(`${n} is NOT a Prime Number`);
                return;
            }
        }
        setPrimeResult(`${n} is a Prime Number`);
    };

    return (
        <div className="card">
            <h2>Math Operations</h2>
            <div className="tab-container">
                {['factorial', 'fibonacci', 'prime'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`tab-button ${activeTab === tab ? 'active' : ''}`}
                        style={{ textTransform: 'capitalize' }}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {activeTab === 'factorial' && (
                <div>
                    <h3>Factorial Calculator</h3>
                    <p className="description">Calculate the factorial of a non-negative integer.</p>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <input
                            type="number"
                            value={factNum}
                            onChange={(e) => setFactNum(e.target.value)}
                            placeholder="Enter a number"
                        />
                        <button onClick={calculateFactorial}>Calculate</button>
                    </div>
                    {factResult !== null && (
                        <div className="result-box">
                            <strong>Result: </strong> {factResult}
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'fibonacci' && (
                <div>
                    <h3>Fibonacci Series</h3>
                    <p className="description">Generate the first N terms of the Fibonacci series.</p>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <input
                            type="number"
                            value={fiboCount}
                            onChange={(e) => setFiboCount(e.target.value)}
                            placeholder="Count (N)"
                        />
                        <button onClick={generateFibonacci}>Generate</button>
                    </div>
                    {fiboResult.length > 0 && (
                        <div className="result-box" style={{ wordBreak: 'break-word' }}>
                            <strong>Series: </strong> {Array.isArray(fiboResult) ? fiboResult.join(', ') : fiboResult}
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'prime' && (
                <div>
                    <h3>Prime Number Checker</h3>
                    <p className="description">Check if a number is prime.</p>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <input
                            type="number"
                            value={primeNum}
                            onChange={(e) => setPrimeNum(e.target.value)}
                            placeholder="Enter a number"
                        />
                        <button onClick={checkPrime}>Check</button>
                    </div>
                    {primeResult && (
                        <div className="result-box">
                            <strong>Result: </strong> {primeResult}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default MathOperations;
