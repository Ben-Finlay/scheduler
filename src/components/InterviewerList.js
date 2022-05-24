import React from 'react';
import 'components/InterviewerList.scss';
import InterviewerListItem from './InterviewerListItem';
import PropTypes from 'prop-types'; 


export default function InterviewerList(props) {

  const { value, onChange, interviewers } = props;
  
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
      { interviewers.map((p) => (
        <InterviewerListItem
          key={p.id}
          name={p.name}
          avatar={p.avatar}
          selected={p.id === value}
          setInterviewer={() => onChange(p.id)}
        />
      ))}

      </ul>
    </section>

  )
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

