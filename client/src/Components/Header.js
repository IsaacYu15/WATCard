import React from "react";
import "./Header.css";

function Header(props) {
  return (
    <div id="header">
      <h3>current balance</h3>
      <h1>${props.data[0] + props.data[1] + props.data[2]}</h1>

      <div id="stats">
        <div id="starting_amount">
          <h3>starting amount</h3>
          <h2>${props.data[0]}</h2>
        </div>
        <div id="added_amount">
          <h3>amount added</h3>
          <h2>${props.data[1]}</h2>
        </div>
        <div id="spent_amount">
          <h3>amount spent</h3>
          <h2>${props.data[2] * -1}</h2>
        </div>
      </div>
    </div>
  );
}

export default Header;
