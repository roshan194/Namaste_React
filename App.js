const header = React.createElement(
    "div",
    { className: "title" },
    [
      React.createElement("h1", { key: "h1" }, "Welcome to React"),
      React.createElement("h2", { key: "h2" }, "Learning React is fun!"),
      React.createElement("h3", { key: "h3" }, "Let's build something awesome."),
    ]
  );
  
  const HeaderJSX = () => (
    <div className="title">
      <h1>Welcome to React</h1>
      <h2>Learning React is fun!</h2>
      <h3>Let's build something awesome.</h3>
    </div>
  );
  
  const TitleComponent = () => (
    <h1 className="title">Hello, React!</h1>
  );
  
  const HeadingComponent = () => (
    <div>
      <TitleComponent />
      <HeaderJSX />
    </div>
  );
  
  root.render(<HeadingComponent />);
  