// src/ContextReducer.js
import React, { createContext, useState } from "react";
import moment from "moment-timezone";

export const hourStateContext = createContext();

const HourStateProvider = ({ children }) => {
  const [baseTime, setBaseTime] = useState(moment());

  const updateState = (newBaseTime) => {
    setBaseTime(newBaseTime);
  };

  return (
    <hourStateContext.Provider value={{ baseTime, updateState }}>
      {children}
    </hourStateContext.Provider>
  );
};

export default HourStateProvider;
