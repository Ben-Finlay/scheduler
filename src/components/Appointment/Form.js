import React, { useState } from 'react';
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";
import 'components/InterviewerList.scss';




export default function Form(props) {

 //console.log("Student Obj:", props.student)

  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState(false)

  const reset = () => {
    setStudent("");
    setInterviewer(null);
  };

  const cancel = () => {
    reset();
    props.onCancel();
  }

  const validate = () => {
    if (!student) {
      setError("Please enter a name.")
      return;
    }
    else if (!interviewer) {
      setError("Please select an interviewer.")
      return;
    }
    else {
      setError(false);
      return props.onSave(student, interviewer)
    }
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            value={student}
            type="text"
            onChange={(event) => { setStudent(event.target.value)
            if (event.target.value) {
              setError(false)
            }
          }}
            placeholder="Enter Student Name"
            data-testid="student"
          />
        </form>
        {error && (
          <section className="appointment__validation">{error}</section>
        )}
        <InterviewerList
        interviewers={props.interviewers}
        value={interviewer}
        onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={() => validate()}>Save</Button>
        </section>
      </section>
    </main>
  )
}