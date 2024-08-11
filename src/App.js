// src/App.js
import React from "react";
import TimeZoneConverter from "./components/TimeZoneConverter";
import "./App.css";
import HourStateProvider from "./components/ContextReducer";

function App() {
  return (
    <HourStateProvider>
      <TimeZoneConverter />
    </HourStateProvider>
  );
}

export default App;
