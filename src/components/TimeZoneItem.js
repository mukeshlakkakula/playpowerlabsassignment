import React, { useContext, useState, useEffect } from "react";
import moment from "moment-timezone";
import { FaTrash, FaGripVertical } from "react-icons/fa";
import "./TimeZoneItem.css";
import { hourStateContext } from "./ContextReducer";

const TimeZoneItem = ({ timeZone, onRemove, provided }) => {
  const { baseTime, updateState } = useContext(hourStateContext);
  const datetimeInZone = baseTime.tz(timeZone).format("YYYY-MM-DD");
  const timeInZone = baseTime.tz(timeZone).format("HH");

  const [hour, setHour] = useState(parseInt(timeInZone, 10));

  useEffect(() => {
    setHour(parseInt(timeInZone, 10));
  }, [timeInZone]);

  const handleHourChange = (event) => {
    const newHour = parseInt(event.target.value, 10);
    setHour(newHour);

    // Calculate the new time for this specific time zone and convert it to UTC
    const updatedTime = moment
      .tz(datetimeInZone, timeZone)
      .set({ hour: newHour });

    // Update global state (UTC) with the new time
    updateState(updatedTime);
  };

  return (
    <div
      className="time-zone-item"
      ref={provided.innerRef}
      {...provided.draggableProps}
    >
      <div className="drag-handle" {...provided.dragHandleProps}>
        <FaGripVertical />
      </div>
      <div className="hour-slider">
        <div className="labelAndInputContainer">
          <label className="LabelName">
            Hour: {baseTime.tz(timeZone).format("HH:mm")}
          </label>

          <input
            className="numberInput"
            type="number"
            min="0"
            max="24"
            value={hour}
            onChange={handleHourChange}
          />
        </div>

        <br />

        <input
          type="range"
          min="0"
          max="24"
          value={hour}
          onChange={handleHourChange}
        />
        <datalist id="values">
          <option value="0" label="0"></option>

          <option value="2" label="2AM"></option>
          <option value="4" label="4"></option>
          <option value="6" label="6"></option>
          <option value="8" label="8"></option>
          <option value="10" label="10"></option>
          <option value="12" label="12AM"></option>
          <option value="14" label="2PM"></option>
          <option value="16" label="4"></option>
          <option value="18" label="6"></option>
          <option value="20" label="8"></option>
          <option value="22" label="10"></option>
          <option value="24" label="12PM"></option>
        </datalist>
      </div>
      <div className="tmZone">
        <span>{timeZone}</span>
        <span>Date :- {datetimeInZone}</span>
        <button onClick={() => onRemove(timeZone)}>
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default TimeZoneItem;
