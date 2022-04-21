import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Planning from './Planning';
import AdmForm from './AdmForm';
import{BrowserRouter as Router, Routes, Route} from 'react-router-dom';


ReactDOM.render(

  <Router>
    <Routes>
    <Route path="/" element={<Planning/>} />
    <Route path="/admform" element={<AdmForm/>} />

    </Routes>
  </Router>
  ,
  document.getElementById('root')
);