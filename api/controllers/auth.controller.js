import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";
export const register = async (req, res) => {
    const {username,email, password } = req.body;
    //db operations
    
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

    console.log(newUser)
};
export const login = (req, res)=>{
    //db operations
};
export const logout = (req, res)=>{
    //db operations
};
