import React from 'react';

const SubscriberDetail= ( props ) => {
    return(
        <div>
                <h3>Name: {props.name}</h3>
                <h4>email: {props.email}</h4>
                <br></br>
                
        </div>
    )
}
export default SubscriberDetail;