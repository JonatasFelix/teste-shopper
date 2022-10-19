import * as s from "./styles";
import Header from "../../components/Header/Header";
import { useProtectedPage } from "../../hooks/useProtectedPage";
import InputSimple from "../../components/Forms/InputSimple";
import { useState, useContext, useEffect } from "react";
import { getCepInfos } from "../../services/Address/getCepInfos";
import GlobalContext from "../../context/GlobalContext";
import { postAddress } from "../../services/Users/postAddress";
import { useNavigate } from "react-router-dom";
import { homeNavigation } from "../../routes/Coordinator";
import Loader from "../../components/Loader/Loader";

const SubscriptionAddressPage = () => {

    useProtectedPage();

    const navigate = useNavigate();

    const { states, setters } = useContext(GlobalContext);
    const { token, tokenPayload } = states;
    const { setToken } = setters;

    const [cep, setCep] = useState("");
    const [street, setStreet] = useState("");
    const [number, setNumber] = useState("");
    const [neighbourhood, setNeighbourhood] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [complement, setComplement] = useState("");


    const [cepLoading, setCepLoading] = useState(false);
    const [cepError, setCepError] = useState(false);

    const [loader, setLoader] = useState(false);

    const handleCep = (value) => {
        if (!isNaN(value) && value.length <= 8) {
            setCepError(false);
            setCep(value);
        }

        if (value.length < 8) {
            setStreet("");
            setNeighbourhood("");
            setCity("");
            setState("");
        }

        if (value.length === 8) {
            setCepLoading(true);
            getCepInfos(value, setCepLoading, setCepError, setStreet, setNeighbourhood, setCity, setState);
        }
    }

    const submitForm = async (e) => {

        e.preventDefault();

        if (cepError || cepLoading || cep.length < 8 || !number) {
            return;
        }

        const body = { cep, street, number, neighbourhood, city, state, complement };
        await postAddress(body, token, setToken, setLoader)

    }

    const ShowButton = () => {
        if (loader) {
            return <s.Button disabled><Loader height={"14px"} width={"14px"} /></s.Button>
        } else {
            return <s.Button type="submit">Salvar</s.Button>
        }
    }

    useEffect(() => {
        if (tokenPayload.hasAddress === "true") {
            homeNavigation(navigate)
        }
    }, [tokenPayload, navigate])

    return (
        <>
            <Header />

            <s.ContainerForm >
                <s.Title>Cadastrar Endereço</s.Title>

                <s.Form onSubmit={submitForm}>

                    <InputSimple
                        label="CEP"
                        placeholder="00000000"
                        value={cep}
                        onChange={handleCep}
                        error={cepError}
                        type="text"
                        disabed={false}
                        required={true}
                    />

                    <InputSimple
                        label="Número"
                        placeholder="Número"
                        value={number}
                        onChange={setNumber}
                        error={false}
                        type="text"
                        disabed={false}
                        required={true}
                    />

                    <InputSimple
                        label="Complemento"
                        placeholder="Apto / Bloco"
                        value={complement}
                        onChange={setComplement}
                        error={false}
                        type="text"
                        disabed={false}
                        required={false}
                    />


                    <InputSimple
                        label="Logradouro"
                        placeholder="Rua / Av."
                        value={street}
                        onChange={() => { }}
                        error={""}
                        type={"text"}
                        disabed={true}
                        required={true}
                    />

                    <InputSimple
                        label="Bairro"
                        placeholder="Bairro"
                        value={neighbourhood}
                        onChange={() => { }}
                        error={""}
                        type={"text"}
                        disabed={true}
                        required={true}
                    />

                    <InputSimple
                        label="Cidade"
                        placeholder="Cidade"
                        value={city}
                        onChange={() => { }}
                        error={""}
                        type={"text"}
                        disabed={true}
                        required={true}
                    />

                    <InputSimple
                        label="Estado"
                        placeholder="Estado"
                        value={state}
                        onChange={() => { }}
                        error={""}
                        type={"text"}
                        disabed={true}
                        required={true}
                    />

                    <ShowButton />

                </s.Form>
            </s.ContainerForm>

        </>
    )
};

export default SubscriptionAddressPage;