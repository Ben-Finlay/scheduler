import React from 'react';
import 'components/Appointment/styles.scss';
import useVisualMode from 'hooks/useVisualMode';
//import { selectors } from ""
import Header from './Header';
import Empty from './Empty';
import Show from './Show';
import Form from './Form';
import Confirm from './Confirm';
import Status from './Status';
import Error from './Error';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETE = "DELETE";
const CONFIRM = "CONFIRM"
const EDIT = "EDIT"
const ERR_SAVE = "ERR_SAVE"
const ERR_DELETE = "ERR_DELETE"



export default function Appointment(props) {
  //console.log("index props:", props)
  
  console.log("Students Name:", props.interview)

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
    );

    //Passed to Form to capture name, and interviewer and pass them to props.onSave
    function save(name, interviewer) {
      const interview = {
        student: name,
        interviewer  
      };
      transition(SAVING)
      props.bookInterview(props.id, interview)
      .then(() => { 
        transition(SHOW)
        })
      .catch(() => transition(ERR_SAVE, true))      
  }

  //handles Delete
  function onDelete() {
    transition(DELETE, true)
  
    props.cancelInterview(props.id)
    .then(() => {
      transition(EMPTY)
    })
    .catch(() => transition(ERR_DELETE, true))  
  }

  //handles Confirm
  function onConfirm() {
    transition(CONFIRM)
  }

  function edit() {
    transition(EDIT)
  }

  function close() {
    back()
  }

  //HTML
  return (

    <article className="appointment">
      < Header time={props.time} />

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      
      {mode === SHOW && (
        <Show
          student={props.interview && props.interview.student} 
          interviewer={props.interview && props.interview.interviewer}
          onDelete={onConfirm}
          onEdit={edit}
          id={props.id}
        />
      )}
      
      {mode === CREATE && (
        < Form
          interviewers={props.interviewers} onCancel={() => back()}
          onSave={save}
          />
      )}

      {mode === EDIT && 
        < Form 
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}

          />
      }

      {mode === CONFIRM &&
        < Confirm 
        //message="Are you sure?"
        onConfirm={onDelete}
        onCancel={back}
        />
      }

      {mode === SAVING && 
        < Status message="Saving..." />
      }
      
      {mode === DELETE &&
        < Status message="Deleting..." />
      }

      {mode === ERR_SAVE && 
        < Error message="Error Saving" onClose={close} />
      }

      {mode === ERR_DELETE && 
        < Error message="Error Deleting" onClose={close} />
      }

    </article>
  )

}
