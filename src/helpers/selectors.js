
//Finds the Appointments for the Day
export function getAppointmentsForDay(state, day) {
  const foundDay = state.days.find((element) => element.name === day);
  if (!foundDay) {
    return [];
  }

  return foundDay.appointments.map((id) => state.appointments[id]);
}

//Gets the Interviewers for the Day
export function getInterviewersForDay(state, day) {
  const foundInt = state.days.find((e) => e.name === day);
  if (!foundInt) {
    return [];
  }

  return foundInt.interviewers.map((id) => state.interviewers[id]);
}

//Gets the Individual Student and Interviewer for the time slot.
export function getInterview(state, interview) {
  const output = {};
  if (interview) {
    output["student"] = interview.student;
    output["interviewer"] = state.interviewers[interview.interviewer];
  } else {
    return null;
  }
  return output;
}
