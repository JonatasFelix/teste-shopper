import * as s from "./style"
import GlobalContext from "../../context/GlobalContext";
import React, { useContext, useState } from 'react';
import Logo from "../../assets/imgs/logo.png";

// SAVE NAME - COMPONENTE RESPONSÁVEL POR SALVAR O NOME DO USUÁRIO NO LOCALSTORAGE
// CASO O NOME NÃO ESTEJA SALVO NO LOCALSTORAGE, O COMPONENTE SERÁ RENDERIZADO


const SaveName = () => {
    const { states, setters } = useContext(GlobalContext);          // ESTADOS E SETTERS DO CONTEXTO GLOBAL
    const { name } = states;                                        // NOME DO USUÁRIO DO CONTEXTO GLOBAL
    const { setName } = setters;                                    // SETTER DO NOME DO USUÁRIO DO CONTEXTO GLOBAL

    const [inputName, setInputName] = useState("");                 // ESTADO DO INPUT DE NOME

    // FUNÇÃO QUE SALVA O NOME DO USUÁRIO NO LOCALSTORAGE E NO CONTEXTO GLOBAL
    const submitName = (e) => {
        e.preventDefault();                                 // PREVENIR O RECARREGAMENTO DA PÁGINA
        localStorage.setItem("name", inputName);            // SALVAR O NOME DO USUÁRIO NO LOCALSTORAGE
        setName(inputName);                                 // SALVAR O NOME DO USUÁRIO NO CONTEXTO GLOBAL
    }

    return (
        <>
            {!name ?                             // SE O NOME NÃO ESTIVER SALVO NO LOCALSTORAGE, RENDERIZA O COMPONENTE
                <s.Container>
                    <s.Box>
                        <h1>Olá, seja bem vindo a</h1>
                        <s.Logo src={Logo} alt="Logo ShopLife" title="ShopLife" />
                        <p>Por favor, digite seu nome para continuar</p>
                        <s.SaveName onSubmit={submitName}>
                            <s.Input
                                required
                                type="text"
                                title="Digite seu nome para que possamos armazenar suas compras"
                                placeholder="Digite seu nome aqui!"
                                value={inputName} onChange={(e) => setInputName(e.target.value)}
                                minLength="3"
                            />
                            <s.Button>Salvar</s.Button>
                        </s.SaveName>
                        <s.DisplayNone>{document.documentElement.style.overflow = 'hidden'}</s.DisplayNone> {/* DESABILITA O SCROLL NA PÁGINA */}
                    </s.Box>
                </s.Container>
                : <s.DisplayNone>{document.documentElement.style.overflow = 'visible'}</s.DisplayNone>   // SE O NOME ESTIVER SALVO NO LOCALSTORAGE, NÃO RENDERIZA O COMPONENTE E HABILITA O SCROLL NA PÁGINA
            }
        </>

    )
};

export default SaveName;