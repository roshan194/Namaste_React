const Parent = React.createElement("div", {id: "parent"}, 
    React.createElement("div", {id: "child"},[ 
        React.createElement("h1", {}, "I am h1 tag inside child div"),
        React.createElement("h2", {}, "I am h2 tag inside child div")
    ]), 
    React.createElement("div", {id: "sibling"},[ 
        React.createElement("h1", {}, "I am h1 tag inside sibling div"),
        React.createElement("h2", {}, "I am h2 tag inside sibling div")
    ])
);

console.log(Parent);// To see the React element structure in the console (object)
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(Parent);