import * as s from "./styles";
import { useState, useEffect } from "react";
import { GrSearch } from "react-icons/gr";

const SearchBar = () => {

    const [search, setSearch] = useState("");

    const handleSearch = (event) => {
        setSearch(event.target.value);
    }

    return (
        <s.Container>
            <s.SearchIcon><GrSearch/></s.SearchIcon>
            <s.Input type="text" placeholder="Buscar" value={search} onChange={handleSearch} />
            <s.SearchButton>Buscar</s.SearchButton>
        </s.Container>
    );


};

export default SearchBar;