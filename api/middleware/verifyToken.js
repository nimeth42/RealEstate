import jwt from "jsonwebtoken";


export const verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    if(!token) return res.status(401).json({message: "Not Authenticated!"});
    
    jwt.verify(token, "Jf3@7lP9$Nk2M6vXr8Zw1Bc5#Hd4LqYj", async(err, payload)=>{
        if(err)res.status(403).json({message: "Token is not Valid!"});
        req.userId = payload.id;

        next();
    });
}
