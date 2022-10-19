import * as s from "./styles";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GrSearch } from "react-icons/gr";
import { searchNavigation } from "../../routes/Coordinator";
import { IoClose } from "react-icons/io5";
import { homeNavigation } from "../../routes/Coordinator";

const SearchBar = ({ searchQuery }) => {

    const [search, setSearch] = useState("");       
    const navigate = useNavigate();                 

    const seachClick = (e) => {
        e.preventDefault()
        if (search) {
            searchNavigation(navigate, search);
        }
    }

    const handleSearch = (e) => {
        setSearch(e.target.value);
    }

    const clearSearch = () => {
        if (searchQuery) {                  
            setSearch("")                       
            homeNavigation(navigate)            
        } else {                            
            setSearch("")                       
        }
    }

    useEffect(() => {
        searchQuery && setSearch(searchQuery)
    }, [searchQuery]);

    return (
        <s.FormContainer onSubmit={seachClick}>
            <s.SearchIcon><GrSearch /></s.SearchIcon>
            <s.Input type="text" placeholder="Buscar" value={search} onChange={handleSearch} />

            {search &&              
                <s.ClearButton onClick={clearSearch}>
                    <IoClose color="#4d4d4d" size="26px" />
                </s.ClearButton>
            }
            <s.SearchButton>Buscar</s.SearchButton>
        </s.FormContainer>
    );


};

export default SearchBar;