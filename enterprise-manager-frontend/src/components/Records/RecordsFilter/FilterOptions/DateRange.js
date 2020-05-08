import React, { useState, useEffect, useRef, useCallback } from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import "./styles.scss";
import InputGroup from "../../../InputGroup";
import { Input, Icon } from "semantic-ui-react";
import moment from "moment";
import { formatDate, parseDate } from "react-day-picker/moment";

const DateRange = () => {
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const toRef = useRef();
  const fromRef = useRef();
  const dayRef = useRef();
  useEffect(() => {
    if (!from) {
      return;
    }
    if (moment(to).diff(moment(from), "months") < 2) {
      if (dayRef.current) dayRef.current.showMonth(from);
    }
  }, [to]);

  return (
    <div className="InputFromTo">
      <DayPickerInput
        value={from}
        formatDate={formatDate}
        parseDate={parseDate}
        style={{ zIndex: 10 }}
        component={React.forwardRef((props, ref) => (
          <Input
            size={"small"}
            ref={ref}
            {...props}
            icon={<Icon name={"calendar"} />}
          />
        ))}
        inputProps={{ ref: fromRef }}
        placeholder="MM/DD/YYYY"
        dayPickerProps={{
          selectedDays: [from, { from, to }],
          disabledDays: { after: to },
          toMonth: to,
          modifiers: { start: from, end: to },
          numberOfMonths: 2,
          onDayClick: () => {
            toRef.current.focus();
          },
          containerProps: { style: { zIndex: 2 } },
        }}
        onDayChange={async day => {
          await setFrom(day);
          fromRef.current.focus();
        }}
      />
      {" - "}
      <span className="InputFromTo-to">
        <DayPickerInput
          inputProps={{ ref: toRef }}
          value={to}
          onDayChange={async day => {
            await setTo(day);
            toRef.current.focus();
          }}
          formatDate={formatDate}
          parseDate={parseDate}
          style={{ zIndex: 10 }}
          component={React.forwardRef((props, ref) => (
            <Input
              size={"small"}
              ref={ref}
              {...props}
              icon={<Icon name={"calendar"} />}
            />
          ))}
          placeholder="MM/DD/YYYY"
          dayPickerProps={{
            ref: dayRef,
            selectedDays: [from, { from, to }],
            disabledDays: { before: from },
            modifiers: { start: from, end: to },
            month: from,
            fromMonth: from,
            numberOfMonths: 2,
          }}
        />
      </span>
    </div>
  );
};

export default React.memo(DateRange);
