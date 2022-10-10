import { OrdersBusiness } from "../src/business/OrdersBusiness";
import { IInputOrder, IProduct } from "../src/models/Orders";
import { OrdersDatabaseMock } from "./mocks/OrdersDatabaseMock";
import { ProductsDatabaseMock } from "./mocks/ProductsDatabaseMock";
import { DateConversionMock } from "./mocks/services/DateConversionMock";
import { IdGeneratorMock } from "./mocks/services/IdGeneratorMock";


describe("Teste OrdersBusiness", () => {
    const ordersBusiness = new OrdersBusiness(
        new OrdersDatabaseMock(),
        new ProductsDatabaseMock(),
        new IdGeneratorMock(),
        new DateConversionMock()
    )
     
    test("Teste de criação de pedido", async () => {
        expect.assertions(1)

        const input: IInputOrder = {
            userName: "Jonatas", 
            products: [{id: 1, quantity: 1}, {id: 2, quantity: 2}], 
            appointmentDate: "2023-08-01"
        }

        const result = await ordersBusiness.createOrder(input)
        expect(result).toEqual(true)
    })


    test("Teste de erro, parametros faltando", async () => {
        expect.assertions(2)

        const input: IInputOrder = {
            userName: "Jonatas", 
            products: [{id: 1, quantity: 1}, {id: 2, quantity: 2}], 
            appointmentDate: ""
        }

        try {
            await ordersBusiness.createOrder(input)
        } catch (error) {
            expect(error.statusCode).toBe(422)
            expect(error.message).toEqual("userName, products, appointmentDate são obrigatórios")
        }
    })

    test("Teste de erro, userName não é string", async () => {
        expect.assertions(2)

        const input: IInputOrder = {
            userName: 1, 
            products: [{id: 1, quantity: 1}, {id: 2, quantity: 2}], 
            appointmentDate: "2023-08-01"
        } as unknown as IInputOrder

        try {
            await ordersBusiness.createOrder(input)
        } catch (error) {
            expect(error.statusCode).toBe(400)
            expect(error.message).toEqual("userName deve ser uma string")
        }
    })

    test("Teste de erro, products não é array", async () => {
        expect.assertions(2)

        const input: IInputOrder = {
            userName: "Jonatas", 
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
            userName: "Jonatas", 
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
            userName: "Jonatas", 
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
            userName: "Jonatas", 
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

    test("Teste de erro, quantity não é um número", async () => {
        expect.assertions(2)

        const input: IInputOrder = {
            userName: "Jonatas", 
            products: [{id: 1, quantity: "1"}, {id: 2, quantity: 2}] as unknown as IProduct[], 
            appointmentDate: "2023-08-01"
        } as unknown as IInputOrder

        try {
            await ordersBusiness.createOrder(input)
        } catch (error) {
            expect(error.statusCode).toBe(400)
            expect(error.message).toEqual("quantity deve ser um número")
        }
    })

    test("Teste de erro, quantity é menor ou igual a zero", async () => {
        expect.assertions(2)

        const input: IInputOrder = {
            userName: "Jonatas", 
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
            userName: "Jonatas", 
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
            userName: "Jonatas", 
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
            userName: "Jonatas", 
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

    test("Teste getAllOrders", async () => {
        expect.assertions(1)

        const result = await ordersBusiness.getAllOrders()

        expect(result).toEqual([
            {
                id: "id",
                userName: "Jonatas",
                total: 100,
                status: "completed",
                orderDate: "2021-08-01",
                appointmentDate: new Date("2021-08-01T00:00:00.000Z"),
            }
        ])
    });



// getOrderDetailsById 

    test("Teste getOrderDetailsById", async () => {
        expect.assertions(1)

        const result = await ordersBusiness.getOrderDetailsById("id")

        expect(result).toEqual({
            id: "id",
            userName: "Jonatas",
            total: 100,
            status: "completed",
            orderDate: "2021-08-01",
            appointmentDate: new Date("2021-08-01T00:00:00.000Z"),
            products: [
                {
                    productId: "id",
                    name: "name",
                    quantity: 1
                }
            ]
        })
    });


    test("Teste getOrderDetailsById, erro de id é obrigatorio", async () => {
        expect.assertions(2)

        try {
            await ordersBusiness.getOrderDetailsById("")
        } catch (error) {
            expect(error.statusCode).toBe(422)
            expect(error.message).toEqual("id é obrigatório")
        }
    });

    test("Teste getOrderDetailsById, erro de id deve ser uma string", async () => {
        expect.assertions(2)

        try {
            await ordersBusiness.getOrderDetailsById(1 as unknown as string)
        } catch (error) {
            expect(error.statusCode).toBe(400)
            expect(error.message).toEqual("id deve ser uma string")
        }
    });

    test("Teste getOrderDetailsById, erro de Pedido não encontrado", async () => {
        expect.assertions(2)

        try {
            await ordersBusiness.getOrderDetailsById("id2")
        } catch (error) {
            expect(error.statusCode).toBe(404)
            expect(error.message).toEqual("Pedido não encontrado")
        }
    });

});