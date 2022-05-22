import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";

import DayList from "./DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";


//Application Component
export default function Application(props) {

//Use States
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

//Calls Helper Function to get Array of Appointment Objects for the Day.
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day);

//Sets the Current day to the selected day
  const setDay = day => setState({ ...state, day });
 
//Axios constants to get API data about the schedule
  const getDays = axios.get('api/days')
  const getAppts = axios.get('api/appointments')
  const getInterviewers = axios.get('api/interviewers')



  //Axios Calls
  useEffect(() => {
    Promise.all([getDays, getAppts, getInterviewers])
      .then((values) => {
        setState(prev => ({ ...prev, days: values[0].data, appointments: values[1].data, interviewers: values[2].data }));
      });
  });

//HTML Output
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

        {dailyAppointments.map(appointment => {
          const interview = getInterview(state, appointment.interview);
          return (
            <Appointment
              key={appointment.id}
              id={appointment.id}
              time={appointment.time}
              interview={interview}
              interviewers={dailyInterviewers}
              
            />
          )
        })}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
