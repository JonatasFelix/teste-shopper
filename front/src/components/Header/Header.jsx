import * as s from "./styles";
import Logo from "../../assets/imgs/logo.png";
import SearchBar from "../SearchBar/SearchBar";
import qs from "query-string";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import { logoNavigation, shoppingCartNavigation } from "../../routes/Coordinator";
import { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";

const Header = () => {

    const { states } = useContext(GlobalContext);       // CONTEXTO GLOBAL - ESTADOS
    const { shoppingCart } = states;                    // CONTEXTO GLOBAL - CARRINHO DE COMPRAS
    
    // PEGANDO O CAMINHO DA URL
    const location = useLocation();             // HOOKS - LOCALIZAÇÃO
    const navigate = useNavigate();             // HOOKS - NAVEGAÇÃO
    const parsed = qs.parse(location.search);   // PEGANDO O CAMINHO DA URL - QUERY STRING BIBLIOTECA
    const searchQuery = parsed.q                

    // FUNÇÃO PARA QUANDO CLICAR NO LOGO IR PARA A HOME - OU LIMPANDO A BUSCA
    const logoHandlerClick = () => {
        logoNavigation(navigate, location.pathname, searchQuery);
    };

    // FUNÇÃO PARA QUANDO CLICAR NO CARRINHO DE COMPRAS IR PARA A PÁGINA DE CARRINHO
    const cartHandlerClick = () => {
        shoppingCartNavigation(navigate);
    }

    return (
        <>
        <s.Container>
            <s.Content>
                <s.Logo src={Logo} alt="Logo" onClick={logoHandlerClick} />
                <s.SerchBoxDesktop><SearchBar searchQuery={searchQuery}/></s.SerchBoxDesktop>
                <s.CartIcon onClick={cartHandlerClick}> 
                    <AiOutlineShoppingCart color={"#DA5726"} size="24px" />
                    <s.CartIconCount count={shoppingCart?.totalQuantity}>{shoppingCart?.totalQuantity}</s.CartIconCount>
                </s.CartIcon>
            </s.Content>
        </s.Container>
        <s.SerchBoxMobile><SearchBar searchQuery={searchQuery}/></s.SerchBoxMobile>
        </>
    );
};

export default Header;