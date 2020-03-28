import React,{useEffect, useState} from "react"

import "./styles.css";

import api from "../../services/api"

import {Link,useHistory} from 'react-router-dom'
import { FiPower,FiTrash2 } from 'react-icons/fi'

import logoImg from "../../assets/Logo.svg"

function Profile(){

    const [cases,setCases] = useState([]);
    const history = useHistory();

    const ongId = localStorage.getItem("ongID")
    const ongName = localStorage.getItem("ongName")

    useEffect(()=>{
        api.get('profile',{
            headers:{
                Authorization: ongId,
            }
        }).then(response => {
            setCases(response.data);
        })
    }, [ongId] );

    async function HandleDeleteIncident(id){
        try{
            await api.delete(`cases/${id}`,{
                headers:{
                    Authorization: localStorage.getItem("ongID"),
                }
            })
            setCases(cases.filter(acase => acase.id !== id))
        }catch(err){
            alert("Erro ao deletar caso");
        }
    }

    function HandleLogout(){
        localStorage.clear();
        history.push("/");
    }

    return(
        <div className="profile-container">
            <header className="header-profile">
                <img src={logoImg} alt="BeTheHero"/>
                <span>Bem-vinda {ongName}</span>
                <Link className="button" to="/cases/new">
                    Novo Caso
                </Link>
                <button type="button" onClick={HandleLogout}>
                    <FiPower size={18} color="#e02041"></FiPower>
                </button>
            </header>
            <h1>Casos cadastrados</h1>
            <ul>
                {
                    cases.map(acase => {
                        return (
                            <li key={acase.id}>
                                <strong>CASO:</strong>
                                <p>{acase.title}</p>
                                <strong>Desc</strong>
                                <p>{acase.desc}</p>
                                <strong>Valor: </strong>
                                <p>{Intl.NumberFormat('pt-BR',{style: 'currency',currency: 'BRL'}).format(acase.value)}</p>
                                <button onClick={() => HandleDeleteIncident(acase.id)} type="button">
                                    <FiTrash2 size={20} color="#FFF"/>
                                </button>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default Profile;