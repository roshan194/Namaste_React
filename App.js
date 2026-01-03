import React from "react";
import ReactDOM from "react-dom/client";

const Parent = React.createElement(
  "div",
  { id: "parent" },

  React.createElement("div", { id: "child" }, [
    React.createElement("h1", { key: "child-h1" }, "I am h1 tag inside child div"),
    React.createElement("h2", { key: "child-h2" }, "I am h2 tag inside child div"),
  ]),

  React.createElement("div", { id: "sibling" }, [
    React.createElement("h1", { key: "sib-h1" }, "I am h1 tag inside sibling div"),
    React.createElement("h2", { key: "sib-h2" }, "I am h2 tag inside sibling div"),
  ])
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(Parent);
