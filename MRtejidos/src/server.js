import express from "express"
import ProductManager from "./productManager/ProductManager.js";

const productos = new ProductManager();

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended : true}));

app.post("/products", async (req, res)=>{
    let newProduct = req.body
    res.send(await productos.addProduct(newProduct))
})

app.get("/products", async (req, res)=>{
    res.send(await productos.getProducts())
})

app.get("/products/:id", async (req, res)=>{
    let id = req.params.id
    res.send(await productos.getProductsById(id))
})

app.put("/products/:id", async (req, res) => {
    let id = req.params.id;
    let updateProduct = req.body
    res.send(await productos.updateProducts(id, updateProduct))
})

app.delete("/products/:id", async (req, res) => {
    let id = req.params.id
    res.send(await productos.deleteProductById(id))
})

const PORT = 8080;
app.listen(PORT, () => {
    console.log('Servidor funcionando en el : ' + PORT)
})

/* const readProducts = productos.readProducts() */

/* app.get("/products", async (req, resp) => {

    let limit = parseInt(req.query.limit);
    if (!limit) return resp.send(await readProducts);
    let allProducts = await readProducts;
    let productLimit = allProducts.slice(0, limit)
    resp.send(productLimit)
})

app.get("/products/:id", async (req, resp) => {
    let id = parseInt(req.params.id);
    let allProducts = await readProducts;
    let productById = allProducts.find(product => product.id === id);
    resp.send(productById)
}) */