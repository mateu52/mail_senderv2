import React, { useState, useEffect } from "react";
import { BrowserRouter as Router , Link, Routes, Route } from "react-router-dom";
import "./App.css"
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
          <p className="titleR">Subskrypcja mailowa - kampanie</p>
          <p className="linkR"><Link style={{ textDecoration: 'none' }} to="/">Główna</Link></p>
          <p className="linkR"><Link style={{ textDecoration: 'none' }} to="/Subscribers">Lista Subskrybentów</Link></p>
          <p className="linkR"><Link style={{ textDecoration: 'none' }} to="/AddSubscribers">Formularz zgłoszeniowy</Link></p>
          <p className="linkR"><Link style={{ textDecoration: 'none' }} to="/AddCampaign">Dodaj kampanie</Link></p>
          <p className="linkR"><Link style={{ textDecoration: 'none' }} to="/Campaign">Kampanie</Link></p>
        </nav>
        <Routes>
            <Route path="/" element={<Menu />} />
            <Route path="/Subscribers" element={<SubscribersList users={users} />} />
            <Route path="/AddSubscribers" element={<AddSubscriber />} />
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
  //var promalert;
  
  useEffect(() => {
          //promalert = prompt("haslo? ");
          setPrompt("szkola");
          //Info(promalert={promalert});
          api.get('/Subscribers')
          .then(data => setUsers(data.records))
          .catch(error => console.log(error))
  },[]);
  function checkAnsw({promp}){
    console.log(promp)
    return(
      (promp==="szkola") ? returnApp({users}) : returnApp({users})
      )
  }
  checkAnsw({promp});
  //Info({promalert});
  return (
    <div>
      {checkAnsw({promp})}
    </div>
  );
}
export default App ;