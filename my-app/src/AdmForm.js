import React from 'react';
import moment from "moment";
import Axios from "axios";
import 'moment/locale/fr'
import {useState, useEffect} from 'react';
import './admStyle.css';
import AddEvent from './adm/AddEvent';
import DelEvent from './adm/DelEvent';


function AdmForm() {

  console.log(process.env.REACT_APP_AUTHDOMAIN)

  const [username , setUsername] = useState("");
  const [userpswd , setPswd] = useState("");
  const [alertError , setAlertError] = useState("");
  const [isAuth , setIsAuth] = useState(false);
  const [addEvent , setAddEvent] = useState(false);
  const [delEvent , setDelEvent] = useState(false);



  const submitForm = (e) =>{
    e.preventDefault();
  }


  const onChangeUsername = (e) =>{
    setUsername(e.target.value);
  }

  const onChangePwd = (e) =>{
    setPswd(e.target.value);
  }

  const onSendForm = () => {
    if (username === process.env.REACT_APP_AUTHNAME && userpswd === process.env.REACT_APP_AUTHPASS){
      console.log("c'est ok");
      setIsAuth(true);
    }
    else{
      setAlertError("Erreur, vos identifiants sont incorrects .");
    }
  }

  const onAddEvent = () =>{
    setAddEvent(true);
    setDelEvent(false);
  }

  const onDelEvent = () =>{
    setDelEvent(true);
    setAddEvent(false);
  }


  return (

    <div>

    {
      isAuth ? 

      <div>
        <div>
          <button onClick={onAddEvent}>Ajouter un évènement (+)</button>
          <button onClick={onDelEvent}>Supprimer un évènement (-)</button>
        </div>

        <div>
          {addEvent ? <AddEvent/> : ""}
          {delEvent ? <DelEvent/> : ""}
        </div>
      </div>
      : 
      
      <form onSubmit={submitForm} id = "formAdm">
      <h2>
          Connexion securisée
      </h2>
      <label>
          <input type="name" className="connectInput" onChange={onChangeUsername} placeholder="Username"/><br/>
      </label>
      <br/>
      <label>
          <input type="password" className="connectInput" onChange={onChangePwd} placeholder="Password"/><br/>
      </label><br/>
      <div class="align-right">
          <button type="submit" onClick={onSendForm}>Se connecter</button>
      </div>
      <p style={{color : "red"}}>{alertError}</p>
      </form>
      
    }
    </div>



    

    

    

  );
}

export default AdmForm;
