import { Router } from 'express'
import { UsersBusiness } from '../business/UsersBusiness'
import { UsersController } from '../controller/UsersController'
import { UsersDataBase } from '../database/UsersDataBase'
import { Authenticator } from '../services/AuthenticatorData'
import { CpfValidator } from '../services/CpfValidator'
import { EmailValidator } from '../services/EmailValidator'
import { HashManager } from '../services/HashManager'
import { IdGenerator } from '../services/IdGenerator'



export const usersRouter = Router()

const usersController = new UsersController(
    new UsersBusiness(
        new UsersDataBase(),
        new IdGenerator(),
        new HashManager(),
        new Authenticator(),
        new EmailValidator(),
        new CpfValidator()
    )
)


usersRouter.post('/signup', usersController.signup)
usersRouter.post('/login', usersController.login)
usersRouter.post('/address', usersController.addAddress)
usersRouter.get('/address', usersController.getAddress)

