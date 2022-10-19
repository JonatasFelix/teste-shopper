import * as s from "./styles";
import Logo from "../../assets/imgs/logo.png";
import SearchBar from "../SearchBar/SearchBar";
import qs from "query-string";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import { logoNavigation, shoppingCartNavigation, loginNavigation } from "../../routes/Coordinator";
import { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";
import AvatarHeader from "./Avatar/Avatar";

const Header = () => {

    const { states, setters } = useContext(GlobalContext);
    const { shoppingCart, tokenPayload } = states;
    const { setToken, setTokenPayload } = setters;

    const location = useLocation();
    const navigate = useNavigate();
    const parsed = qs.parse(location.search);
    const searchQuery = parsed.q

    const logoHandlerClick = () => {
        logoNavigation(navigate, location.pathname, searchQuery);
    };

    const cartHandlerClick = () => {
        shoppingCartNavigation(navigate);
    }

    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        setTokenPayload("");
        loginNavigation(navigate);
    }

    return (
        <>
            <s.Container>
                <s.Content>
                    <s.Logo src={Logo} alt="Logo" onClick={logoHandlerClick} />

                    {tokenPayload && tokenPayload.hasAddress === "true" && (
                        <>
                            <s.SerchBoxDesktop><SearchBar searchQuery={searchQuery} /></s.SerchBoxDesktop>

                            <s.Menu>
                                <s.CartIcon onClick={cartHandlerClick}>
                                    <AiOutlineShoppingCart color={"#DA5726"} size="24px" />
                                    <s.CartIconCount count={shoppingCart?.totalQuantity}>{shoppingCart?.totalQuantity}</s.CartIconCount>
                                </s.CartIcon>

                                <AvatarHeader
                                    name={tokenPayload?.name}
                                    email={tokenPayload?.email}
                                    setToken={setToken}
                                    setTokenPayload={setTokenPayload}
                                />
                            </s.Menu>

                        </>
                    )}

                    {tokenPayload && tokenPayload.hasAddress === "false" && (
                        <s.LogoutButton onClick={logout}>Sair</s.LogoutButton>
                    )}

                </s.Content>
            </s.Container>
            {tokenPayload && tokenPayload.hasAddress === "true" && (
                <s.SerchBoxMobile><SearchBar searchQuery={searchQuery} /></s.SerchBoxMobile>
            )}
        </>
    );
};

export default Header;