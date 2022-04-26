import React, {  useState } from 'react';
import api from "../api";
import PropTypes from 'prop-types'
const AddSubscriber = ( {users} ) =>{
   
    console.log("example");
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    let date = new Date().toDateString();

    const data = { records:[{
                    fields:{
                        "email": email,
                        "name": name,
                        "created": date,
                        "Subscribers":[ name ]
                    },
                    }] 
    }
    const handleSubmit = (event)=> {
        event.preventDefault();
        console.log({name})
        console.log({email});
        console.log(date);
        api.post('/Subscribers', data)
    }
    const handleClick=(event)=>{
        if (event.target.name==="name"){
            setName(event.target.value);
        }
        else if (event.target.name==="email"){
            setEmail(event.target.value);
        }
        
    }
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label>Imie: 
                    <input 
                        name="name"
                        type="text" 
                        placeholder="Name"
                        onChange={handleClick} 
                    />
                <input 
                        name="email"
                        type="text" 
                        placeholder="email"
                        onChange={handleClick} 
                    />
                </label>
                <input type="submit" value="Wyślij" onClick={handleSubmit} />
            </form>
        </div>
    )
}
AddSubscriber.propTypes = {
    name:PropTypes.string
}
export default AddSubscriber;
