import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";

import DayList from "./DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay } from "helpers/selectors";


export default function Application(props) {
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const setDay = day => setState({ ...state, day });
  // const setDays = days => setState(prev => ({ ...prev, days }));

  const getDays = axios.get('api/days')
  const getAppts = axios.get('api/appointments')
  const getInterviewers = axios.get('api/interviewers')


  useEffect(() => {
  Promise.all([getDays, getAppts, getInterviewers])
  .then((values) => {
    setState(prev => ({...prev, days: values[0].data, appointments: values[1].data, interviewers: values[2].data }));
  });
});
  

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
      
        {dailyAppointments.map(appointment =>
          <Appointment
          key={appointment.id}
          {...appointment}
          />
        )}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
