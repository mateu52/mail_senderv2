

import React from 'react';
import SubscriberDetail from './SubscriberDetail';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

function SubscribersList({users}){
  console.log("Cześć")

  return (
    <div>
      {console.log(users)}
      {console.log(users.id)}
      {users.map((user) => (
        
          <div key={user.id}>
            <Link to={`SubscriberDetailInfo/${user.id}`}>
              <SubscriberDetail
                name={user.fields.name}
                email={user.fields.email}
              />
            </Link>
          </div>
      ))}
      <h1>hello1</h1>
      {console.log("Cześć")}
    </div>
  )
  
}
SubscribersList.propTypes = {
  users: PropTypes.array.isRequired
};

export default SubscribersList;

