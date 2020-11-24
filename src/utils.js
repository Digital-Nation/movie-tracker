import React, { useState } from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'


export const getYear = date => {
  if (!date || date.length < 4) return 'N/A';
  return date.substr(0, 4);
};

export const MovieLength = num => {
  const hours = Math.floor(num / 60)
  const minutes = num % 60
  return `${hours}h:${minutes}min`
}

export const STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export const generateConfig = (method, body) => {
  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  };
  if (body) {
    config.body = JSON.stringify(body);
  }
  return config;
};

export function SetDate() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [startDate, setStartDate] = useState(new Date());
  const ExampleCustomInput = ({ value, onClick }) => (
    <button className="example-custom-input" onClick={onClick}>
      {value}
    </button>
  );
  return (
    <DatePicker 
    closeOnScroll={true} 
    selected={startDate} 
    onChange={date => setStartDate(date)}
    customInput={<ExampleCustomInput />}
    popperClassName="some-custom-class"
      popperPlacement="top-end"
    popperModifiers={{
        offset: {
          enabled: true,
          offset: "95px, 25px"
        },
        preventOverflow: {
          enabled: true,
          escapeWithReference: false,
          boundariesElement: "viewport"
        }
      }}
     />
  );
};