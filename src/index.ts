import dotenv from "dotenv";
dotenv.config()

import "reflect-metadata";
import router from "./routes/routes.index";
import { config } from "./configs/config";
import { AppDataSource } from "./data-source";
import express, { Request, Response } from "express";
import cors from "cors";

let initialize =  async () => {

    const app = express()
    app.use(express.json())
    app.use(cors())
    

    app.use("/api/v1/", router);

    app.get("/", (req: Request, res: Response) => {
        let resp = "<h1>Welcome to the Course Seeker API</h1>\n"
        resp += `<p>Documentation: <a href="https://course-seeker-api-docs.vercel.app/">https://course-seeker-api-docs.vercel.app/</a></p>`

        res.send(resp)
    })

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