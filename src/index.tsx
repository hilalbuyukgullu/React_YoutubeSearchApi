import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route } from 'react-router-dom'
//page
import Home from './Home';
import VideoDetail from './VideoDetail';

//inc
import Header from './inc/Header';

//css
import 'semantic-ui-css/semantic.min.css';
import "./css/site.css";


const router =
  <Router>
    <Header />
    <Route path="/" exact component={Home} />
    <Route path="/videodetail" exact component={VideoDetail} />
  </Router>

ReactDOM.render(router, document.getElementById('root'));


reportWebVitals();
