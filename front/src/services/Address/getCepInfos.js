import axios from "axios";

export const getCepInfos = async (
    cep, 
    setCepLoading, 
    setCepError, 
    setStreet, 
    setNeighbourhood, 
    setCity, 
    setState,
    ) => {
    await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
        .then((response) => {
            if (response.data.erro) {
                setCepError("Digite um CEP válido");
                setCepLoading(false);

                setStreet("");
                setNeighbourhood("");
                setCity("");
                setState("");

                return;
            }
            setStreet(response.data.logradouro);
            setNeighbourhood(response.data.bairro);
            setCity(response.data.localidade);
            setState(response.data.uf);
            setCepLoading(false);
        })
};