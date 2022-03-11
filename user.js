app.post("/login",(req,res)=>{
    knex.select("*").from("User").then((data)=>{
        for(i of data){
            if(i.email==req.body.email && i.password== req.body.password)
            res.send("login")
            else{
                return res.send("feild")
            }
        }
    }).catch((err)=>{
        res.send(err)
    })
})