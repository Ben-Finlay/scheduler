//Technically works - but not very good.

// export function getAppointmentsForDay(state, day) {
//   let outputArr = [];
//   for (let dayObj of state.days) { //Iterates through the days in the in the state object
//     if (dayObj.name === day) { //checks the individual dayObj for the name of day, and checks against the day
//       for (let appt of dayObj.appointments) { //if matching, iterates through the dayObj appointment array ex. [1, 2, 3]
//         if (state.appointments[appt]) { //if one of those id's matches a state appointment key (true) then push to our outputArr that obj.
//           outputArr.push(state.appointments[appt])
//         }
//       }
//     }
//   }
//   return outputArr; //return our array of objects.
// };

//Much better.
export function getAppointmentsForDay(state, day) {
  const foundDay = state.days.find(element => element.name === day);
    if(!foundDay) {
      return [];
    }
    return foundDay.appointments.map(id => state.appointments[id])
};