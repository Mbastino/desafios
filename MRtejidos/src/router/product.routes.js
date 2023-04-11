import { Router } from "express";
import ProductManager from "../productManager/ProductManager.js";

const ProductRouter = Router()
const productos = new ProductManager();

ProductRouter.post("/", async (req, res)=>{
    let newProduct = req.body
    res.send(await productos.addProduct(newProduct))
})

ProductRouter.get("/", async (req, res)=>{
    res.send(await productos.getProducts())
})

ProductRouter.get("/:id", async (req, res)=>{
    let id = req.params.id
    res.send(await productos.getProductsById(id))
})

ProductRouter.put("/:id", async (req, res) => {
    let id = req.params.id;
    let updateProduct = req.body
    res.send(await productos.updateProducts(id, updateProduct))
})

ProductRouter.delete("/:id", async (req, res) => {
    let id = req.params.id
    res.send(await productos.deleteProductById(id))
});

export default ProductRouter