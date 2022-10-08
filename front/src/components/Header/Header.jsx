import * as s from "./styles";
import Logo from "../../assets/imgs/logo.png";
import SearchBar from "../SearchBar/SearchBar";
import qs from "query-string";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { logoNavigation } from "../../routes/Coordinator";
import { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";

const Header = () => {

    const { states, setters } = useContext(GlobalContext);
    const { shoppingCart } = states;
    const { setShoppingCart } = setters;
    
    const location = useLocation();
    const navigate = useNavigate();
    const parsed = qs.parse(location.search);
    const searchQuery = parsed.q

    const logoHandlerClick = () => {
        logoNavigation(navigate, location.pathname, searchQuery);
    };

    // const ShowCart = () => {
    //     return (
    //         carL
    //     )
    // };

    return (
        <>
        <s.Container>
            <s.Content>
                <s.Logo src={Logo} alt="Logo" onClick={logoHandlerClick} />
                <s.SerchBoxDesktop><SearchBar searchQuery={searchQuery}/></s.SerchBoxDesktop>
                <s.CartIcon> 
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