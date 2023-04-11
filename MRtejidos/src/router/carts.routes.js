import { Router } from "express";
import CartManager from "../productManager/CartManager.js"

const CartRouter = Router()
const carts = new CartManager()

CartRouter.post("/", async(req, res) =>{
    res.send(await carts.addCarts())
})




export default CartRouter