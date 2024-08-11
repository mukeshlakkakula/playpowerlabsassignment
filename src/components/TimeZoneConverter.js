import React, { useState, useContext } from "react";
import moment from "moment-timezone";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimeZoneItem from "./TimeZoneItem";
import { hourStateContext } from "./ContextReducer";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./TimeZoneConverter.css";

const TimeZoneConverter = () => {
  const { baseTime, updateState } = useContext(hourStateContext);
  const [timeZones, setTimeZones] = useState([
    "UTC",
    "Asia/Kolkata",
    "America/New_York",
  ]);
  const [newTimeZone, setNewTimeZone] = useState("");

  const addTimeZone = () => {
    if (newTimeZone && !timeZones.includes(newTimeZone)) {
      setTimeZones([...timeZones, newTimeZone]);
      setNewTimeZone("");
    }
  };

  const removeTimeZone = (zone) => {
    setTimeZones(timeZones.filter((tz) => tz !== zone));
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedTimeZones = Array.from(timeZones);
    const [movedItem] = reorderedTimeZones.splice(result.source.index, 1);
    reorderedTimeZones.splice(result.destination.index, 0, movedItem);

    setTimeZones(reorderedTimeZones);
  };

  return (
    <div className="time-zone-converter">
      <h1 style={{ textAlign: "center", fontSize: "2rem" }}>
        Timezone Converter
      </h1>
      <div className="dateAndZoneContainer">
        <DatePicker
          selected={baseTime.toDate()}
          onChange={(date) => updateState(moment(date))}
          dateFormat="P"
          className="DateFormatter"
        />{" "}
        <div className="actions addtimeZoneContainer">
          <select
            className="setTimeZoneOptions"
            value={newTimeZone}
            onChange={(e) => setNewTimeZone(e.target.value)}
          >
            <option value="">Select a timezone</option>
            {moment.tz.names().map((tz) => (
              <option key={tz} value={tz}>
                {tz}
              </option>
            ))}
          </select>
          <button onClick={addTimeZone} className="AddtimeZoneBtn">
            Add Timezone
          </button>
        </div>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="timezones">
          {(provided) => (
            <div
              className="time-zones-list"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {timeZones.map((tz, index) => (
                <Draggable key={tz} draggableId={tz} index={index}>
                  {(provided) => (
                    <TimeZoneItem
                      timeZone={tz}
                      time={baseTime}
                      onRemove={removeTimeZone}
                      provided={provided}
                    />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default TimeZoneConverter;
