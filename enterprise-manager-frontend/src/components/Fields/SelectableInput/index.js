import React, { useState, useEffect, useRef } from "react";
import cuid from "cuid";

const SelectableInput = props => {
  const [ops, setOps] = useState([]);
  const [selectableValue, setSelectableValue] = useState("");
  const [isListVisible, setIsListVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(0);
  const [selectedValue, setSelectedValue] = useState("");

  const { options, fieldRef, children, onChange, ...newProps } = props;
  const listRef = useRef();
  const optionRef = useRef();

  useEffect(() => {
    document.addEventListener("mousedown", handleBlur);
    return () => {
      document.removeEventListener("mousedown", handleBlur);
    };
  }, []);

  useEffect(() => {
    if (selectableValue !== "")
      setOps(
        options.filter(
          o =>
            o.value
              .split(" ")
              .some(v =>
                v
                  .toLowerCase()
                  .startsWith(
                    selectableValue
                      .replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1")
                      .toLowerCase()
                  )
              ) ||
            o.value
              .toLowerCase()
              .match(
                selectableValue
                  .replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1")
                  .toLowerCase()
              )
        )
      );
    else setOps([]);
  }, [selectableValue, options]);

  useEffect(() => {
    setSelectedOption(0);
  }, [ops.length]);

  useEffect(() => {
    if (!isListVisible && selectedValue)
      setSelectableValue(selectedValue.value);
    // eslint-disable-next-line
  }, [isListVisible, selectedOption]);

  useEffect(() => {
    if (selectedValue !== "") onChange(selectedValue);
  }, [onChange, selectedValue]);

  useEffect(() => {
    if (optionRef.current)
      listRef.current.scrollTo(0, optionRef.current.offsetTop);
  }, [selectedOption]);

  const handleChange = e => {
    setSelectableValue(e.target.value);
    setIsListVisible(true);
  };

  const handleArrowUp = e => {
    e.preventDefault();
    if (selectedOption > 0) setSelectedOption(selectedOption - 1);
    else if (ops.length > 0) setSelectedOption(ops.length - 1);
  };

  const handleArrowDown = e => {
    e.preventDefault();
    if (selectedOption < ops.length - 1) setSelectedOption(selectedOption + 1);
    else if (ops.length > 0) setSelectedOption(0);
  };

  const handleEnter = e => {
    e.preventDefault();
    if (ops[selectedOption]) setSelectedValue(ops[selectedOption]);
    setIsListVisible(false);
  };

  const handleClick = (e, option) => {
    e.preventDefault();
    setSelectedOption(option);
    setSelectedValue(ops[option]);
    setIsListVisible(false);
  };

  const handleKeyDown = e => {
    if (e.key === "ArrowUp") handleArrowUp(e);
    else if (e.key === "ArrowDown") handleArrowDown(e);
    else if (e.key === "Enter") handleEnter(e);
  };

  const handleBlur = e => {
    if (listRef.current) {
      if (listRef.current.contains(e.target)) {
      } else {
        setIsListVisible(false);
      }
    }
  };

  return (
    <>
      <input
        type="text"
        {...newProps}
        value={selectableValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onSubmit={e => e.preventDefault()}
        onFocus={() => {
          setIsListVisible(true);
        }}
        autoComplete="off"
        ref={fieldRef}
      />
      {children}
      <div
        className="position-absolute pr-0"
        style={{
          zIndex: ops.length > 0 && isListVisible ? 1 : "auto",
          right: 0,
          top: 0
        }}>
        {ops.length > 0 && isListVisible ? (
          <button className="btn h-100 shadow-none">
            <i className={"fas fa-chevron-down text-primary"}></i>
          </button>
        ) : (
          <label
            htmlFor={props.id}
            className="btn h-100 shadow-none"
            onClick={() => setOps(options)}>
            <i
              className={"fas fa-chevron-right"}
              style={{ color: "#495057", opacity: "0.5" }}></i>
          </label>
        )}
      </div>
      {ops.length > 0 && isListVisible ? (
        <div
          className="pt-0 pb-2 px-1 position-absolute w-100 bg-white shadow-sm rounded scroller"
          style={{
            zIndex: 1,
            top: "110%",
            minHeight: "100px",
            maxHeight: "200px"
          }}
          ref={listRef}>
          <div className="list-group list-group-flush d-flex border-0">
            {ops.map((o, i) => (
              <div
                key={cuid()}
                onClick={e => handleClick(e, i)}
                ref={selectedOption === i ? optionRef : null}
                style={{ cursor: "pointer" }}
                className={`list-group-item list-group-item-action py-1.5 px-2 ${
                  selectedOption === i ? "active" : null
                }`}>
                {o.value}
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default SelectableInput;
