import jwt from "jsonwebtoken";


export const shouldBeLoggedIn = async (req,res)=>{
    const token = req.cookies.token;

    if(!token) return res.status(401).json({message: "Not Authenticated!"});
    
    jwt.verify(token, "Jf3@7lP9$Nk2M6vXr8Zw1Bc5#Hd4LqYj", async(err, payload)=>{
        if(err)res.status(403).json({message: "Token is not Valid!"});
    })

    res.status(200).json({message: "You are Authenticated"});

};  

export const shouldBeAdmin = async (req,res)=>{
    const token = req.cookies.token;

    if(!token) return res.status(401).json({message: "Not Authenticated!"});
    
    jwt.verify(token, "Jf3@7lP9$Nk2M6vXr8Zw1Bc5#Hd4LqYj", async(err, payload)=>{
        if(err)res.status(403).json({message: "Token is not Valid!"});
        if(!payload.isAdmin){
            return res.status(403).json({message: "Not Autorized!"});
        }
    })

    res.status(200).json({message: "You are Authenticated"});

};

