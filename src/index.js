import React from 'react';
import ReactDOM from 'react-dom';
import CommentBox from './CommentBox';
import CardForm from './CardForm';
import Routes from './Routes';

import {
    BrowserRouter as Router,
    Route,
    browserHistory,
    Link
} from 'react-router';


ReactDOM.render(
  <Routes/>,
  document.getElementById('root')
);
