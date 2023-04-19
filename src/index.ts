import router from "./routes/routes.index"
import { config } from "./configs/config"
import { AppDataSource } from "./data-source"
import express from "express"


let initialize =  async () => {

    const app = express()

    app.use("/", router);

    try {
        await AppDataSource.initialize()

        app.listen(config.port, ()=>{
            console.log("listening on port " + config.port)
        })

        
        console.log("initialized")
    } catch (error) {
        console.log("error", error)
    }
}

initialize()