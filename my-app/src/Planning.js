import React from 'react';
import moment from "moment";
import Axios from "axios";
import 'moment/locale/fr'
import {useState, useEffect} from 'react';
import './style.css';


function Planning() {

  const [cWeek, setCWeek] = useState(0);
  const [showConsRef, setShowConsRef] = useState(false);
  const [showConsRefBut, setShowConsRefBut] = useState("Afficher Conseillers");

  const [showEvenExt, setShowEvenExt] = useState(false);
  const [showEvenExtBut, setShowEvenExtBut] = useState("Afficher Evenements EXT");

  const [eventList, setEventList] = useState([]);



  

  let weekDays = [
    moment().isoWeekday((1+cWeek)).format("ddd DD MMM"),
    moment().isoWeekday(2+cWeek).format("ddd DD MMM"),
    moment().isoWeekday(3+cWeek).format("ddd DD MMM"),
    moment().isoWeekday(4+cWeek).format("ddd DD MMM"),
    moment().isoWeekday(5+cWeek).format("ddd DD MMM"),
  ];

  let today = moment().format("ddd DD MMM");
  console.log(today);

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
      setShowEvenExtBut("Afficher evenement EXT");
    }
    else {
      setShowEvenExt(true);
      setShowEvenExtBut("Afficher evenement INT")
    }
  }

  useEffect(() => {

    Axios.get('http://localhost:3001/read').then((response) => {
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
      <button onClick={precWeek}>PREC</button>
      <button onClick={nextWeek}>NEXT</button>
      <button onClick={handleConsRef}>{showConsRefBut}</button>
      <button onClick={handleEvenExt}>{showEvenExtBut}</button>

      <table className="table table-bordered text-center">
        <tbody>
          {
        weekDays.map((wD) => {
    return (
    <tr>

      {today == wD ? <td className="daysWeek">{wD} aujd.</td> : <td className="daysWeek">{wD}</td>}
      
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
          {list.event_adress ? <p className="eventAddr">{list.eventAddr}</p> : ""}
          {showConsRef ? <p className="consref">{list.eventCons}</p> : "" }
        </td>
        );
      }) 
      
      :
      
      eventList.map((list) => {
        return (moment(list.eventDate, "DD-MM-YYYY").format("ddd DD MMM") === wD && list.eventExt === true && list.eventMom === "Aprem" &&
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
          {list.event_adress ? <p className="eventAddr">{list.eventAddr}</p> : ""}
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
  );
}

export default Planning;
