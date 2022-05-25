import { useState } from "react";

export default function useVisualMode(initial) {
  //states
  const [history, setHistory] = useState([initial]);

  //Function to transition through the various card types.
  function transition(mode, replace = false) {
    setHistory((prev) =>
      replace ? [...prev.slice(0, -1), mode] : [...prev, mode]
    );
  }

  //Return to previous (or go two back in case of a fail)
  function back() {
    console.log("History:", history);
    setHistory((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
  }

  return { mode: history[history.length - 1], transition, back };
}
