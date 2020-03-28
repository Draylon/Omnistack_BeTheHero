import React,{useState} from "react"

import "./styles.css";

import {Link,useHistory} from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import logoImg from "../../assets/Logo.svg"

import api from "../../services/api"

function Register(){
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [whatsapp,setWhatsapp] = useState('');
    const [city,setCity] = useState('');
    const [UF,setUf] = useState('');

    const hist = useHistory();

    async function HandleRegister(e){
        e.preventDefault();
        const data = {name,email,whatsapp,city,UF};
        try{
            const apiresponse = await api.post('ongs',data);
            alert(`Seu ID de acesso: ${apiresponse.data.id}`);
            hist.push("/");
        }catch(err){
            alert("Erro no cadastro, revise e tente novamente");
        }
    }
    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="BeTheHero"/>
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude a encontrarem os casos da sua ONG.</p>
                    <Link className='back-link' to="/">
                        <FiArrowLeft size={16} color="#E02041"/>
                        Voltar
                    </Link>
                    
                </section>
                <form onSubmit={HandleRegister}>
                    <input value={name} onChange={e => setName(e.target.value)} placeholder="Nome da ong"/>
                    <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Email"/>
                    <input value={whatsapp} onChange={e => setWhatsapp(e.target.value)} placeholder="Whatsapp"/>
                    <div className="input-group">
                        <input value={city} onChange={e => setCity(e.target.value)} placeholder="Cidade"/>
                        <input value={UF} onChange={e => setUf(e.target.value)} placeholder="UF" style={{width:80}}/>
                    </div>
                    <button className="button" type='submit'>Cadastrar</button>
                </form>
            </div>
        </div>
    )
}

export default Register;