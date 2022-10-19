import * as s from "./styles";
import { useUnProtectedPage } from "../../hooks/useUnProtectedPage";
import InputSimple from "../../components/Forms/InputSimple";
import { useState, useContext, useEffect } from "react";
import { cpfChecker } from "../../assets/utils/cpfChecker";
import { postNewAccount } from "../../services/Users/postNewAccount";
import GlobalContext from "../../context/GlobalContext";
import { toast } from "react-toastify";
import Loader from "../../components/Loader/Loader"
import Logo from "../../assets/imgs/logo.png";
import { loginNavigation } from "../../routes/Coordinator";
import { useNavigate } from "react-router-dom";


const SignupPage = () => {
    useUnProtectedPage();

    const navigate = useNavigate();

    const { setters } = useContext(GlobalContext);
    const { setToken } = setters;

    const [error, setError] = useState(false);
    const [loader, setLoader] = useState(false);

    const [name, setName] = useState("");
    const [nameError, setNameError] = useState(false);

    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(false);

    const [cpf, setCpf] = useState("");
    const [cpfError, setCpfError] = useState(false);

    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);

    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);

    const onSubmitForm = (e) => {
        e.preventDefault();

        let error = false;

        if (cpf.length < 11 || !cpfChecker(cpf)) {
            setCpfError("Digite um CPF válido");
            error = true;
        }

        if (!/^([a-zA-ZÀ-ú]+[ ][a-zA-ZÀ-ú]+)*$/.test(name)) {
            setNameError("Nome e sobrenome são obrigatórios");
            error = true;
        }

        if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email)) {
            setEmailError("E-mail inválido");
            error = true;
        }

        if (password !== confirmPassword) {
            setPasswordError("Senhas não conferem");
            setConfirmPasswordError("Senhas não conferem");
            error = true;
        }

        if (password.length < 6) {
            setPasswordError("A senha deve ter no mínimo 6 caracteres");
            error = true;
        }


        if (!error && !loader) {
            const input = { name, email, password, cpf };
            postNewAccount(setLoader, setToken, setError, input);
        }

    }

    const handleCpf = (value) => {
        if (!isNaN(value) && value.length <= 11) {
            setCpfError(false);
            setCpf(value);
        }
    }

    useEffect(() => {
        if (error) {
            toast.error(error);
            setError(false);
        }
    }, [error]);

    const ShowButton = () => {
        if (loader) {
            return (<s.Button disabled><Loader height={"14px"} width={"14px"} /></s.Button>)
        } else {
            return (<s.Button type="submit">Cadastrar</s.Button>)
        }
    }

    return (
        <s.Container>
            <s.ContainerForm onSubmit={onSubmitForm}>
                <s.Img src={Logo} alt="Logo" />
                <s.Title>Cadastrar</s.Title>
                <InputSimple
                    label="Nome"
                    placeholder="Nome e sobrenome"
                    value={name}
                    onChange={setName}
                    error={nameError}
                    type="text"
                    required={true}
                    min={3}
                    max={50}
                />

                <InputSimple
                    label="E-mail"
                    placeholder="E-mail"
                    value={email}
                    onChange={setEmail}
                    error={emailError}
                    type="email"
                    required={true}
                    min={3}
                    max={50}
                />

                <InputSimple
                    label="CPF"
                    placeholder="00000000000"
                    value={cpf}
                    onChange={handleCpf}
                    error={cpfError}
                    type="number"
                    required={true}
                    min={11}
                    max={11}
                />

                <InputSimple

                    label="Senha"
                    placeholder="Mínimo 6 caracteres"
                    value={password}
                    onChange={setPassword}
                    error={passwordError}
                    type="password"
                    required={true}
                    min={6}
                    max={50}
                />

                <InputSimple
                    label="Confirmar"
                    placeholder="Confirme a senha anterior"
                    value={confirmPassword}
                    onChange={setConfirmPassword}
                    error={confirmPasswordError}
                    type="password"
                    required={true}
                    min={6}
                    max={50}
                />

                <s.HaveAccount>Já tem uma conta?
                    <s.EnterButton onClick={() => loginNavigation(navigate)}> Entrar</s.EnterButton>
                </s.HaveAccount>

                <ShowButton />

            </s.ContainerForm>
        </s.Container>
    );
};

export default SignupPage;