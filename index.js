const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const { readdirSync } = require("fs");
const router = express.Router();

const connectDB = require('./config/db')


app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use("/api/v1", router);

const getDirectories = source =>
    readdirSync(source, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

const modules = getDirectories("./src/modules");

modules.forEach(moduleName => {
    const appModule = require(`./src/modules/${moduleName}`);
    if (typeof appModule.configure === "function") {
        router.use(`/${moduleName}`, appModule.configure({ app }));
    }
});

connectDB()

const port = process.env.PORT || 9000;

app.listen(port,()=>{
    console.log(`Server started on port ${port}`)
})