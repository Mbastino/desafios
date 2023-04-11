import express from "express"
import ProductRouter from "./router/product.routes.js";

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended : true}));

app.use("/products", ProductRouter)

const PORT = 8080;
app.listen(PORT, () => {
    console.log('Servidor funcionando en el : ' + PORT)
})
