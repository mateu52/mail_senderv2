import React, { useState, useEffect } from "react";


function Campaign(){
  const [camps, setCamps] = useState([]);
  
    const fetchSubscribers = async () => {
      const { REACT_APP_DB_ID, REACT_APP_API_KEY } = process.env
      const baseUrl = `https://api.airtable.com/v0/${REACT_APP_DB_ID}`; 
      const apiConfig = {
        subsList: `${baseUrl}/Campaign?maxRecords=10&view=Grid%20view`,
        subsDetails: `${baseUrl}/Campaign`,
      }
      const requestConfig = {
        headers: {
          Authorization: `Bearer ${REACT_APP_API_KEY}`,
        }
      }
      //wyswietli to co apiConfiffg.subsList: (https://api.airtable.com/v0/appNxuSuA6IZuPplU/Subscribers?maxRecords=3&view=Subscribers)
      const response = await fetch(apiConfig.subsList, requestConfig);
      const responseData = await response.json();
      const data = [];
      responseData.records.forEach((elem) => {
        data.push({
          id: elem.id,
          subject: elem.fields.subject,
          content: elem.fields.content,
          subscribers: elem.fields.Subscribers,
          status: elem.fields.status
        });
      });

      
      setCamps(data);
    }
    useEffect(() => {
      fetchSubscribers();
    }, []);

      
    console.log(camps);
       
    return(
      <div>
        <h1>Kampanie: </h1>
        


        {camps && camps.map((sub) =>
          <div key={sub.id}>
              
              <h3>Tytuł: {sub.subject}  </h3>
              <h4>treść:</h4>
              <p>{sub.content}</p>
              <h2>_________ _________ __________________ __________________ __________ ________</h2>
              <br></br><br></br>
            </div>
          
      )}
      
            
      </div>

    )
}
  
  export default Campaign;

  