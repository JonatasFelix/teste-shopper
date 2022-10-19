import * as s from "./styles"
import { useUnProtectedPage } from "../../hooks/useUnProtectedPage"
import InputSimple from "../../components/Forms/InputSimple"
import { useEffect, useState, useContext } from "react"
import Logo from "../../assets/imgs/logo.png"
import GlobalContext from "../../context/GlobalContext"
import { postLogin } from "../../services/Users/postLogin"
import Loader from "../../components/Loader/Loader"
import { toast } from "react-toastify"
import { signUpNavigation } from "../../routes/Coordinator"
import { useNavigate } from "react-router-dom"


const LoginPage = () => {
    useUnProtectedPage()

    const navigate = useNavigate()
    const { setters } = useContext(GlobalContext)
    const { setToken } = setters


    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState("")

    const [password, setPassword] = useState("")
    const [passwordError, setPasswordError] = useState("")

    const [loader, setLoader] = useState(false)
    const [error, setError] = useState("")

    const onSubmitForm = (event) => {
        event.preventDefault()
        if (!passwordError && !emailError && !loader) {
            const input = { email, password }
            postLogin(setLoader, setToken, setError, input)
        }
    }

    useEffect(() => {
        !email && email !== "" ? setEmailError("Campo obrigatório") : setEmailError("")
        !password && password !== "" ? setPasswordError("Campo obrigatório") : setPasswordError("")
    }, [email, password])


    useEffect(() => {
        if (error) {
            toast.error(error)
        }
    }, [error])

    const ShowButton = () => {
        return (
            loader
                ? <s.Button disabled><Loader height={"14px"} width={"14px"} /></s.Button>
                : <s.Button type="submit">Entrar</s.Button>

        )
    }
    
    return (
        <s.Container>
        <s.ContainerForm onSubmit={onSubmitForm}>
            <s.Img src={Logo} alt="ShopLife" />
            <s.Title>Entrar</s.Title>

            <InputSimple
                label="Email"
                placeholder="Digite seu email"
                value={email}
                onChange={setEmail}
                error={emailError}
                type="email"
            />

            <InputSimple
                label="Senha"
                placeholder="Digite sua senha"
                value={password}
                onChange={setPassword}
                error={passwordError}
                type="password"
                min="6"
            />
            <ShowButton />
        
            <s.Separator/>
            <s.SignUpButton onClick={() => signUpNavigation(navigate)}>Criar nova conta</s.SignUpButton>
        </s.ContainerForm>
        </s.Container>

    )
}

export default LoginPage