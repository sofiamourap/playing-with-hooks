import React, { useRef, useImperativeHandle } from "react";
import classes from "./Input.module.css";

/* The useImperativeHandle hook works in the similar phase of useRef hook 
but only it allows us to modify the instance that is going to be passed with 
the ref object which provides a reference to any DOM element. */

//React.forwardRef a method to which we pass our component function. forwardRef returns a React component, but one that is allow to be bind to a ref
const Input = React.forwardRef(
  ({ isValid, label, id, value, onChange, onBlur, type }, ref) => {
    const inputRef = useRef();

    const activate = () => {
      //this method is available on the input DOM object to which I can access through the ref
      inputRef.current.focus();
    };

    //expect 2 params. The first is the ref The second is a function that should return an object that contain all the data you will be able to use from outside
    useImperativeHandle(ref, () => {
      return {
        focus: activate,
      };
    });

    return (
      <div
        className={`${classes.control} ${
          isValid === false ? classes.invalid : ""
        }`}
      >
        <label htmlFor={id}>{label}</label>
        <input
          ref={inputRef}
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
      </div>
    );
  }
);

export default Input;
