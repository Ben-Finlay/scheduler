import { useEffect, useState } from "react";
import axios from "axios";

//Handles a lot of the functionality of our App
export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  //Updates the spots left shown on by the day if appt's are added or removed.
  const updateSpots = function (state, appointments) {
    const id = state.days.findIndex((d) => d.name === state.day);
    const getDay = state.days[id];

    let spots = 0;
    for (const apptId of getDay.appointments) {
      if (appointments[apptId].interview === null) {
        spots++;
      }
    }

    const updatedDay = { ...getDay, spots: spots };
    const updatedDays = [...state.days];
    updatedDays[id] = updatedDay;

    return updatedDays;
  };

  //Sets the Current day to the selected day
  const setDay = (day) => setState({ ...state, day });

  //Axios constants to get API data about the schedule
  const getDays = axios.get("api/days");
  const getAppts = axios.get("api/appointments");
  const getInterviewers = axios.get("api/interviewers");

  //Axios Calls
  useEffect(() => {
    Promise.all([getDays, getAppts, getInterviewers]).then((values) => {
      setState((prev) => ({
        ...prev,
        days: values[0].data,
        appointments: values[1].data,
        interviewers: values[2].data,
      }));
    });
  }, []);

  // function for booking interviews
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios.put(`api/appointments/${id}`, { interview }).then(() => {
      const days = updateSpots(state, appointments);
      setState((prev) => ({ ...prev, appointments, days }));
    });
  }

  //function to cancelInterviews
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.delete(`api/appointments/${id}`).then(() => {
      const days = updateSpots(state, appointments);
      setState((prev) => ({ ...prev, appointments, days }));
    });
  }

  return { state, setDay, bookInterview, cancelInterview };
}
