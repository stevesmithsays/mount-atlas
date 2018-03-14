import React from 'react';
import { Switch, Route } from "react-router-dom";

import Home from './components/Home/Home';
import About from './components/About/About';
import Blog from './components/Blog/Blog';
import Videos from './components/Videos/Videos';
import Product from './components/Product/Product';
import Cart from "./components/Cart/Cart";

export default(
    <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/About" component={About}/>
        <Route exact path="/Blog" component={Blog}/>
        <Route exact path="/Videos" component={Videos}/>
        <Route exact path ="/Product/:id" component={Product}/>
        <Route exact path ="/Cart" component={Cart}/>
        <Route path="*"
            render={() => (
                <div>
                    <p>Not Found Foo!</p>
                </div>
            )}
        />
    </Switch>
)