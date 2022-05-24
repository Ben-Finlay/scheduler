import React from "react";

import DayListItem from "./DayListItem";


export default function DayList(props) {
  console.log("daylist props:", props)
  return (
    <ul>
      {props.days.map((d) => (
        <DayListItem
          key={d.id}
          name={d.name}
          spots={d.spots}
          selected={d.name === props.value}
          setDay={() => props.setDay(d.name)}
        />
      ))}
    </ul>
  );
}




