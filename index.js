const express=require("express");
const app=express();
const path=require("path");
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));

app.set("view engine","ejs");
app.listen(8080,()=>{
    console.log("listening");
})
app.get("/",(req,res)=>{
    res.send("working");
})
const Chat=require("./models/chat");

const mongoose = require('mongoose');

main()
.then(()=>{
    console.log("connection succesfull")
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}
app.get("/chats", async (req, res) => {
    try {
        const allchat = await Chat.find();  // Safe async fetch
        res.render("index.ejs", { allchat });  // Pass clean data
    } catch (err) {
        res.send("Error loading chats");
    }
});
app.get("/chats/create",async(req,res)=>{
    res.render("create.ejs");
})
app.post("/chats/create",async(req,res)=>{
    let {from,to,msg}=req.body;
    await Chat.create({ from, to, msg });
    res.redirect("/chats");

})
app.get("/chats/edit/:id",(req,res)=>{
    let {id}=req.params;
    res.render("edit.ejs",{id});
})
app.post("/chats/:id",async(req,res)=>{
    let {id}=req.params;
    let {newmessage}=req.body;
    await Chat.findByIdAndUpdate(id,{msg:newmessage});
    res.redirect("/chats");
})
app.get("/chats/delete/:id",async(req,res)=>{
    let {id}=req.params;
    await Chat.findOneAndDelete(id);
    res.redirect("/chats");
})
