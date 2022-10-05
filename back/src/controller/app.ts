import express from 'express'
import cors from 'cors'
import dotenv from "dotenv"
import { AddressInfo } from "net"

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

const server = app.listen(process.env.PORT || 3003, () => {
    if (server) {
        const address = server.address() as AddressInfo
        console.log(`Servidor rodando na porta ${address.port}`)
    } else {
        console.error(`Falha ao rodar o servidor.`)
    }
})

export default app