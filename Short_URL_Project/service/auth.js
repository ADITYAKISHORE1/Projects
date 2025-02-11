import jwt from "jsonwebtoken";
const secret = "Aditya2910";
const setUser= (user)=>{
    return jwt.sign (
        {
            _id: user._id,
            email: user.email,
            role: user.role,
        }, 
        secret
    );
}
const getUser=(token)=>{
    try{
    if(!token) return null;
    return jwt.verify(token,secret);
    }
    catch(err){
        console.error('Token verification failed:', err.message);
    }
}

export {
    setUser, getUser
}