const express = requiere('express')
const jwt = requiere("jsonwebtoken")
const api = express()
const PORT = 3000



const users = [{
    name:"Georges",password:"password1"
},
{
    name:"Leo", password:"password"
}
]

api.use(express.json())

api.post("/login",(req,res)=>{
    const name = req.body.name
    const password = req.body.password

    const user= users.find((user)=>user.name == name && user.password == password)

        if(user){
            // generate
            const token = jwt.sign({name:user.name},"SECRETKEY")
            res.json({success:true,token:token})
        }else{
            // reponse avec authentification
            res.json({success:false,mesage: "desole"})
        }

})

api.listen(3000, ()=>{
    console.log(`serveur running in ${PORT}`)
    })