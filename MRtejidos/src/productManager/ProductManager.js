import {promises as fs} from "fs";
import {nanoid} from "nanoid";

export default class ProductManager{
    constructor(){
        this.path = "./src/models/products.json"
    }

    readProducts = async() => {
        let consulta =  await fs.readFile(this.path, "utf-8")
        return JSON.parse(consulta)
    };

    writeProducts = async(product) =>{
        await fs.writeFile(this.path, JSON.stringify(product));

    };

    exist = async (id) => {
        let products = await this.readProducts();
        return products.find(product => product.id === id)
    }
    
    addProduct = async(product) => {
        let productsOld = await this.readProducts();
        product.id = nanoid()
        let productAll = [...productsOld, product];
        await this.writeProducts(productAll);
        return "Producto agregado";
    };

    getProducts = async() => {
        return await this.readProducts()
    };

    getProductsById = async(id) => {
        let productById = await this.exist(id)
        if (!productById) return "Producto no encontrado";
        return productById
    };


    updateProducts= async(id, product) => {
        let productById = await this.exist(id);
        console.log(product)
        if (!productById) return "Producto no encontrado";
        await this.deleteProductById(id);
        let productOld = await this.readProducts()
        let products = [{...product, id : id}, ...productOld]
        await this.writeProducts(products)
        return "Producto actualizado" 
    };

    deleteProductById = async (id) =>{
        let products = await this.readProducts();
        let existProducts = products.some(prod => prod.id === id)
        if(existProducts) {
            let filterProducts = products.filter(prod => prod.id != id)
            await this.writeProducts(filterProducts)
            return "Producto eliminado"
        }
        return "Producto inexistente"
    };
}

//const productos = new ProductManager

/* productos.addProduct('Stich Azul', 'Lilo & stich', 5000, 'img1', "SA", 20)
productos.addProduct('Stich Rosa', 'Lilo & stich', 3000, 'img2', "SR", 20)  
productos.addProduct('Bartolito','Granja de zenon', 2000, 'img3', 'B1', 20)
productos.addProduct('Percheron','Granja de zenon', 2300, 'img4', 'P1', 20)
productos.addProduct('Zenon','Granja de zenon', 2800, 'img5', 'Z1', 20) */
//productos.getProducts()

//productos.getProductsById(2)

//productos.deleteProductById(2)

/* productos.updateProducts({
    title:"Stich Azul", 
    description:"Tejido",
    price:7500,
    thumbnail:"img1",
    code:"SA",
    stock:20,
    id:1
})  */