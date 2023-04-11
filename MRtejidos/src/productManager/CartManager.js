import {promises as fs} from "fs";
import {nanoid} from "nanoid";

class CartManager{
    constructor(){
        this.path = "./src/models/carts.json"
    }

    readProducts = async() => {
        let consulta =  await fs.readFile(this.path, "utf-8")
        return JSON.parse(consulta)
    };

    writeProducts = async(cart) =>{
        await fs.writeFile(this.path, JSON.stringify(cart));

    };

    addCarts = async () => {
        let cartsOld = await this.readProducts();
        let id = nanoid();
        let cartsContat = [{id:id, products : []}, ...cartsOld];
        await this.writeProducts(cartsContat);
        return "Carrito agregado"
    }
}

export default CartManager
