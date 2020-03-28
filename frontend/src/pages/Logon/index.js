import React,{useState} from 'react';

import {Link,useHistory} from "react-router-dom"
import { FiLogIn } from 'react-icons/fi'

import "./styles.css"

import api from "../../services/api"

import logoImg from "../../assets/Logo.svg"
import heroImg from "../../assets/OmniStack11 1.png"


function Logon(){
    const [id,setId] = useState('');
    const hist = useHistory();

    async function HandleLogin(e){
        e.preventDefault();
        try{
            const responseapi = await api.post('sessions',{id});
            localStorage.setItem("ongID",id);
            localStorage.setItem("ongName",responseapi.data.name);
            hist.push("/profile")
        }catch(err){
            alert("Falha no login, tente novamente");
        }
    }
    return(
        <div className="logon-container">
            <section className="form">
            <img src={logoImg} alt="BeTheHero"/>
            <form onSubmit={HandleLogin}>
                <h1>Faça logon</h1>
                <input placeholder="Sua ID" value={id} onChange={e => setId(e.target.value)}/>
                <button className='button' type="submit">Entrar</button>
                <Link  className='back-link' to="/register">
                    <FiLogIn size={16} color="#E02041"/>
                    Não tenho cadastro
                </Link>
            </form>
        </section>
        <img src={heroImg} alt="The Heroes"/>
        </div>
    )
}

export default Logon;