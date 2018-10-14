import React, { Component } from "react";
import "./style.css";

//props:
//getSelectedDate!: callback function
//monthYearRange?: { from: Date, to: Date}
//defaultValues?: [Date]

class Calendar extends Component {
  state = {
    selectedDate: null,
    weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    tableToggle: false,
    currentMonth: new Date().getMonth(),
    currentYear: new Date().getFullYear().toString(),
    days: [[]]
  };

  componentDidMount() {
    this.setDays();
    document.addEventListener("mousedown", this.handleClick, false);
  }

  componentWillUnmount() {
    document.addEventListener("mousedown", this.handleClick, false);
  }

  handleClick = e => {
    if (this.node.contains(e.target)) {
      return;
    }

    this.setState({ tableToggle: false });
  };

  mlist = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  handleLabelClick = () => {
    const tableToggle = !this.state.tableToggle;
    this.setState({ tableToggle });
  };

  setDays = () => {
    let firstIndex = new Date(
      this.state.currentYear,
      this.state.currentMonth,
      1
    ).getDay();
    const days = [];
    const numberOfDays = new Date(
      this.state.currentYear,
      this.state.currentMonth - 1,
      0
    ).getDate();

    const row = [];

    for (let i = 0; i < firstIndex; i++) {
      row.push({
        value: new Date(
          this.state.currentYear,
          this.state.currentMonth,
          i - firstIndex + 1
        ).getDate(),
        type: "invalid"
      });
    }

    for (let i = 1; i <= numberOfDays; i++) {
      row.push({ value: i, type: "valid" });
      firstIndex++;

      if (firstIndex === 7) {
        firstIndex = 0;
        days.push([...row]);
        row.length = 0;
      }
    }

    if (row.length > 0 || days.length < 6) {
      let restDay = 1;
      for (let i = row.length; i < 7; i++) {
        row.push({ value: restDay++, type: "invalid" });
      }
      days.push([...row]);

      if (days.length < 6) {
        const tmp = [];
        for (let i = 0; i < 7; i++) {
          tmp.push({ value: restDay++, type: "invalid" });
        }
        days.push([...tmp]);
      }
    }

    this.utilUpdateValidSelection(days);

    this.setState({ days });
  };

  handleMonthSelect = async forward => {
    if (forward) {
      let currentMonth = this.state.currentMonth + 1;
      let currentYear = this.state.currentYear;
      if (currentMonth === 12) {
        currentMonth = 0;
        currentYear = (parseInt(currentYear) + 1).toString();
      }
      await this.setState({ currentMonth, currentYear });
    } else {
      let currentMonth = this.state.currentMonth - 1;
      let currentYear = this.state.currentYear;
      if (currentMonth === -1) {
        currentMonth = 11;
        currentYear = (parseInt(currentYear) - 1).toString();
      }
      await this.setState({ currentMonth, currentYear });
    }
    this.setDays();
  };

  handleDateSelect = async day => {
    if (!this.props.getSelectedDate) {
      console.error("Error: Missing props getSelectedDate.");
      return;
    }

    const date = new Date(this.state.currentYear, this.state.currentMonth, day);

    await this.setState({ selectedDate: date, tableToggle: false });
    await this.props.getSelectedDate(this.state.selectedDate);
  };

  utilCheckDateRange = () => {
    if (
      !this.props.monthYearRange ||
      !this.props.monthYearRange.from ||
      !this.props.monthYearRange.to
    )
      return "noProps";

    const tmp = new Date(this.state.currentYear, this.state.currentMonth);
    if (tmp <= this.props.monthYearRange.from) return "smaller";
    if (tmp >= this.props.monthYearRange.to) return "larger";

    return "inRange";
  };

  utilUpdateValidSelection = days => {
    if (!this.props.defaultValues) return "noProps";

    const set = new Set();

    for (let i = 0; i < this.props.defaultValues.length; i++) {
      const date = this.props.defaultValues[i];
      set.add(
        date.getFullYear().toString() +
          "-" +
          date.getMonth().toString() +
          date.getDate().toString()
      );
    }

    for (let i = 0; i < days.length; i++) {
      for (let j = 0; j < days[0].length; j++) {
        if (days[i][j].type === "invalid") continue;
        const date =
          this.state.currentYear +
          "-" +
          this.state.currentMonth +
          days[i][j].value.toString();
        if (!set.has(date)) {
          days[i][j].type = "invalid";
        }
      }
    }
  };

  utilDisplayDate = () => {
    const date = this.state.selectedDate;
    return (
      this.mlist[date.getMonth()] +
      " " +
      date.getDate() +
      ", " +
      date.getFullYear()
    );
  };

  render() {
    const { days } = this.state;
    return (
      <React.Fragment>
        <div
          className={
            this.state.selectedDate === null
              ? "rdcLabel rdcLabelUnselected"
              : "rdcLabel rdcLabelSelected"
          }
          onClick={this.handleLabelClick}
        >
          {this.state.selectedDate
            ? this.utilDisplayDate(this.state.selectedDate)
            : "Select Date"}
        </div>
        <div
          className={
            this.state.tableToggle
              ? "rdcContainer rdcShow"
              : "rdcContainer rdcHide"
          }
          ref={node => (this.node = node)}
        >
          <div className="rdcPicker">
            <span
              className="arrow"
              style={{
                float: "left",
                cursor: "pointer",
                userSelect: "none",
                visibility:
                  this.utilCheckDateRange() === "smaller" ? "hidden" : "visible"
              }}
              onClick={() => this.handleMonthSelect(false)}
            >
              {"<"}
            </span>
            <span style={{ userSelect: "none" }}>
              {this.mlist[this.state.currentMonth] +
                " " +
                this.state.currentYear}
            </span>
            <span
              className="arrow"
              style={{
                float: "right",
                cursor: "pointer",
                userSelect: "none",
                visibility:
                  this.utilCheckDateRange() === "larger" ? "hidden" : "visible"
              }}
              onClick={() => this.handleMonthSelect(true)}
            >
              {">"}
            </span>
          </div>
          <table className="rdcTable">
            <thead style={{ backgroundColor: "#559FFF" }}>
              <tr>
                {this.state.weekdays.map(day => (
                  <th key={day} className="rdcHeader">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {days.map(row => (
                <tr key={days.indexOf(row)}>
                  {row.map(day => (
                    <td
                      key={day.value}
                      className={
                        day.type === "valid"
                          ? "rdcBody rdcBodyCurrent"
                          : "rdcBody rdcNoneCurrent"
                      }
                      onClick={() => {
                        if (day.type !== "valid") return;
                        return this.handleDateSelect(day.value);
                      }}
                    >
                      {day.value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}

export default Calendar;
