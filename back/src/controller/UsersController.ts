import { UsersBusiness } from "../business/UsersBusiness";

import { Request, Response } from "express";
import { IInputUserLogin, IInputUserSignUp, IUserAddress } from "../models/Users";

export class UsersController {

    constructor(
        private usersBusiness: UsersBusiness
    ) { }

    public signup = async (req: Request, res: Response) => {

        try {

            const input: IInputUserSignUp = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                cpf: req.body.cpf
            }

            const token = await this.usersBusiness.signup(input)

            res.status(200).send({ token })

        } catch (error) {

            res.status(error.statusCode || 500).send({ error: error.message || error.sqlMessage })

        }
    };

    public login = async (req: Request, res: Response) => {

        try {

            const input: IInputUserLogin = {
                email: req.body.email,
                password: req.body.password
            }

            const token = await this.usersBusiness.login(input)

            res.status(200).send({ token })

        } catch (error) {

            res.status(error.statusCode || 500).send({ error: error.message || error.sqlMessage })

        }
    }

    public addAddress = async (req: Request, res: Response) => {

        try {

            const input: IUserAddress = {
                token: req.headers.authorization as string,
                cep: req.body.cep,
                street: req.body.street,
                number: req.body.number,
                complement: req.body.complement,
                neighbourhood: req.body.neighbourhood,
                city: req.body.city,
                state: req.body.state
            }

            const token = await this.usersBusiness.addAddress(input)

            res.status(200).send({ token })

        } catch (error) {

            res.status(error.statusCode || 500).send({ error: error.message || error.sqlMessage })

        }
    }

    public getAddress = async (req: Request, res: Response) => {

        try {

            const token = req.headers.authorization as string

            const address = await this.usersBusiness.getAddress(token)

            res.status(200).send( address )

        } catch (error) {

            res.status(error.statusCode || 500).send({ error: error.message || error.sqlMessage })

        }
    }

}