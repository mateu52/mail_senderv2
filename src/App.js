import React, { useState, useEffect } from "react";
import { BrowserRouter as Router , Link, Routes, Route } from "react-router-dom";
//import "./App.scss";
import api from "./component/api";
import Menu from "./component/Menu";
import SubscribersList from "./component/SubscribersList";
import Campaign from "./component/Campaign";
import AddSubscriber from "./component/forms/AddSubscriber";
import NewCampaign from "./component/forms/NewCampaign";
import SubDetailInfo from './component/SubDetailInfo';

function returnApp({users}){
  return(
    <Router>
        <nav>
          <p>Subskrypcja</p>
          <p><Link to="/">Główna</Link></p>
          <p><Link to="/Subscribers">Lista Subskrybentów</Link></p>
          <p><Link to="/AddSubscribers">Formularz zgłoszeniowy</Link></p>
          <p><Link to="/AddCampaign">Dodaj kampanie</Link></p>
          <p><Link to="/Campaign">Kampanie</Link></p>
        </nav>
        <Routes>
            <Route path="/" element={<Menu />} />
            <Route path="/Subscribers" element={<SubscribersList users={users} />} />
            <Route path="/AddSubscribers" element={<AddSubscriber users={users} />} />
            <Route path="/AddCampaign" element={<NewCampaign users={users}/>} />
            <Route path="/Campaign" element={<Campaign  />} />
            <Route path="/Subscribers/SubscriberDetailInfo/:id" element={<SubDetailInfo users={users}/>} />
        </Routes>
      </Router>
)}

function App() {
  const [ users, setUsers] = useState([]);
  const [ promp, setPrompt ] = useState();
  //const [ openapp, setOpenapp ] = useState(false);
  var promalert;
  
  useEffect(() => {
          promalert = prompt("haslo? ");
          setPrompt(promalert);
          //Info(promalert={promalert});
          api.get('/Subscribers')
          .then(data => setUsers(data.records))
          .catch(error => console.log(error))
  },[]);
  function checkAnsw({promp}){
    console.log(promp)
    return(
      (promp==="szkola") ? returnApp({users}) : <div><h1>bledne haslo</h1></div>
      )
  }
  checkAnsw({promp});
  //Info({promalert});
  return (
    <div>
    <h1>heel</h1>
      {checkAnsw({promp})}
    </div>
  );
}
export default App ;