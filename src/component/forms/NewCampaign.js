import api from "../api";
import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import emailjs from '@emailjs/browser';
import PropTypes from 'prop-types';
function NewCampaign({users}){
    const {register, handleSubmit, formState:{errors} } = useForm();
    const [campDraft, setDraft] =useState();
    const [campSent, setSent ] =useState();
    const [subs, setSubs ] = useState();
    const [ allSubdata , setallSubdata ] = useState();
    const [ mailTosend, setMailtosend] = useState([]);
    //////////////////////////////////////////////////////////////////
    function Alls(name){
        var XYZ= [];
        var ABC = [];
        var oneMail = [];
        var moreMails = [];
        users.map((user)=> {
            if(user.fields.name===name){
                XYZ.push(user.id);
                ABC.push(user.id);
                oneMail.push(user.fields.email);
                moreMails.push(user.fields.email);
            }
            else{
                ABC.push(user.id);
                moreMails.push(user.fields.email);
            }
            return XYZ;
        })
        if (XYZ.length>0){
            setallSubdata(XYZ);
            setMailtosend(oneMail);
        }
        else{
            setallSubdata(ABC);
            setMailtosend(moreMails);
        }
    }
    //////////////////////////////////////////////////
    const handleDraft = data => {
        setSubs(data.content);
        Alls(data.name);
        setDraft( 
            {records:[
                {
                fields:
                    {
                        "subject":data.subject,    
                        "content":subs,
                        "status":"draft",
                        "Subscribers":allSubdata 
                    }    
                }]
            }
        );
        console.log(campDraft);
        api.post('/Campaign', campDraft);
    }
////////////////////////////////////////////////////////////////////////////////////
    const handleSend = data => {
        setSent(
            {records:[
                {
                fields:
                    {
                    "subject":data.subject,
                    "content":data.content,
                    "status":"sent",
                    "Subscribers":allSubdata                
                    }   
                }]
            }
        );
        console.log(campSent);
        api.post('/Campaign',campSent);
        Alls(data.name);
        var finded = false;
        users.map((user)=>{
            if(user.fields.name===data.name){
                console.log("TAK...");
                finded=true;
                emailjs.send('gmail', 'contact_form',{
                    name: data.name,
                    subject:data.subject,
                    message:data.content
                                                    },'SBydpsUIUla4NFoUH')
                .then(response => {
                    console.log('Success', response);
                }, error => {
                    console.log('Failes...',error);
                }); 
            }return console.log("ok wys??ano do ", mailTosend);
        })
        console.log(finded);
        if(finded===true){
            window.confirm("wys??ano oraz zapisano pomy??lnie");
        }
        if(finded===false){
            window.confirm("zapisano kampanie, nie wyslano brak takiego imienia w bazie");
        }

    }
///////////////////////////////////////////////////////////////////////////////////////////
    return(
        <form className='listaR'>
            <h3>tytu?? maila</h3>
                <input {...register("subject", {required:true})} />
                {errors.subject && <span>This field is required</span>}
            <h3>Twoje imi??</h3>
                <input 
                    placeholder={"podaj imi?? "}
                    {...register("name", {required:true})} />
                {errors.content && <span>This field is required</span>}
            <h3>tre???? kampani</h3>
                <input 
                    placeholder={"tre???? kampani.... "}
                    {...register("content", {required:true})} />
                {errors.content && <span>This field is required</span>}
                {/*Dzia??a po podw??jnm klikni??ciu*/}
                <button type="submit" name="draft" 
                        onClick={handleSubmit(handleDraft)}>Zapisz</button>

                <button type="submit" name="send" 
                        onClick={handleSubmit(handleSend)}>Wy??lij</button>

        </form>
    );
}
NewCampaign.propTypes = {
    name: PropTypes.string,
    subject: PropTypes.string,
    content: PropTypes.string
}
export default NewCampaign;
