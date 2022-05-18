import React from 'react';
import 'components/Appointment/styles.scss';

import Header from './Header';
import Empty from './Empty';
import Show from './Show';
import Confirm from './Confirm';
import Status from './Status';
import Error from './Error';




export default function Appointment(props) {


  return (
    
    <article className="appointment">
    < Header time={props.time}/>
    {props.interview ?
    <Show {...props.interview} />
    :
    <Empty />
    }


    </article>
  )

}
