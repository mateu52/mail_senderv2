
import React from 'react';
import { useParams } from 'react-router-dom';

const SubsDetailInfo = ( {users} ) => {
    const { id } = useParams();
    const { fields, createdTime } = users.find((sub) => sub.id === id )
    return(
        <div className='listaR'>
            <h3>name:  {fields.name}</h3>
            <h4>email: {fields.email}</h4>
            <h4>{new Date(createdTime).toDateString()}</h4>
        </div>
    )
}
export default SubsDetailInfo;