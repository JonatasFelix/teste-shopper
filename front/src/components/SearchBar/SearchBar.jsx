import * as s from "./styles";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GrSearch } from "react-icons/gr";
import { searchNavigation } from "../../routes/Coordinator";
import { IoClose } from "react-icons/io5";
import { homeNavigation } from "../../routes/Coordinator";

// SEARCHBAR
// RECEBE O CAMINHO DA URL

const SearchBar = ({ searchQuery }) => {

    const [search, setSearch] = useState("");       // ESTADO DO INPUT DE BUSCA
    const navigate = useNavigate();                 // HOOKS - NAVEGAÇÃO


    // FUNÇÃO PARA QUANDO CLICAR NO BOTÃO DE BUSCA
    const seachClick = (e) => {
        e.preventDefault()
        searchNavigation(navigate, search);
    }

    // FUNÇÃO PARA ALTERAR O ESTADO DO INPUT DE BUSCA
    const handleSearch = (e) => {
        setSearch(e.target.value);
    }

    // FUNÇÃO PARA LIMPAR O INPUT DE BUSCA
    const clearSearch = () => {
        if (searchQuery) {                  // CASO ESTEJA NA PÁGINA DE BUSCA
            setSearch("")                       // LIMPA O INPUT
            homeNavigation(navigate)            // VOLTA PARA A HOME
        } else {                            // CASO ESTEJA NA HOME
            setSearch("")                       // LIMPA O INPUT
        }
    }

    // CASO INICIE A APLICAÇÃO COM ALGO NA URL DE BUSCA
    useEffect(() => {
        searchQuery && setSearch(searchQuery)
    }, [searchQuery]);

    return (
        <s.FormContainer onSubmit={seachClick}>
            <s.SearchIcon><GrSearch /></s.SearchIcon>
            <s.Input type="text" placeholder="Buscar" value={search} onChange={handleSearch} />

            {search &&              // CASO TENHA ALGO NO INPUT DE BUSCA APAARECE O BOTÃO DE LIMPAR
                <s.ClearButton onClick={clearSearch}>
                    <IoClose color="#4d4d4d" size="26px" />
                </s.ClearButton>
            }


            <s.SearchButton>Buscar</s.SearchButton>
        </s.FormContainer>
    );


};

export default SearchBar;