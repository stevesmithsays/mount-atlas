// IF JUST RENDERING JSX NO STATE NEEDED.
// STATE IS NEEDED USE CLASS BASED COMPONENT.
import React from "react";
import { Link } from 'react-router-dom';


const Header = () => (
    <header className="App-header">
        <h1 className="App-title">Mount Atlas</h1>
        <div>
            <nav>
                <ul>
                    <Link to="/" className="crap-link">Home</Link>
                    <br/>
                    <Link to="/login" className="crap-link">Login</Link>                
                </ul>
            </nav>    
        </div>
    </header>
)


export default Header;
