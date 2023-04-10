import express from "express"
import ProductManager from "./productManager/ProductManager.js"

const app = express();
app.use(express.json)
app.use(express.urlencoded({extended : true}));

const PORT = 8080;
app.listen(PORT, () => {
    console.log('Servidor funcionando en el : ' + PORT)
})

const productos = new ProductManager();
const readProducts = productos.readProducts()

app.get("/products", async (req, resp) => {

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
})