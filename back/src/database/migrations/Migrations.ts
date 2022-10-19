import { BaseDatabase } from "../BaseDatabase"
import Products from "./products.json"

class Migrations extends BaseDatabase {
    
    execute = async () => {
        try {
            console.log("Creating tables...")
            await this.createTables()
            console.log("Tables created successfully.")

            console.log("Populating tables...")
            await this.insertData()
            console.log("Tables populated successfully.")

            console.log("Migrations completed.")
        } catch (error) {
            console.log("FAILED! Error in migrations...")
            if (error instanceof Error) {
                console.log(error.message)
            }
        } finally {
            console.log("Ending connection...")
            BaseDatabase.connection.destroy()
            console.log("Connection closed graciously.")
        }
    }

    createTables = async () => {
        await BaseDatabase.connection.raw(`
        DROP TABLE IF EXISTS shopping_cart;
        DROP TABLE IF EXISTS order_items;
        DROP TABLE IF EXISTS orders;
        DROP TABLE IF EXISTS address;
        
        DROP TABLE IF EXISTS users;
        DROP TABLE IF EXISTS products;
        
        CREATE TABLE IF NOT EXISTS products(
            id INTEGER PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(255) NOT NULL,
            price FLOAT NOT NULL,
            qty_stock INTEGER NOT NULL
        );
        
        CREATE TABLE IF NOT EXISTS users(
            id VARCHAR(255) PRIMARY KEY NOT NULL,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            role ENUM("normal", "admin") DEFAULT "normal" NOT NULL,
            cpf VARCHAR(255) NOT NULL UNIQUE,
            has_address ENUM("true", "false") DEFAULT "false" NOT NULL,
            status ENUM("active", "inactive") DEFAULT "inactive" NOT NULL
        );

        
        CREATE TABLE IF NOT EXISTS orders(
            id VARCHAR(255) PRIMARY KEY NOT NULL,
            user_id VARCHAR(255) NOT NULL,
            total FLOAT NOT NULL,
            status ENUM("pending", "completed") DEFAULT "pending" NOT NULL,
            order_date DATE NOT NULL,
            appointment_date DATE NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id)
        );

        
        CREATE TABLE IF NOT EXISTS order_items(
            id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
            order_id VARCHAR(255) NOT NULL,
            product_id INTEGER NOT NULL,
            user_id VARCHAR(255) NOT NULL,
            qty INTEGER NOT NULL,
            FOREIGN KEY (order_id) REFERENCES orders(id),
            FOREIGN KEY (product_id) REFERENCES products(id),
            FOREIGN KEY (user_id) REFERENCES users(id)
        );

        CREATE TABLE IF NOT EXISTS shopping_cart(
            id INTEGER PRIMARY KEY AUTO_INCREMENT,
            product_id INTEGER NOT NULL,
            user_id VARCHAR(255) NOT NULL,
            quantity INTEGER NOT NULL,
            FOREIGN KEY (product_id) REFERENCES products(id),
            FOREIGN KEY (user_id) REFERENCES users(id)
        );

        CREATE TABLE IF NOT EXISTS address(
            id VARCHAR(255) PRIMARY KEY NOT NULL,
            street VARCHAR(255) NOT NULL,
            number VARCHAR(255) NOT NULL,
            complement VARCHAR(255),
            neighbourhood VARCHAR(255) NOT NULL,
            city VARCHAR(255) NOT NULL,
            state VARCHAR(255) NOT NULL,
            cep VARCHAR(255) NOT NULL,
            user_id VARCHAR(255) NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id)
        );

       
    `)
    }

    insertData = async () => {
        await BaseDatabase
            .connection("products")
            .insert(Products)
    }
}

const migrations = new Migrations()
migrations.execute()