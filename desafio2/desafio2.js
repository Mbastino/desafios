import {promises as fs} from "fs"

class ProductManager{
    constructor(){
        this.path = "./productos.txt"
        this.products = []

    }
    static id = 0

    addProduct = async(title, description, price, thumbnail, code, stock) => {

        ProductManager.id++

        let newProduct = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            id: ProductManager.id
        }

        this.products.push(newProduct)

        await fs.writeFile(this.path, JSON.stringify(this.products))
    };

    readProducts = async() => {
        let consulta =  await fs.readFile(this.path, "utf-8")
        return JSON.parse(consulta)
    };

    getProducts = async() => {
        let response = await this.readProducts();
        return console.log(response)
    };
    
    getProductsById = async(id) => {
        let productById = await this.readProducts();
        let filter =productById.find(product => product.id === id)

        if (!filter){
            console.log('Producto no encontrado')
        }else {
            console.log(filter)
        }
    };

    deleteProductById = async (id) =>{
        let respuesta = await this.readProducts();
        let productFilter = respuesta.filter(products => products.id != id);
        await fs.writeFile(this.path, JSON.stringify(productFilter));
        console.log("Producto eliminado")
    }

    updateProducts= async({id, ...producto}) => {
        await this.deleteProductById(id);

        let productOld = await this.readProducts()
        let productsModif = [{...producto, id}, ...productOld]
        await fs.writeFile(this.path, JSON.stringify(productsModif))
        console.log("Producto modificado")

    }

}

const productos = new ProductManager

/* productos.addProduct('Stich Azul', 'Tejido', 5000, 'img1', "SA", 20)
productos.addProduct('Stich Rosa', 'Tejido', 3000, 'img2', "SR", 20)  */

//productos.getProducts()

//productos.getProductsById(2)

//productos.deleteProductById(2)

productos.updateProducts({
    title:"Stich Azul", 
    description:"Tejido",
    price:7500,
    thumbnail:"img1",
    code:"SA",
    stock:20,
    id:1
}) 