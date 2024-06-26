"use client";

import { updateEntry } from "@/utils/api";
import { useState } from "react";
import { useAutosave } from "react-autosave";
import Spinner from "./Spinner";

const Editor = ({ entry }) => {
  const [value, setValue] = useState(entry.content);
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState(entry.analysis);

  const { mood, summary, color, subject, negative } = analysis;
  const analysisData = [
    { name: "Summary", value: summary },
    { name: "Subject", value: subject },
    { name: "Mood", value: mood },
    { name: "Negative", value: negative ? "True" : "False" },
  ];

  useAutosave({
    data: value,
    onSave: async (_value) => {
      setIsLoading(true);
      const data = await updateEntry(entry.id, _value);
      setAnalysis(data.analysis);
      setIsLoading(false);
    },
  });
  return (
    <div className="w-full h-full grid grid-cols-3 gap-0 relative">
      <div className="absolute left-0 top-0 p-2">
        {isLoading ? (
          <Spinner />
        ) : (
          <div className="w-[16px] h-[16px] rounded-full bg-green-500"></div>
        )}
      </div>
      <div className="col-span-2">
        <textarea
          className="w-full h-full p-8 text-xl outline-none"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <div className="border-l border-black-5">
        <div
          className="h-[100px] text-white p-8"
          style={{ backgroundColor: color }}
        >
          <h2 className="text-2xl bg-white/25 text-black">Analysis</h2>
        </div>
        <div>
          <ul role="list" className="divide-y divide-gray-200">
            {analysisData.map((item) => (
              <li
                key={item.name}
                className="px-4 py-8 flex items-center justify-between border-b border-t border-black/10"
              >
                <span className="text-lg font-semibold w-1/3">{item.name}</span>
                <span className="text-lg">{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Editor;
