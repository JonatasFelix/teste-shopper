import * as s from "./style"
import GlobalContext from "../../context/GlobalContext";
import React, { useContext, useState } from 'react';

const SaveName = () => {
    const { states, setters } = useContext(GlobalContext);
    const { name } = states;
    const { setName } = setters;

    const [inputName, setInputName] = useState("");

    const submitName = (e) => {
        e.preventDefault();
        localStorage.setItem("name", inputName);
        setName(inputName);
    }

    return (
        <>
            {!name ?
                <s.Container>
                    <s.Box>
                        <h1>Olá, seja bem vindo a ShoLife</h1>
                        <p>Por favor, digite seu nome para continuar</p>
                        <s.SaveName onSubmit={submitName}>
                            <s.Input
                                type="text"
                                placeholder="Digite seu nome!"
                                value={inputName} onChange={(e) => setInputName(e.target.value)}
                                minLength="3"
                            />
                            <s.Button>Save</s.Button>
                        </s.SaveName>
                        <s.DisplayNone>{document.documentElement.style.overflow = 'hidden'}</s.DisplayNone>
                    </s.Box>
                </s.Container>
                : <s.DisplayNone>{document.documentElement.style.overflow = 'visible'}</s.DisplayNone>
            }
        </>

    )
};

export default SaveName;