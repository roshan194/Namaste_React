import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";
const Logo = () => {
    return (
        <img 
            src="https://example.com/logo.png" 
            alt="App Logo" 
        />
    );
}

const SearchBar = () => {
    return (
        <input 
            type="text" 
            placeholder="Search..." 
        />
    );
}

const UserIcon = () => {
    return (
        <img 
            src="https://example.com/user-icon.png" 
            alt="User Icon" 
        />
    );
}
const Header = () => {
    return (
        <div className="header">
            <Logo />
            <SearchBar />
            <UserIcon />
            <h1>Welcome to Our Application</h1>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Header />);