

import React from 'react';
import SubscriberDetail from './SubscriberDetail';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import "../App.css"
function SubscribersList({users}){
  return (
    <div className='listaR'>
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
    </div>
  )
  
}
SubscribersList.propTypes = {
  users: PropTypes.array.isRequired
};

export default SubscribersList;

