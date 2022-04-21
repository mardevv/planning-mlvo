import React from 'react';
import moment from "moment";
import Axios from "axios";
import 'moment/locale/fr'
import './addStyle.css';
import {useState, useEffect} from 'react';

function DelEvent() {

    const [dateSelected , setDateSelected] = useState("");

    const [eventsAtDate , setEventsAtDate] = useState([]);

    const onChangeDate = (e) => {
        setDateSelected(moment(e.target.value, "YYYY-MM-DD").format("DD-MM-YYYY"));
    }

    const onSubmit = (e) => {
        e.preventDefault();

        if(dateSelected){
            Axios.get(`https://mlvo-planning.herokuapp.com/getbydate/${dateSelected}`).then((response) => {
                setEventsAtDate(response.data);
              })
        }
    }


    const onDelete = (id) => {
        Axios.delete(`https://mlvo-planning.herokuapp.com/delevent/${id}`).then((response) => {console.log("deleted" , response)})

        var filteredArray = eventsAtDate.filter(function(e) { return e !== eventsAtDate.find(el => el._id === id) });
        setEventsAtDate(filteredArray);


    } 
    

  return (

    <div>

        <form>
            <h1>Suppression évènement</h1>
            <label>Date de l'évènement : </label>
            <input
                type = "date"
                onChange={onChangeDate}
            />

            <div>
                <input
                    type = "submit"
                    value= "Envoyer"
                    onClick={onSubmit}
                />
            </div>

            {eventsAtDate ? 

                <ul>
                    {
                    eventsAtDate.map((ev, k) => {
                        return(
                            <div>
                                <li key={k}> <img onClick={() => {onDelete(ev._id)}} src="https://cdn-icons-png.flaticon.com/512/3096/3096673.png" style={{width : '15px' , height : '15px'}}/> {ev.eventDate} {ev.eventName} {ev.eventHour} {ev.eventPlace} ({ev.eventCons})</li>
                            </div>

                        
                        );
                    })
                }

                    

                </ul>
                
                
            : 
                
                
                "Pas d'évènements à cette date."
            
            }
        </form>
      
    </div>
  );
}

export default DelEvent;
