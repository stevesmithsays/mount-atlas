// IF JUST RENDERING JSX NO STATE NEEDED.
// STATE IS NEEDED USE CLASS BASED COMPONENT.
import React from "react";
import { Link } from 'react-router-dom';

const Header = () => (
    <header className="App-header">
        <h1 className="App-title">Welcome to React</h1>
        <div>
            <Link to="/">
                <p>Home</p> 
            </Link>
            <Link to="/login">
                <p>Login</p> 
            </Link>
        </div>
    </header>
)


export default Header;
