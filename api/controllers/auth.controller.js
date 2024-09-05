import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

export const register = async (req, res) => {
    const {username,email, password } = req.body;
    //db operations
    
    try{
    //HASH THE password

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
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
            where:{username},
        });

        if(!user) return res.status(401).json({message:"Invali User name!"});
        //Check if the password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if(!isPasswordValid) 
            return res.status(401).json({message:"Invali Password!"});
       
        //res.setHeader("Set-Cookie", "test=" + "myValue").json("Success")
        const age = 1000 * 60 * 24 * 7;

        const token = jwt.sign({
            id:user.id,
            isAdmin: false,
        }, "Jf3@7lP9$Nk2M6vXr8Zw1Bc5#Hd4LqYj",
        {expiresIn: age}
        );

        const {password: userPassword, ...userInfo} = user
        res
        .cookie("token", token, {
            httpOnly:true,
            //secure:true
            maxAge: age,
        })
        .status(200)
        .json({userInfo});
    
    }
    catch(err){
        console.log(err)
        res.status(500).json({message:"Faild to login!"})
    }
};

export const logout = (req, res)=>{
    res.clearCookie("token").status(200).json({message: "Logout Successfully"})
};
