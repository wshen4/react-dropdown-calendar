/***  examples/src/index.js ***/
import React from "react";
import { render } from "react-dom";
import ReactDropdownCalendar from "../../src";
const App = () => (
  <ReactDropdownCalendar getSelectedDate={data => console.log(data)} />
);
render(<App />, document.getElementById("root"));
