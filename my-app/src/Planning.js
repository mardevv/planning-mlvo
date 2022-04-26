import React from 'react';
import moment from "moment";
import Axios from "axios";
import 'moment/locale/fr'
import {useState, useEffect} from 'react';
import './style.css';
import Button from 'react-bootstrap/Button';

import nextbtn from './img/next-btn.png';
import precbtn from './img/prec-btn.png';
import logo from './img/mlvo-logo.png';


function Planning() {

  const [cWeek, setCWeek] = useState(0);
  const [cDay, setCDay] = useState(0);
  const [showConsRef, setShowConsRef] = useState(false);
  const [showConsRefBut, setShowConsRefBut] = useState("Afficher Conseillers");

  const [showEvenExt, setShowEvenExt] = useState(false);
  const [showEvenExtBut, setShowEvenExtBut] = useState("Afficher Evenements EXTERNES");

  const [eventList, setEventList] = useState([]);



  

  let weekDays = [
    moment().isoWeekday((1+cWeek)).format("ddd DD MMM"),
    moment().isoWeekday(2+cWeek).format("ddd DD MMM"),
    moment().isoWeekday(3+cWeek).format("ddd DD MMM"),
    moment().isoWeekday(4+cWeek).format("ddd DD MMM"),
    moment().isoWeekday(5+cWeek).format("ddd DD MMM"),
    moment().isoWeekday(6+cWeek).format("ddd DD MMM"),
  ];

  let weekDayResponsive = moment().isoWeekday(1+cDay).format("ddd DD MMM");

  let today = moment().format("ddd DD MMM");
  console.log(today);

  const nextDay = () =>{
    setCDay(cDay + 1);
  }

  const precDay = () =>{
    setCDay(cDay - 1);
  }

  const nextWeek = () =>{
    setCWeek(cWeek + 7);
  }

  const precWeek = () =>{
    setCWeek(cWeek - 7);
  }

  const handleConsRef = () => {

    if (showConsRef === false) {
      setShowConsRef(true);
      setShowConsRefBut("Masquer Conseillers")
    }
    else{
      setShowConsRef(false);
      setShowConsRefBut("Afficher Conseillers")
    }

  }

  const handleEvenExt = () =>{

    if (showEvenExt === true) {
      setShowEvenExt(false);
      setShowEvenExtBut("Afficher Evenement EXTERNES");
    }
    else {
      setShowEvenExt(true);
      setShowEvenExtBut("Afficher Evenement INTERNES")
    }
  }

  useEffect(() => {

    Axios.get('https://mlvo-planning.herokuapp.com/read').then((response) => {
      setEventList(response.data);
    })

  });

  useEffect(() => {
    if(eventList){
    eventList.map((l)=>{
      console.log(moment(l.eventDate, "DD-MM-YYYY").format("ddd DD MMM"));
    });
  }
  },[eventList]);



  return (
    <div className="App">



    <div id="buttonsCont">
      <img className="buttons" onClick={precWeek} src={precbtn}/>
      <Button className="buttonstxt" variant="outline-success" onClick={handleConsRef}>{showConsRefBut}</Button>
      <button className="buttonstxt" onClick={handleEvenExt}>{showEvenExtBut}</button>
      <img className="buttons" onClick={nextWeek} src={nextbtn}/>
    </div>

    <div id="backtable">

      <table className="table table-bordered text-center">
        <tbody>
          {
        weekDays.map((wD) => {
    return (
    <tr>

      {today == wD ? <td className="today">{wD}</td> : <td className="daysWeek">{wD}</td>}
      
      {showEvenExt && eventList ? 
      
      eventList.map((list) => {
        return (moment(list.eventDate, "DD-MM-YYYY").format("ddd DD MMM") === wD && list.eventExt === true && list.eventMom === "Matin" &&
          <td className="eventsMatin">
          <p className="eventName">{list.eventName}</p>
          {list.eventDescr !== "" && <p className="eventDescrip">{list.eventDescr}</p>}
          <p className="eventHour">{list.eventHour}</p>
          <p className="eventPlace">{list.eventPlace}</p>
          {list.eventAddr ? <p className="eventAddr">{list.eventAddr}</p> : ""}
          {showConsRef ? <p className="consref">{list.eventCons}</p> : "" }
        </td>
        );
      })
      
      :
      
      eventList.map((list) => {
        return (moment(list.eventDate, "DD-MM-YYYY").format("ddd DD MMM") === wD && list.eventExt === false && list.eventMom === "Matin" &&
          <td className="eventsMatin">
            {list.eventTheme === "emploi" && <h4 className="eventTheme emploi">{list.eventTheme}</h4>}
            {list.eventTheme === "mobilité" && <h4 className="eventTheme mobilite">{list.eventTheme}</h4>}
            {list.eventTheme === "citoyenneté" && <h4 className="eventTheme citoy">{list.eventTheme}</h4>}
            {list.eventTheme === "logement" && <h4 className="eventTheme logement">{list.eventTheme}</h4>}
            {list.eventTheme === "santé" && <h4 className="eventTheme sante">{list.eventTheme}</h4>}
            {list.eventTheme === "sport" && <h4 className="eventTheme sport">{list.eventTheme}</h4>}
            {list.eventTheme === "culture" && <h4 className="eventTheme culture">{list.eventTheme}</h4>}
            {list.eventTheme === "infos" && <h4 className="eventTheme infos">{list.eventTheme}</h4>}
          <p className="eventName">{list.eventName}</p>
          {list.eventDescr !== "" && <p className="eventDescrip">{list.eventDescr}</p>}
          <p className="eventHour">{list.eventHour}</p>
          <p className="eventPlace">{list.eventPlace}</p>
          {list.eventAddr ? <p className="eventAddr">{list.eventAddr}</p> : ""}
          {showConsRef ? <p className="consref">{list.eventCons}</p> : "" }
        </td>
        );
      })
      }

{showEvenExt ? 
      
      eventList.map((list) => {
        return (moment(list.eventDate, "DD-MM-YYYY").format("ddd DD MMM") === wD && list.eventExt === true && list.eventMom === "Aprem" &&
          <td className="eventsAprem"> 
          <p className="eventName">{list.eventName}</p>
          {list.event_descrip !== "" && <p className="eventDescrip">{list.eventDescr}</p>}
          <p className="eventHour">{list.eventHour}</p>
          <p className="eventPlace">{list.eventPlace}</p>
          {list.eventAddr ? <p className="eventAddr">{list.eventAddr}</p> : ""}
          {showConsRef ? <p className="consref">{list.eventCons}</p> : "" }
        </td>
        );
      }) 
      
      :
      
      eventList.map((list) => {
        return (moment(list.eventDate, "DD-MM-YYYY").format("ddd DD MMM") === wD && list.eventExt === false && list.eventMom === "Aprem" &&
          <td className="eventsAprem"> 
          {list.eventTheme === "emploi" && <h4 className="eventTheme emploi">{list.eventTheme}</h4>}
          {list.eventTheme === "mobilité" && <h4 className="eventTheme mobilite">{list.eventTheme}</h4>}
          {list.eventTheme === "citoyenneté" && <h4 className="eventTheme citoy">{list.eventTheme}</h4>}
          {list.eventTheme === "logement" && <h4 className="eventTheme logement">{list.eventTheme}</h4>}
          {list.eventTheme === "santé" && <h4 className="eventTheme sante">{list.eventTheme}</h4>}
          {list.eventTheme === "sport" && <h4 className="eventTheme sport">{list.eventTheme}</h4>}
          {list.eventTheme === "culture" && <h4 className="eventTheme culture">{list.eventTheme}</h4>}
          {list.eventTheme === "infos" && <h4 className="eventTheme infos">{list.eventTheme}</h4>}
          <p className="eventName">{list.eventName}</p>
          {list.event_descrip !== "" && <p className="eventDescrip">{list.eventDescr}</p>}
          <p className="eventHour">{list.eventHour}</p>
          <p className="eventPlace">{list.eventPlace}</p>
          {list.eventAddr ? <p className="eventAddr">{list.eventAddr}</p> : ""}
          {showConsRef ? <p className="consref">{list.eventCons}</p> : "" }
        </td>
        );
      })
}
    
    </tr>
    );
  })}
        </tbody>

      </table>

      </div>


  <div>
      <div id="buttonsContReponsive">
          <img className="buttons" onClick={precDay} src={precbtn}/>
          <Button className="buttonstxt" variant="outline-success" onClick={handleConsRef}>{showConsRefBut}</Button>
          <button className="buttonstxt" onClick={handleEvenExt}>{showEvenExtBut}</button>
          <img className="buttons" onClick={nextDay} src={nextbtn}/>
      </div>
      <table className="table-responsive text-center">
        <thead>
          <tr className="day">
            <p className="dayResp">{weekDayResponsive}</p>
          </tr>
        </thead>
        <tbody>

            {showEvenExt && eventList ? 
                
                eventList.map((list) => {
                  return (moment(list.eventDate, "DD-MM-YYYY").format("ddd DD MMM") === weekDayResponsive && list.eventExt === true && list.eventMom === "Matin" &&
                  <tr>
                    <td className="eventsMatin">
                    <p className="eventName">{list.eventName}</p>
                    {list.eventDescr !== "" && <p className="eventDescrip">{list.eventDescr}</p>}
                    <p className="eventHour">{list.eventHour}</p>
                    <p className="eventPlace">{list.eventPlace}</p>
                    {list.eventAddr ? <p className="eventAddr">{list.eventAddr}</p> : ""}
                    {showConsRef ? <p className="consref">{list.eventCons}</p> : "" }
                  </td>
                </tr>
                  );
                })
                
                :
                
                eventList.map((list) => {
                  return (moment(list.eventDate, "DD-MM-YYYY").format("ddd DD MMM") === weekDayResponsive && list.eventExt === false && list.eventMom === "Matin" &&
                  <tr>
                    <td className="eventsMatin">
                      {list.eventTheme === "emploi" && <h4 className="eventTheme emploi">{list.eventTheme}</h4>}
                      {list.eventTheme === "mobilité" && <h4 className="eventTheme mobilite">{list.eventTheme}</h4>}
                      {list.eventTheme === "citoyenneté" && <h4 className="eventTheme citoy">{list.eventTheme}</h4>}
                      {list.eventTheme === "logement" && <h4 className="eventTheme logement">{list.eventTheme}</h4>}
                      {list.eventTheme === "santé" && <h4 className="eventTheme sante">{list.eventTheme}</h4>}
                      {list.eventTheme === "sport" && <h4 className="eventTheme sport">{list.eventTheme}</h4>}
                      {list.eventTheme === "culture" && <h4 className="eventTheme culture">{list.eventTheme}</h4>}
                      {list.eventTheme === "infos" && <h4 className="eventTheme infos">{list.eventTheme}</h4>}
                    <p className="eventName">{list.eventName}</p>
                    {list.eventDescr !== "" && <p className="eventDescrip">{list.eventDescr}</p>}
                    <p className="eventHour">{list.eventHour}</p>
                    <p className="eventPlace">{list.eventPlace}</p>
                    {list.eventAddr ? <p className="eventAddr">{list.eventAddr}</p> : ""}
                    {showConsRef ? <p className="consref">{list.eventCons}</p> : "" }
                  </td>
                  </tr>
                  );
                })
                }
                {showEvenExt ? 
              
              eventList.map((list) => {
                return (moment(list.eventDate, "DD-MM-YYYY").format("ddd DD MMM") === weekDayResponsive && list.eventExt === true && list.eventMom === "Aprem" &&
                <tr>
                  <td className="eventsAprem"> 
                  <p className="eventName">{list.eventName}</p>
                  {list.event_descrip !== "" && <p className="eventDescrip">{list.eventDescr}</p>}
                  <p className="eventHour">{list.eventHour}</p>
                  <p className="eventPlace">{list.eventPlace}</p>
                  {list.eventAddr ? <p className="eventAddr">{list.eventAddr}</p> : ""}
                  {showConsRef ? <p className="consref">{list.eventCons}</p> : "" }
                  </td>
                </tr>
                );
              }) 
              
              :
              
              eventList.map((list) => {
                return (moment(list.eventDate, "DD-MM-YYYY").format("ddd DD MMM") === weekDayResponsive && list.eventExt === false && list.eventMom === "Aprem" &&
                <tr>
                  <td className="eventsAprem"> 
                  {list.eventTheme === "emploi" && <h4 className="eventTheme emploi">{list.eventTheme}</h4>}
                  {list.eventTheme === "mobilité" && <h4 className="eventTheme mobilite">{list.eventTheme}</h4>}
                  {list.eventTheme === "citoyenneté" && <h4 className="eventTheme citoy">{list.eventTheme}</h4>}
                  {list.eventTheme === "logement" && <h4 className="eventTheme logement">{list.eventTheme}</h4>}
                  {list.eventTheme === "santé" && <h4 className="eventTheme sante">{list.eventTheme}</h4>}
                  {list.eventTheme === "sport" && <h4 className="eventTheme sport">{list.eventTheme}</h4>}
                  {list.eventTheme === "culture" && <h4 className="eventTheme culture">{list.eventTheme}</h4>}
                  {list.eventTheme === "infos" && <h4 className="eventTheme infos">{list.eventTheme}</h4>}
                  <p className="eventName">{list.eventName}</p>
                  {list.event_descrip !== "" && <p className="eventDescrip">{list.eventDescr}</p>}
                  <p className="eventHour">{list.eventHour}</p>
                  <p className="eventPlace">{list.eventPlace}</p>
                  {list.evenAddr ? <p className="eventAddr">{list.eventAddr}</p> : ""}
                  {showConsRef ? <p className="consref">{list.eventCons}</p> : "" }
                  </td>
                </tr>
                );
              })
        }


        </tbody>


      
      </table>
      </div>




      
    <div id="footer">
      <p className="footertxt">{"Made with <3 by MAKIL Marouan for   "}   <img id="footerlogo" src={logo}></img> </p>
    </div>
    </div>
  );
}

export default Planning;
