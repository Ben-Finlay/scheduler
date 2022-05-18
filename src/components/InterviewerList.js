import React from 'react';
import 'components/InterviewerList.scss';
import InterviewerListItem from './InterviewerListItem';


export default function InterviewerList(props) {

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
      {props.interviewers.map((p) => (
        <InterviewerListItem
          key={p.id}
          name={p.name}
          avatar={p.avatar}
          selected={p.id === props.interviewer}
          setInterviewer={()  => props.setInterviewer(p.id)}

        />
      ))}

      </ul>
    </section>

  )
}



/*
export default function DayList(props) {
  return (
    <ul>
      {props.days.map((d) => (
        <DayListItem
          key={d.id}
          name={d.name}
          spots={d.spots}
          selected={d.name === props.day}
          setDay={() => props.setDay(d.name)}
        />
      ))}
    </ul>
  );
}
*/