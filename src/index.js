import React from "react";
import { render } from "react-dom";

function Hi() {
  return <p>HI</p>;
}

render(<Hi />, document.getElementById("app"));
