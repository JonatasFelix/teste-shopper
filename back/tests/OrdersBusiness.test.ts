import { OrdersBusiness } from "../src/business/OrdersBusiness";
import { IInputOrder, IProduct, OrderStatus } from "../src/models/Orders";
import { OrdersDatabaseMock } from "./mocks/OrdersDatabaseMock";
import { ProductsDatabaseMock } from "./mocks/ProductsDatabaseMock";
import { AuthenticatorMock } from "./mocks/services/AuthenticatorMock";
import { DateConversionMock } from "./mocks/services/DateConversionMock";
import { IdGeneratorMock } from "./mocks/services/IdGeneratorMock";
import { UsersDataBaseMock } from "./mocks/UserDatabaseMock";


describe("Teste OrdersBusiness", () => {
    const ordersBusiness = new OrdersBusiness(
        new OrdersDatabaseMock(),
        new ProductsDatabaseMock(),
        new IdGeneratorMock(),
        new DateConversionMock(),
        new AuthenticatorMock(),
        new UsersDataBaseMock()
    )
     
    test("Teste de criação de pedido", async () => {
        expect.assertions(1)

        const input: IInputOrder = {
            token: "valid_token",
            products: [{id: 1, quantity: 1}, {id: 2, quantity: 2}], 
            appointmentDate: "2023-08-01"
        }

        const result = await ordersBusiness.createOrder(input)
        expect(result).toEqual(true)
    })

    test("Teste de criação de pedido sem token", async () => {
        expect.assertions(2)

        const input: IInputOrder = {
            token: "", 
            products: [{id: 1, quantity: 1}, {id: 2, quantity: 2}], 
            appointmentDate: "2023-08-01"
        } 

        try {
            await ordersBusiness.createOrder(input)
        } catch (error) {
            expect(error.statusCode).toBe(422)
            expect(error.message).toEqual("token é obrigatório")
        }
    })

    test("Teste de criação de pedido com token valido mas usuário não encontrado", async () => {
        expect.assertions(2)

        const input: IInputOrder = {
            token: "valid-token-noUser", 
            products: [{id: 1, quantity: 1}, {id: 2, quantity: 2}], 
            appointmentDate: "2023-08-01"
        } 

        try {
            await ordersBusiness.createOrder(input)
        } catch (error) {
            expect(error.statusCode).toBe(401)
            expect(error.message).toEqual("Usuário não encontrado")
        }
    })

    test("Teste de criação de pedido sem endereço cadastrado", async () => {
        expect.assertions(2)

        const input: IInputOrder = {
            token: "noAddress_token", 
            products: [{id: 1, quantity: 1}, {id: 2, quantity: 2}], 
            appointmentDate: "2023-08-01"
        } 

        try {
            await ordersBusiness.createOrder(input)
        } catch (error) {
            expect(error.statusCode).toBe(401)
            expect(error.message).toEqual("Usuário não possui endereço cadastrado")
        }
    })

    test("Teste de criação de pedido com token inválido", async () => {
        expect.assertions(2)

        const input: IInputOrder = {
            token: "invalid_token", 
            products: [{id: 1, quantity: 1}, {id: 2, quantity: 2}], 
            appointmentDate: "2023-08-01"
        } 

        try {
            await ordersBusiness.createOrder(input)
        } catch (error) {
            expect(error.statusCode).toBe(401)
            expect(error.message).toEqual("Token inválido")
        }
    })

    test("Teste de criação de pedido com a quantidade do produto invalida", async () => {
        expect.assertions(2)

        const input: IInputOrder = {
            token: "valid_token", 
            products: [{id: 1, quantity: "a" as unknown as number}, {id: 2, quantity: 2}], 
            appointmentDate: "2023-08-01"
        } 

        try {
            await ordersBusiness.createOrder(input)
        } catch (error) {
            expect(error.statusCode).toBe(400)
            expect(error.message).toEqual("quantity deve ser um número")
        }
    })

    test("Teste de erro, products não é array", async () => {
        expect.assertions(2)

        const input: IInputOrder = {
            token: "valid_token", 
            products: 1, 
            appointmentDate: "2023-08-01"
        } as unknown as IInputOrder

        try {
            await ordersBusiness.createOrder(input)
        } catch (error) {
            expect(error.statusCode).toBe(400)
            expect(error.message).toEqual("products deve ser um array")
        }
    })

    test("Teste de erro, appointmentDate não é string", async () => {
        expect.assertions(2)

        const input: IInputOrder = {
            token: "valid_token", 
            products: [{id: 1, quantity: 1}, {id: 2, quantity: 2}], 
            appointmentDate: 1
        } as unknown as IInputOrder

        try {
            await ordersBusiness.createOrder(input)
        } catch (error) {
            expect(error.statusCode).toBe(400)
            expect(error.message).toEqual("appointmentDate deve ser uma string")
        }
    })

    test("Teste de erro, appointmentDate não é uma data válida", async () => {
        expect.assertions(2)

        const input: IInputOrder = {
            token: "valid_token", 
            products: [{id: 1, quantity: 1}, {id: 2, quantity: 2}], 
            appointmentDate: "bolinha12312:00:00"
        }

        try {
            await ordersBusiness.createOrder(input)
        } catch (error) {
            expect(error.statusCode).toBe(400)
            expect(error.message).toEqual("appointmentDate deve ser uma data válida")
        }
    })

    test("Teste de erro, appointmentDate não é uma data futura", async () => {
        expect.assertions(2)

        const input: IInputOrder = {
            token: "valid_token", 
            products: [{id: 1, quantity: 1}, {id: 2, quantity: 2}], 
            appointmentDate: "2020-08-01"
        }

        try {
            await ordersBusiness.createOrder(input)
        } catch (error) {
            expect(error.statusCode).toBe(400)
            expect(error.message).toEqual("appointmentDate deve ser uma data futura")
        }
    })

    test("Teste de erro, quantity é menor ou igual a zero", async () => {
        expect.assertions(2)

        const input: IInputOrder = {
            token: "valid_token",
            products: [{id: 1, quantity: 0}, {id: 2, quantity: 2}], 
            appointmentDate: "2023-08-01"
        }

        try {
            await ordersBusiness.createOrder(input)
        } catch (error) {
            expect(error.statusCode).toBe(400)
            expect(error.message).toEqual("quantity deve ser maior que 0")
        }
    })
   
    test("Teste de erro, produto não encontrado", async () => {
        expect.assertions(2)

        const input: IInputOrder = {
            token: "valid_token",
            products: [{id: 3, quantity: 1}, {id: 2, quantity: 2}], 
            appointmentDate: "2023-08-01"
        }

        try {
            await ordersBusiness.createOrder(input)
        } catch (error) {
            expect(error.statusCode).toBe(404)
            expect(error.message).toEqual(`Produto com id 3 não encontrado`)
        }
    })

    test("Teste de erro, produto fora de estoque", async () => {
        expect.assertions(2)

        const input: IInputOrder = {
            token: "valid_token",
            products: [{id: 4, quantity: 10}], 
            appointmentDate: "2023-08-01"
        }

        try {
            await ordersBusiness.createOrder(input)
        } catch (error) {
            expect(error.statusCode).toBe(400)
            expect(error.message).toEqual("Produto 4 está esgotado")
        }
    })

    test("Teste de erro, produto possui quantidade insuficiente", async () => {
        expect.assertions(2)

        const input: IInputOrder = {
            token: "valid_token", 
            products: [{id: 1, quantity: 30}], 
            appointmentDate: "2023-08-01"
        }

        try {
            await ordersBusiness.createOrder(input)
        } catch (error) {
            expect(error.statusCode).toBe(400)
            expect(error.message).toEqual("Produto 1 possui apenas 10 unidades em estoque")
        }
    })

// getAllOrders 

    test("Teste getAllOrders", async () => {
        expect.assertions(1)

        const result = await ordersBusiness.getAllOrders("valid_token",)

        expect(result).toEqual([
            {
                id: "id1",
                userName: "name",
                total: 100,
                status: OrderStatus.PENDING,
                orderDate: "2021-01-01",
                appointmentDate: "2021-01-01"
            }
        ])
    });


    test("Teste getAllOrders, sem token", async () => {
        expect.assertions(2)

        const token = ""

        try {
            await ordersBusiness.getAllOrders(token)
        } catch (error) {
            expect(error.statusCode).toBe(422)
            expect(error.message).toEqual("token é obrigatório")
        
        }
    });

    test("Teste getAllOrders, token inválido", async () => {
        expect.assertions(2)

        const token = "invalid_token"

        try {
            await ordersBusiness.getAllOrders(token)
        } catch (error) {
            expect(error.statusCode).toBe(401)
            expect(error.message).toEqual("Token inválido")
        }
    });


    test("Teste getAllOrders, token valido mas usuário não encontrado", async () => {
        expect.assertions(2)

        const token = "valid-token-noUser"

        try {
            await ordersBusiness.getAllOrders(token)
        } catch (error) {
            expect(error.statusCode).toBe(401)
            expect(error.message).toEqual("Usuário não encontrado")
        }
    });

    test("Teste getAllOrders, usuario sem endereço", async () => {
        expect.assertions(2)

        const token = "noAddress_token"

        try {
            await ordersBusiness.getAllOrders(token)
        } catch (error) {
            expect(error.statusCode).toBe(401)
            expect(error.message).toEqual("Usuário não possui endereço cadastrado")
        }
    });

    test("Teste getAllOrders, usuario sem compras", async () => {
        const token = "noBuys_token"

        const rexult = await ordersBusiness.getAllOrders(token)

        expect(rexult).toEqual([])
    });



// getOrderDetailsById 

    test("Teste getOrderDetailsById", async () => {
        expect.assertions(1)

        const result = await ordersBusiness.getOrderDetailsById({token: "valid_token", id: "id1"})

        expect(result).toEqual({
            id: "id1",
            userName: "name",
            total: 100,
            status: "pending",
            orderDate: "2021-01-01",
            appointmentDate: "2021-01-01",
            products: [
                {
                    price: 100,
                    productName: "name",
                    quantity: 1
                }
            ]
        })
    });


    test("Teste getOrderDetailsById, erro de id é obrigatorio", async () => {
        expect.assertions(2)

        try {
            await ordersBusiness.getOrderDetailsById({token: "valid_token", id: ""})
        } catch (error) {
            expect(error.statusCode).toBe(422)
            expect(error.message).toEqual("id é obrigatório")
        }
    });

    test("Teste getOrderDetailsById, erro de id deve ser uma string", async () => {
        expect.assertions(2)

        try {
            await ordersBusiness.getOrderDetailsById({
                token: "valid_token", 
                id:1 as unknown as string
            })
        } catch (error) {
            expect(error.statusCode).toBe(400)
            expect(error.message).toEqual("id deve ser uma string")
        }
    });

    test("Teste getOrderDetailsById, erro de Pedido não encontrado", async () => {
        expect.assertions(2)

        try {
            await ordersBusiness.getOrderDetailsById({
                token: "valid_token", 
                id: "id2"
            })
        } catch (error) {
            expect(error.statusCode).toBe(404)
            expect(error.message).toEqual("Pedido não encontrado")
        }
    });

    test("Teste getOrderDetailsById, erro de token é obrigatorio", async () => {
        expect.assertions(2)

        try {
            await ordersBusiness.getOrderDetailsById({
                token: "", 
                id: "id2"
            })
        } catch (error) {
            expect(error.statusCode).toBe(422)
            expect(error.message).toEqual("token é obrigatório")
        }
    });

    test("Teste getOrderDetailsById, erro de token invalido", async () => {
        expect.assertions(2)

        try {
            await ordersBusiness.getOrderDetailsById({
                token: "invalid_token", 
                id: "id2"
            })
        } catch (error) {
            expect(error.statusCode).toBe(401)
            expect(error.message).toEqual("Token inválido")
        }
    });

    test("Teste getOrderDetailsById, erro de usuario não encontrado", async () => {
        expect.assertions(2)

        try {
            await ordersBusiness.getOrderDetailsById({
                token: "valid-token-noUser", 
                id: "id2"
            })
        } catch (error) {
            expect(error.statusCode).toBe(401)
            expect(error.message).toEqual("Usuário não encontrado")
        }
    });

    test("Teste getOrderDetailsById, erro de usuario sem endereço", async () => {
        expect.assertions(2)

        try {
            await ordersBusiness.getOrderDetailsById({
                token: "noAddress_token", 
                id: "id2"
            })
        } catch (error) {
            expect(error.statusCode).toBe(401)
            expect(error.message).toEqual("Usuário não possui endereço cadastrado")
        }
    });

});