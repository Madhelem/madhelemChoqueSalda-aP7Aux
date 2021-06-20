import User, { IUser } from "../models/user";
import { Request, Response } from "express";
import Post, { IPost } from "../models/post";
import { createToken } from "../libs/serviceToken";

class UserControllers {
    public async index(req: Request, res: Response) {

        const users = await User.find({});    
        res.json({ message: "all users", users });  
       
    }

    public async profile(req: Request, res: Response) {
        const { id,iduser }= req.params;
        const findUserName = await User.findOne({fullname: id});
        const findUserPost = await Post.findOne({iduser});
        /*const findUserName = await User.findOne({fullname: maritza}); NO importa  que  id  te  pase te  voy a pasar maritza */ 
        /*const findUser = await User.findById(id);*/
        res.json({message: "my profile", findUserName, findUserPost });

    }
    
    public async SignUp(req: Request, res: Response) {
        const { fullname , username, email, nick, password,dateReg} = req.body;   
        const nUser = new User(req.body);
        nUser.password = await nUser.encryptPassword(password); 
        await nUser.save();
        res.json({ message: "user registered", nUser });
        res.status(101).end();
    }
    
    public async Login(req: Request, res: Response ){
        const { email, password } = req.body;
        const foundUser = await User.findOne({ email });

        //si es usuario existe
        if (foundUser) {
            if(foundUser.matchPassword(password)){
                const token = createToken(foundUser.id);     
                return res.json({ messsage: "logedIn successfully", foundUser, token});
            }
            res.json({ messsage: "Invalid password"});        
        }
        res.json({ messsage: "Invalid email"});
    }


    public async Edit(req: Request, res: Response) {
        const { id } = req.params;            
        const { fullname , username, email, nick, password,dateReg } = req.body;
        const eUser = await User.findByIdAndUpdate(id, req.body);
        res.json({ message: "Usuario actualizado" });
    }
    public async Delete(req: Request, res: Response) {
        const { id } = req.params;
        const dUser = await User.findByIdAndDelete(id);
        res.json({ message: "Usuario eliminado" });
    }
    
}
export const userControllers = new UserControllers ();
    