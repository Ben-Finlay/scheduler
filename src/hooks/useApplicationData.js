import { useEffect, useState } from "react";
import axios from "axios";

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  //Sets the Current day to the selected day
  const setDay = day => setState({ ...state, day });

  // function template for booking interviews
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }};
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      return axios.put(`api/appointments/${id}`, {interview})
      .then(() => {setState(prev => ({...prev, appointments}))})
      
    };

  //function to cancelInterviews
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
    console.log("axios ID:", id)
    return axios.delete(`api/appointments/${id}`)
    .then(() => {setState(prev => ({...prev, appointments}))})
    
    };

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
  },[]);

  return { state, setDay, bookInterview, cancelInterview };

}