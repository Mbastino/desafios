class ProductManager{
    constructor(){
        this.products = []
    }

    getProducts(){
        return this.products;
    }
    addProduct(title, description, price, thumbnail, code, stock){
        let id_product = this.getProducts().length;

        let product = {
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock,
            id: ++id_product
        }

        if(!product.title||
            !product.description||
            !product.price||
            !product.thumbnail||
            !product.code||
            !product.stock||
            !product.id
            ){
                console.log('Todos los campos son obligatorios')
            }
        let codigo = this.products.find((prod) => prod.code == product.code)
        if(codigo){
            console.log('El codigo ya existe, ingrese un nuevo codigo')
        }else {
            this.products.push(product);
            return this.products;
        }        
        
    }

    getProductById(id_product){
        let product = this.products.find(product => product.id === id_product)
        if(product){
            return product
        }else{
            return 'Not Found'
        }

    }
}

const product = new ProductManager()
product.addProduct('Stich Azul', 'Tejido a crochet', 5000, "", "SA", 20)

console.log(product.getProductById(1))