import React, { useState } from 'react';

const SumDigits = () => {
    const [num, setNum] = useState('');
    const [result, setResult] = useState(null);

    const calculateSum = () => {
        const cleanNum = num.toString().replace(/[^0-9]/g, '');

        if (!cleanNum) {
            setResult("Please enter a valid number.");
            return;
        }

        const sum = cleanNum
            .split('')
            .reduce((acc, digit) => acc + parseInt(digit), 0);

        setResult(sum);
    };

    return (
        <div className="card">
            <h2>Sum of Digits</h2>
            <p className="description">Enter a number to calculate the sum of its digits.</p>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                <input
                    type="number"
                    value={num}
                    onChange={(e) => setNum(e.target.value)}
                    placeholder="Enter a number"
                />
                <button onClick={calculateSum}>Calculate Sum</button>
            </div>

            {result !== null && (
                <div className="result-box">
                    <strong>Sum: </strong> <span style={{ fontWeight: 'bold' }}>{result}</span>
                </div>
            )}
        </div>
    );
};

export default SumDigits;
