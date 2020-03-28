import React,{useState} from "react"

import "./styles.css";

import {Link} from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import api from "../../services/api"

import logoImg from "../../assets/Logo.svg"

function NewCase(){
    const [title,setTitle] = useState('');
    const [desc,setDesc] = useState('');
    const [value,setValue] = useState('');
    async function HandleCaseSubmit(e){
        e.preventDefault();
        const data = {title,desc,value};
        try{
            const apiresponse = await api.post('cases',data,{
                headers: {
                    Authorization: localStorage.getItem("ongID")
                }
            });
            alert(`Cadastrado com sucesso!\n id do caso: ${apiresponse.data.id}`);
        }catch(err){
            alert("Erro no cadastro, revise e tente novamente");
        }
    }

    return (
        <div className="newCase-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="BeTheHero"/>
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolve-lo.</p>
                    <Link className='back-link' to="/profile">
                        <FiArrowLeft size={16} color="#E02041"/>
                        Voltar para home.
                    </Link>
                    
                </section>
                <form onSubmit={HandleCaseSubmit}>
                    <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Título do caso"/>
                    <textarea value={desc} onChange={e => setDesc(e.target.value)} placeholder="descrição do caso"/>
                    <input value={value} onChange={e => setValue(e.target.value)} placeholder="valor em reais"/>
                    <button className="button" type='submit'>Cadastrar</button>
                </form>
            </div>
        </div>
    )
}

export default NewCase;