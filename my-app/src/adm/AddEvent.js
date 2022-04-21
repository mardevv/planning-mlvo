import React from 'react';
import moment from "moment";
import Axios from "axios";
import 'moment/locale/fr'
import './addStyle.css';
import {useState, useEffect} from 'react';



function AddEvent() {

    const [idEvent , setIdEvent] = useState();
    const [reqStatus , setReqStatus] = useState("");

    const [eventExt , setEventExt] = useState(false);
    const [eventTheme , setEventTheme] = useState("emploi");
    const [eventName , setEventName] = useState("");
    const [eventDate , setEventDate] = useState(moment().format("DD-MM-YYYY"));
    const [eventHour , setEventHour] = useState("");
    const [eventDescr , setEventDescr] = useState("");
    const [eventPlace , setEventPlace] = useState("");
    const [eventAddr , setEventAddr] = useState("");
    const [eventCons , setEventCons] = useState("");
    const [eventMom , setEventMom] = useState("");

    const onChangeExt = (e) => {
        if (e.target.value === "ext"){
            setEventExt(true);
        }
        else{
            setEventExt(false);
        }
    }

    const onChangeTheme = (e) => {
        if (e.target.value === "empl"){
            setEventTheme("emploi")
        }
        else if (e.target.value === "mob"){
            setEventTheme("mobilité")
        }
        else if (e.target.value === "log"){
            setEventTheme("logement")
        }
        else if (e.target.value === "infos"){
            setEventTheme("infos")
        }
        else if (e.target.value === "cult"){
            setEventTheme("culture")
        }
        else if (e.target.value === "sante"){
            setEventTheme("santé")
        }
        else if (e.target.value === "sport"){
            setEventTheme("sport")
        }
        else if (e.target.value === "citoy"){
            setEventTheme("citoyenneté")
        }
    }

    const onChangeName = (e) => {
        setEventName(e.target.value);
    }

    const onChangeDate = (e) => {
        if(e.target.value){
            setEventDate(moment(e.target.value, "YYYY-MM-DD").format("DD/MM/YYYY"));
        }
    }

    const onChangeMom = (e) => {
        if (e.target.value === "mat"){
            setEventMom("Matin");
        }
        else if (e.target.value === "apr"){
            setEventExt("Aprem");
        }
    }

    const onChangeHour = (e) => {
            setEventHour(e.target.value);
    }

    const onChangeDescr = (e) => {
        setEventDescr(e.target.value);
    }

    const onChangePlace = (e) => {
        setEventPlace(e.target.value);
    }

    const onChangeAddr = (e) => {
        setEventAddr(e.target.value);
    }


    const onChangeCons = (e) => {
        setEventCons(e.target.value);
    }

    const handleSubmit = (e) => {

        if(eventName && eventHour && eventPlace && eventMom){

        const newEvent = { 
            eventExt: eventExt,
            eventTheme: eventTheme,
            eventDate: eventDate,
            eventName: eventName,
            eventDescr: eventDescr,
            eventHour: eventHour,
            eventPlace: eventPlace,
            eventAddr: eventAddr,
            eventCons: eventCons,
            eventMom: eventMom
        };

        try{
            Axios.post('http://localhost:3001/post', newEvent)
            .then(response => setIdEvent(response.data.id));
            setReqStatus("Evènement ajouté .");

            setEventName("");
            setEventDescr("");
            setEventPlace("");
            setEventHour("");
            setEventAddr("");
            setEventCons("");
        }
        catch(err){
            console.log(err);
        }
    }

    else {
        setReqStatus("Merci de renseigner les infos");
    }
    }

    

  return (

    <div>
        <form action="" method="POST" class="form-example">
        <h3>AJOUT EVENEMENT</h3>
            
            <div class="event-type">
                <label>Type d'évènement : </label>
                <select name="eventExt" id="eventExt" onChange={onChangeExt}>
                    <option value="int">INTERNE</option>
                    <option value="ext">EXTERNE</option>
                </select>
            </div>

            <div class="event-theme">
                <label>Thème : </label>
                <select name="eventExt" id="eventExt" onChange={onChangeTheme}>
                    <option value="empl">EMPLOI</option>
                    <option value="mob">MOBILITE</option>
                    <option value="log">LOGEMENT</option>
                    <option value="infos">INFOS</option>
                    <option value="cult">CULTURE</option>
                    <option value="sante">SANTE</option>
                    <option value="sport">SPORT</option>
                    <option value="citoy">CITOYENNETE</option>
                </select>
            </div>

            <div class="event-name">
                <label>Nom évènement : </label>
                <input type="text" maxlength="17" value={eventName} onChange={onChangeName} required/>
            </div>

            <div class="event-date">
                <label>Date : </label>
                <input 
                        type="date" 
                        id="start" 
                        name="eventDate"
                        onChange={onChangeDate}
                />
            </div>

            <div class="event-hour">
                <label>Horaires : </label>
                <select name="eventExt" id="eventExt" onChange={onChangeMom}>
                    <option>--- SELECTIONNER ---</option>
                    <option value="mat">MATIN</option>
                    <option value="apr">APRES-MIDI</option>
                </select>
                <input 
                        type="text" 
                        value={eventHour}
                        onChange={onChangeHour}
                        required
                />
            </div>

            <div class="event-descr">
                <label>Description : </label>
                <input 
                        type="text" 
                        value={eventDescr}
                        onChange={onChangeDescr}
                        maxlength="20"
                />
            </div>

            <div class="event-place">
                <label>Lieu : </label>
                <input 
                        type="text" 
                        value={eventPlace}
                        onChange={onChangePlace}
                        maxlength="12"
                        required
                />
            </div>

            <div class="event-addr">
                <label>Adresse : </label>
                <input 
                        type="text" 
                        value={eventAddr}
                        onChange={onChangeAddr}
                        maxlength="18"
                />
            </div>

            <div class="event-addr">
                <label>Conseiller(s) : </label>
                <input 
                        type="text" 
                        value={eventCons}
                        onChange={onChangeCons}
                        maxlength="18"
                        required
                />
            </div>

            <div class="form-example">
                <input type="submit" value="AJOUTER" onClick={handleSubmit}/>
                <p>{reqStatus}</p>
            </div>
        </form>
    </div>
  );
}

export default AddEvent;
