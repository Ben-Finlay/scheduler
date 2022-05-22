import { useState } from 'react';

export default function useVisualMode(initial) {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  //transition
  function transition(mode, replace = false) {
    if (replace) {
      setMode(mode)
      setHistory(prev => [...prev.slice(0, history.length -1), mode]);
    } else {
      setMode(mode)
      setHistory([...history, mode])
    }
  }

  //go back
  function back() {
    if (history.length >= 2) {
      setHistory(prev => [...prev.slice(0, history.length -1)]);
      setMode(history[history.length -2])
    }
  }


  return { mode, transition, back };


}