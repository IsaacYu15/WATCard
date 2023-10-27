import React from "react";
import "./Header.css";

function Header(props) {
  return (
    <div id="header">
      <h1>STARTING: {props.data[0]}</h1>
      <h1>TOTAL ADDED IN:{props.data[1]}</h1>
      <h1>TOTAL TRANSACTIONS: {props.data[2]}</h1>
    </div>
  );
}

export default Header;
