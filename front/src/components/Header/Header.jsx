import * as s from "./styles";
import Logo from "../../assets/imgs/logo.png";
import SearchBar from "../SearchBar/SearchBar";
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
    const params = useParams();
    const navigate = useNavigate();

    const logoHandlerClick = () => {
        console.log(location.pathname);
        logoNavigation(navigate, location.pathname);
    };

    return (
        <>
        <s.Container>
            <s.Content>
                <s.Logo src={Logo} alt="Logo" onClick={logoHandlerClick} />
                <s.SerchBoxDesktop><SearchBar/></s.SerchBoxDesktop>
                <s.CartIcon> 
                    <AiOutlineShoppingCart color={"#DA5726"} size="24px" />
                    <s.CartIconCount count={shoppingCart.length}>{shoppingCart.length}</s.CartIconCount>
                </s.CartIcon>
            </s.Content>
        </s.Container>
        <s.SerchBoxMobile><SearchBar/></s.SerchBoxMobile>
        </>
    );
};

export default Header;