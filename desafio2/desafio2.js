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

    getProducts = async() => {
      let consulta =  await fs.readFile(this.path, "utf-8")
      console.log(JSON.parse(consulta))
    }
}

const productos = new ProductManager

/* productos.addProduct('Stich Azul', 'Tejido a crochet', 5000, "", "SA", 20)
productos.addProduct('Stich Rosa', 'Tejido a crochet', 3000, "", "SR", 20) */

productos.getProducts()