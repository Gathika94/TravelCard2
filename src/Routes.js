
import React, { Component } from 'react';
import axios from 'axios';



import CardForm from './CardForm';
import HaltForm from './HaltForm';
import TravelForm from './TravelForm';


import {
    Router, Route, browserHistory
} from 'react-router';


class Routes extends Component{



    render(){

        return (
            <Router history={browserHistory} >
                <div>
                    <Route  path='/' component={TravelForm}/>
                    <Route  path='/cards' component={CardForm}/>
                    <Route  path='/halts' component={HaltForm}/>
                </div>
            </Router>
        )
    }
}

export default Routes;