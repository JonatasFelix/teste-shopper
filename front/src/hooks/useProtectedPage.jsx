import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { loginNavigation, addressNavigation } from "../routes/Coordinator"
import GlobalContext from "../context/GlobalContext"
import { useContext } from "react"


export const useProtectedPage = () => {

    const { states } = useContext(GlobalContext)
    const { token, tokenPayload } = states

    const navigate = useNavigate()

    useEffect(() => {

        // CASO NÃO TENHA TOKEN VAI PARA A PÁGINA DE LOGIN
        if (!token && !tokenPayload) {
            loginNavigation(navigate)
        }

        // CASO TENHA TOKEN SEM ENDEREÇO VAI PARA A PÁGINA DE ENDEREÇO
        if (token && tokenPayload && tokenPayload.hasAddress === "false") {
            addressNavigation(navigate)
        }

    }, [navigate, token, tokenPayload])
}