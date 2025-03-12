import React, { useState, useEffect } from 'react';

const TwosComplementCalculator = () => {
  const [inputNumber, setInputNumber] = useState(0);
  const [binaryRepresentation, setBinaryRepresentation] = useState('');
  const [complementRepresentation, setComplementRepresentation] = useState('');
  const [error, setError] = useState('');

  const calculateRepresentations = (num) => {
    setError('');
    if (num < -128 || num > 127) {
      setError('输入必须在 -128 到 127 之间');
      return;
    }

    let binary = '';
    if (num >= 0) {
      binary = num.toString(2).padStart(8, '0');
      setBinaryRepresentation(binary);
      setComplementRepresentation(binary);
    } else {
      // 对于负数，先计算其绝对值的二进制表示
      binary = Math.abs(num).toString(2).padStart(8, '0');
      setBinaryRepresentation(binary);
      
      // 计算补码：所有位取反（包括最高位），然后加1
      let inverted = binary.split('').map(bit => bit === '0' ? '1' : '0').join('');
      let complement = (parseInt(inverted, 2) + 1).toString(2).padStart(8, '0');
      setComplementRepresentation(complement);
    }
  };

  useEffect(() => {
    calculateRepresentations(inputNumber);
  }, [inputNumber]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value === '' || isNaN(value)) {
      setInputNumber(0);
    } else {
      setInputNumber(parseInt(value, 10));
    }
  };

  const BinaryDisplay = ({ value, title, isComplement }) => (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <div className="flex justify-center space-x-1">
        {value.split('').map((bit, index) => (
          <span 
            key={index} 
            className={`w-8 h-8 flex items-center justify-center border ${
              index === 0 ? 'bg-red-200 border-red-500' : 'bg-gray-100 border-gray-300'
            } ${isComplement && index === 0 ? 'font-bold' : ''} rounded`}
          >
            {bit}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-4 text-center">修正后的二进制补码计算器</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          输入一个整数 (-128 到 127):
        </label>
        <input
          type="number"
          value={inputNumber}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          min="-128"
          max="127"
        />
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {!error && (
        <>
          <BinaryDisplay value={binaryRepresentation} title={`${Math.abs(inputNumber)}的二进制表示`} />
          {inputNumber < 0 && (
            <BinaryDisplay value={complementRepresentation} title={`${inputNumber}的补码表示`} isComplement={true} />
          )}
        </>
      )}
    </div>
  );
};

export default TwosComplementCalculator;
