# react-dropdown-calendar

A simply beautiful dropdown date picker for React.js

## Getting started

### Installation

`npm i react-dropdown-calendar`

### Usage

Here's an example of basic usage:

```js
import React from "react";
import { render } from "react-dom";
import ReactDropdownCalendar from "../../src";
const App = () => (
  <ReactDropdownCalendar getSelectedDate={data => console.log(data)} />
);
render(<App />, document.getElementById("root"));
```

#### Props

| Prop name       | Description                                                                                                                                      | Example values                                                                        |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------- |
| getSelectedDate | The callback function for parent componenet to get the selected date.                                                                            | `getSelectedDate={data => console.log(data)}`                                         |
| monthYearRange  | (optional) An object with two properties: from and to. The values should be Javascript Dates. To set the start Month/Year and the end Month/Year | `monthYearRange={from: new Date(2017, 0), to: new Date(2018, 9)}`                     |
| defaultValues   | (optional) An array of Javascript Dates. To set a set of selectable dates                                                                        | `defaultValues={[new Date(2017, 0, 3), new Date(2018, 9, 1), new Date(2018, 10, 2)]}` |
