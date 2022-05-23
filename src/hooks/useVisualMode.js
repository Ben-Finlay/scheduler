import { useState } from 'react';

export default function useVisualMode(initial) {

  //states
  const [history, setHistory] = useState([initial]);

  //transition
  function transition(mode, replace = false) {

    setHistory(prev => replace ? [...prev.slice(0, -1), mode] : [...prev, mode])
  }
 
  //go back
  function back() {
    console.log("History:", history)
    setHistory(prev => (prev.length > 1 ? prev.slice(0, -1) : prev))
  }

  
  return { mode: history[history.length -1], transition, back };



}