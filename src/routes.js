import React from 'react';
import { Switch, Route } from "react-router-dom";

import Home from './components/Home/Home';
import About from './components/About/About';
import Blog from './components/Blog/Blog';

export default(
    <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/About" component={About}/>
        <Route exact path="/Blog" component={Blog}/>
        <Route path="*"
            render={() => (
                <div>
                    <p>Not Found Foo!</p>
                </div>
            )}
        />
    </Switch>
)



// <Route exact path="/Videos" component={Videos}/>