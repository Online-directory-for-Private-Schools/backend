import { config } from "./configs/config"
import { AppDataSource } from "./data-source"
import express from "express"


let initialize =  async () => {

    const app = express()

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