"use client";

import { useState } from "react";

interface ImprovementChecklistProps {
  areas: string[];
}

const ImprovementChecklist = ({ areas }: ImprovementChecklistProps) => {
  const [checkedItems, setCheckedItems] = useState<boolean[]>(
    new Array(areas.length).fill(false)
  );

  const handleCheck = (index: number) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItems(newCheckedItems);
  };

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-white text-xl font-semibold">Areas for Improvement</h3>
      <div className="flex flex-col gap-3">
        {areas.map((area, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-4 border-gradient rounded-lg dark-gradient cursor-pointer transition-all duration-200 hover:bg-[#27282f]/50"
            onClick={() => handleCheck(index)}
          >
            <div className="relative flex items-center justify-center">
              <input
                type="checkbox"
                checked={checkedItems[index]}
                onChange={() => handleCheck(index)}
                className="sr-only"
              />
              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${checkedItems[index] ? "border-[#cac5fe] bg-[#cac5fe]/20" : "border-[#6870a6]"}`}>
                {checkedItems[index] && (
                  <svg className="w-3 h-3 text-[#cac5fe]" viewBox="0 0 12 12" fill="currentColor">
                    <path d="M10.28 2.28L4.5 8.06 1.72 5.28a.75.75 0 00-1.06 1.06l3.25 3.25a.75.75 0 001.06 0l6.25-6.25a.75.75 0 00-1.06-1.06z" />
                  </svg>
                )}
              </div>
            </div>
            <span className={`text-white ${checkedItems[index] ? "line-through text-gray-400" : ""}`}>
              {area}
            </span>
          </div>
        ))}
      </div>
      <p className="text-sm text-gray-400 mt-2">
        Click items to track your improvement progress
      </p>
    </div>
  );
};

export default ImprovementChecklist;