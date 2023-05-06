import dotenv from "dotenv"
dotenv.config()

import "reflect-metadata";
import router from "./routes/routes.index"
import { config } from "./configs/config"
import { AppDataSource } from "./data-source"
import express from "express"
import { runSeeders } from "typeorm-extension"
import cors from "cors"

let initialize =  async () => {

    const app = express()
    app.use(express.json())
    app.use(cors())
    

    app.use("/", router);

    try {
        await AppDataSource.initialize()

        // await runSeeders(AppDataSource)

        app.listen(config.port, ()=>{
            console.log("listening on port " + config.port)
        })

        
        console.log("initialized")
    } catch (error) {
        console.log("error", error)
    }
}

initialize()