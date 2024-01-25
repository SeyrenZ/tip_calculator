"use client";
import { DollarIcon, PersonIcon, SplitterLogo } from "@/public";
import React, { useEffect, useState } from "react";

const Calculator = () => {
  const [billValue, setBillValue] = useState(0);
  const [numberOfPeople, setNumberOfPeople] = useState(0);
  const [ButtonValue, setButtonValue] = useState(0);
  const [customValue, setCustomValue] = useState(0);
  const [result, setResult] = useState(0);
  const [result2, setResult2] = useState(0);

  // handling all the calculation
  const handleCalculation = (value: number) => {
    const tipPercentage = customValue !== 0 ? customValue : ButtonValue;

    const CalculationResult =
      ((tipPercentage / 100) * billValue) / numberOfPeople;

    const CalculationResult2 =
      ((tipPercentage / 100) * billValue + billValue) / numberOfPeople;

    // to round the decimal so it will end up like this 32.78 instead of this 32.7890909099
    setResult(Math.round(CalculationResult * 100) / 100);
    setResult2(Math.round(CalculationResult2 * 100) / 100);
  };

  // to reset the calculation when the button is clicked
  const handleReset = () => {
    setResult(0);
    setResult2(0);
    setButtonValue(0);
    setBillValue(0);
    setNumberOfPeople(0);
    setCustomValue(0);
  };
  // prevent double click on SelectTip button
  useEffect(() => {
    handleCalculation(ButtonValue);
  });

  return (
    <>
      <div className="flex flex-col items-center gap-y-5 lg:gap-y-20">
        <SplitterLogo className="sm:mt-14" />
        <div className="w-auto h-auto p-8 sm:p-8 bg-white rounded-xl sm:rounded-t-[30px] flex gap-x-12 sm:flex-col sm:gap-y-5 sm:items-center">
          {/* Calculation UI */}
          <div className="flex flex-col w-[420px] sm:w-[340px] gap-y-10 sm:gap-y-8">
            {/* input box 1# */}
            <div className="flex flex-col gap-y-2">
              <label className="text-[#5e7a7d] font-bold">Bill</label>
              <DollarIcon className="mt-12 ml-5 absolute" />
              <input
                value={billValue}
                placeholder="0"
                onChange={(e) => setBillValue(e.target.valueAsNumber)}
                type="number"
                min={0}
                className="w-full h-12 px-1 sm:px-4 rounded-lg bg-[#eaefef]  focus:outline-[#26c0ab]  placeholder-[#00494d] text-[#00494d] text-2xl font-bold text-right"
              />
            </div>
            <div className="flex flex-col gap-y-3">
              <div className="text-[#5e7a7d] font-bold">Select Tip %</div>
              <div className="grid grid-cols-3 gap-4 container">
                {[5, 10, 15, 25, 50].map((value) => {
                  return (
                    <button
                      key={value}
                      onClick={() => {
                        setButtonValue(value);
                        handleCalculation(value);
                        setCustomValue(0);
                      }}
                      className="w-auto h-12 rounded-md bg-[#00494d] hover:bg-[#26c0ab] focus:bg-[#26c0ab] text-white text-2xl font-bold"
                    >
                      {value}
                      <span className="font-thin">%</span>
                    </button>
                  );
                })}
                <input
                  value={customValue}
                  onChange={(e) => {
                    setCustomValue(e.target.valueAsNumber);
                    setButtonValue(0);
                  }}
                  type="number"
                  min={0}
                  placeholder="Custom"
                  className="w-auto h-12 px-1 sm:px-4 rounded-md bg-[#eaefef] text-right placeholder-[#5e7a7d] text-[#00494d] text-2xl font-bold focus:outline-[#26c0ab]"
                />
              </div>
            </div>
            <div className="flex flex-col gap-y-2">
              <PersonIcon className="absolute mt-12 ml-5" />
              <label className="text-[#5e7a7d] font-bold">
                Number of People
              </label>
              <input
                value={numberOfPeople}
                onChange={(e) => setNumberOfPeople(e.target.valueAsNumber)}
                type="number"
                min={0}
                placeholder="0"
                className="w-full h-12 px-1 sm:px-4 rounded-md bg-[#eaefef] text-right placeholder-[#00494d] text-[#00494d] text-2xl font-bold focus:outline-[#26c0ab]"
              />
            </div>
          </div>
          {/* Calculation Result */}
          <div className="w-auto sm:w-[345px] p-9 sm:p-5 bg-[#00494d] rounded-2xl flex flex-col gap-y-32 sm:gap-y-10 overflow-hidden">
            <div className="mt-1 flex flex-col gap-y-14 sm:gap-y-5">
              <div className="flex items-center justify-between gap-x-48 sm:gap-x-24">
                <div className="text-white text-lg sm:text-[15px] font-bold">
                  Tip Amount <br />
                  <span className="text-[#5e7a7d]">/ person</span>
                </div>
                <div className="text-[#26c0ab] text-5xl sm:text-3xl font-bold overflow-hidden">
                  <span>$</span>
                  {isNaN(result) || !isFinite(result) ? 0 : result}
                </div>
              </div>
              <div className="flex items-center justify-between gap-x-20">
                <div className="text-white text-lg sm:text-[15px] font-bold">
                  Total <br />
                  <span className="text-[#5e7a7d]">/ person</span>
                </div>
                <div className=" text-[#26c0ab] text-5xl sm:text-3xl font-bold overflow-hidden">
                  <span>$</span>
                  {isNaN(result2) || !isFinite(result2) ? 0 : result2}
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                onClick={handleReset}
                className="w-full h-12 rounded-md bg-[#26c0ab] hover:bg-[#2bdcc4] text-xl font-bold text-[#00494d]"
              >
                RESET
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Calculator;
