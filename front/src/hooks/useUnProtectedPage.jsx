import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { homeNavigation, addressNavigation } from "../routes/Coordinator"
import GlobalContext from "../context/GlobalContext"
import { useContext } from "react"


export const useUnProtectedPage = () => {

    const { states } = useContext(GlobalContext)
    const { token, tokenPayload } = states

    const navigate = useNavigate()

    useEffect(() => {

        // CASO TENHA TOKEN COM ENDEREÇO VAI PARA A HOME(STORE)
        if (token && tokenPayload && tokenPayload.hasAddress === "true") {
            homeNavigation(navigate)
        }

        // CASO TENHA TOKEN SEM ENDEREÇO VAI PARA A PÁGINA DE ENDEREÇO
        if (token && tokenPayload && tokenPayload.hasAddress === "false") {
            addressNavigation(navigate)
        }

    }, [navigate, token, tokenPayload])
}