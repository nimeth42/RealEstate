import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";
export const register = async (req, res) => {
    const {username,email, password } = req.body;
    //db operations
    
    try{
    //HASH THE password

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword)
    //CREATE A NEW USER AND SAVE TO DB
    const newUser = await prisma.user.create({
        data: {
            username,
            email,
            password: hashedPassword,
        },
    });

    console.log(newUser);

    res.status(201).json({message: "User created successfully"});
}catch(err){
    console.log(err)
    res.status(500).json({message: "Faild to create user!"});
}
};
export const login = async (req, res)=>{
    const { username, password} = req.body;
    try{
        //Check if the user Exists
        const user = await prisma.user.findUnique({
            where:{username}
        })
    }
    catch(err){
        console.log(first)
        res.status(500).json{message:"Faild to login!"}
    }
};
export const logout = (req, res)=>{
    //db operations
};
