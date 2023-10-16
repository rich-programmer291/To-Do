import express from "express";
import bodyParser from "body-parser";
import {dirname} from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const app = express();
const port = 3000;
const dir = dirname(fileURLToPath(import.meta.url));

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req,res)=>{
    res.render("index.ejs");
});

app.post("/",(req,res)=>{
    const task = `<div class="item"><input type="checkbox"><p> ${req.body["newItem"]} </p></div><hr>`;
    console.log(dir+'/views/storage/today_list.ejs');
    fs.appendFileSync("views/storage/today_list.ejs",task,(err)=>{
        if (err) throw err;
        console.log(`File changed successfully.`);
    });
    req.body["newItem"] ="";
    res.render("index.ejs");
});

app.get("/work",(req,res)=>{
    res.render("work.ejs");
});

app.post("/work",(req,res)=>{
    const task = `<div class="item"><input type="checkbox"><p> ${req.body["newItem"]} </p></div><hr>`;
    console.log(dir+'/views/storage/work_list.ejs');
    fs.appendFileSync("views/storage/work_list.ejs",task,(err)=>{
        if (err) throw err;
        console.log(`File changed successfully.`);
    });
    req.body["newItem"] ="";
    res.render("work.ejs");
});


app.listen(port,()=>{
    console.log(`${port} is Online.`);
});