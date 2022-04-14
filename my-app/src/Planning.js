import React from 'react';
import moment from "moment";
import 'moment/locale/fr'
import {useState} from 'react';
import './style.css';
import listEventsMatin from './events/listEventsMatin';
import listEventsAprem from './events/listEventsAprem';

function Planning() {

  const [cWeek, setCWeek] = useState(0);
  const [showConsRef, setShowConsRef] = useState(false);
  const [showConsRefBut, setShowConsRefBut] = useState("Afficher Conseillers");

  const [showEvenExt, setShowEvenExt] = useState(false);
  const [showEvenExtBut, setShowEvenExtBut] = useState("Afficher Evenements EXT");


  let weekDays = [
    moment().isoWeekday((1+cWeek)).format("ddd DD MMM"),
    moment().isoWeekday(2+cWeek).format("ddd DD MMM"),
    moment().isoWeekday(3+cWeek).format("ddd DD MMM"),
    moment().isoWeekday(4+cWeek).format("ddd DD MMM"),
    moment().isoWeekday(5+cWeek).format("ddd DD MMM"),
  ];

  const nextWeek = () =>{
    setCWeek(cWeek + 7);
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

    if (showEvenExt === true) {setShowEvenExt(false)}
    else {setShowEvenExt(true)}
  }


  return (
    <div className="App">
      <h2 onClick={nextWeek}>NEXT</h2>
      <button onClick={handleConsRef}>{showConsRefBut}</button>
      <button onClick={handleEvenExt}>{showEvenExtBut}</button>

      <table className="table table-bordered text-center">
        <tbody>
          {
        weekDays.map((wD) => {
    return (
    <tr>
      
      <td className="daysWeek">{wD}</td>

      {showEvenExt ? 
      
      listEventsMatin.map((list) => {
        return (list.event_day === wD && list.event_ext === true &&
          <td className="eventsMatin">
          <p className="eventName">{list.event_name}</p>
          {list.event_descrip !== "" && <p className="eventDescrip">{list.event_descrip}</p>}
          <p className="eventHour">{list.event_hours}</p>
          <p className="eventPlace">{list.event_place}</p>
          {list.event_adress ? <p className="eventAddr">{list.event_adress}</p> : ""}
          {showConsRef ? <p className="consref">{list.event_consref}</p> : "" }
        </td>
        );
      })
      
      :
      
      listEventsMatin.map((list) => {
        return (list.event_day === wD && list.event_ext === false &&
          <td className="eventsMatin">
            {list.event_theme === "emploi" && <h4 className="eventTheme emploi">{list.event_theme}</h4>}
            {list.event_theme === "mobilité" && <h4 className="eventTheme mobilite">{list.event_theme}</h4>}
            {list.event_theme === "citoyenneté" && <h4 className="eventTheme citoy">{list.event_theme}</h4>}
            {list.event_theme === "logement" && <h4 className="eventTheme logement">{list.event_theme}</h4>}
            {list.event_theme === "santé" && <h4 className="eventTheme sante">{list.event_theme}</h4>}
            {list.event_theme === "sport" && <h4 className="eventTheme sport">{list.event_theme}</h4>}
            {list.event_theme === "culture" && <h4 className="eventTheme culture">{list.event_theme}</h4>}
            {list.event_theme === "infos" && <h4 className="eventTheme infos">{list.event_theme}</h4>}
          <p className="eventName">{list.event_name}</p>
          {list.event_descrip !== "" && <p className="eventDescrip">{list.event_descrip}</p>}
          <p className="eventHour">{list.event_hours}</p>
          <p className="eventPlace">{list.event_place}</p>
          {list.event_adress ? <p className="eventAddr">{list.event_adress}</p> : ""}
          {showConsRef ? <p className="consref">{list.event_consref}</p> : "" }
        </td>
        );
      })
      }

{showEvenExt ? 
      
      listEventsAprem.map((list) => {
        return (list.event_day === wD && list.event_ext === true &&
          <td className="eventsAprem"> 
          <p className="eventName">{list.event_name}</p>
          {list.event_descrip !== "" && <p className="eventDescrip">{list.event_descrip}</p>}
          <p className="eventHour">{list.event_hours}</p>
          <p className="eventPlace">{list.event_place}</p>
          {list.event_adress ? <p className="eventAddr">{list.event_adress}</p> : ""}
          {showConsRef ? <p className="consref">{list.event_consref}</p> : "" }
        </td>
        );
      }) 
      
      :
      
      listEventsAprem.map((list) => {
        return (list.event_day === wD && list.event_ext === false &&
          <td className="eventsAprem"> 
          {list.event_theme === "emploi" && <h4 className="eventTheme emploi">{list.event_theme}</h4>}
          {list.event_theme === "mobilité" && <h4 className="eventTheme mobilite">{list.event_theme}</h4>}
          {list.event_theme === "citoyenneté" && <h4 className="eventTheme citoy">{list.event_theme}</h4>}
          {list.event_theme === "logement" && <h4 className="eventTheme logement">{list.event_theme}</h4>}
          {list.event_theme === "santé" && <h4 className="eventTheme sante">{list.event_theme}</h4>}
          {list.event_theme === "sport" && <h4 className="eventTheme sport">{list.event_theme}</h4>}
          {list.event_theme === "culture" && <h4 className="eventTheme culture">{list.event_theme}</h4>}
          {list.event_theme === "infos" && <h4 className="eventTheme infos">{list.event_theme}</h4>}
          <p className="eventName">{list.event_name}</p>
          {list.event_descrip !== "" && <p className="eventDescrip">{list.event_descrip}</p>}
          <p className="eventHour">{list.event_hours}</p>
          <p className="eventPlace">{list.event_place}</p>
          {list.event_adress ? <p className="eventAddr">{list.event_adress}</p> : ""}
          {showConsRef ? <p className="consref">{list.event_consref}</p> : "" }
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
