const express = require("express");
const app = express();
const mongoose = require("mongoose")
const cors = require("cors")
const PORT = 3000
app.use(cors())
app.use(express.json())
mongoose.connect("mongodb+srv://Ayush:1US2Ge9pwIXnlzr6@cluster.rd3tdse.mongodb.net/expense",{
        useNewUrlParser: true,
        useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error",(error)=>{
    console.log("Error occured:", error)
})
db.once("open",()=>{
    console.log("mongo Db Connected");
})

const expenseSchema = new mongoose.Schema({
    description:{type:String,required:true},
    amount:{type:Number, required:true}
})
const expense = mongoose.model("Expense",expenseSchema);

app.get('/expenses',async(req,res)=>{
    try{
        const expenseAll = await expense.find();
        res.json(expenseAll)
    }
    catch(e){
        console.error("Error saving expense:", e);
        res.status(500).json({ message: "Internal Server Error" });
    }
})

app.post('/expenses',async(req,res)=>{
    const{description,amount} = req.body;
    try{
    if(!description || !amount){
        return res.status(400).send({
            message:"description and amount is required"
        })
    }
    const newExpense = new expense({description,amount});
    await newExpense.save();
    res.json(newExpense)
    }
    catch(e){
        console.error("Error saving expense:", e);
        res.status(500).json({ message: "Internal Server Error" });
    }
})
app.listen(PORT, ()=>{
    console.log(`Server is listening at ${PORT}`)
})