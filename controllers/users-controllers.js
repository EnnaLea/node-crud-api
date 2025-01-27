import User from "../model/user-model.js";


// CRUD

// GET ALL USERS
const getAllUsers = async(req, res, next) =>{
    try {
        const users = await User.findAll();
        res.status(200).json(users);
        
    } catch (err) {
        console.error("Error finding user:", err);
        res.status(500).json({ message: "Internal server error", err });
    }
}

// GET USER BY ID
const getUserById = async(req, res, next) => {
    try {
        const userId = req.params.userId;
        
        const user = await User.findByPk(userId);
        if(!user){
            req.status(404).json({message: "User not found."});
        }

        res.status(200).json({user: user});
        
    } catch (err) {
        console.error("Error finding user:", err);
        res.status(500).json({ message: "Internal server error", err });
    }
}


const createUser = async (req, res) => {
    try {
      console.log("Request Body:", req.body);  // Debug
      const { name, email } = req.body;
  
      if (!name || !email) {
        return res.status(400).json({ message: "Missing required fields: name and email" });
      }
  
      const user = await User.create({ name, email });
  
      res.status(201).json({
        message: "User created successfully!",
        user
      });
    } catch (err) {
      console.error("Error creating user:", err);
      res.status(500).json({ message: "Internal server error", err });
    }
  };


// UPDATE USER
const updateUser = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const updateName = req.body.name;
        const updateEmail = req.body.email;

        const user = await User.findByPk(userId);
        if(!user){
            res.status(404).json({message: "User non found."});
        }

        user.name = updateName;
        user.email = updateEmail;

        await user.save();
        res.status(200).json({message: "User updated successfully", user});

        
    } catch (err) {
        console.error("Error updating user:", err);
        res.status(500).json({ message: "Internal server error", error: err });
    }
}


// DELETE USER
const deleteUser = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        
        const user = await User.findByPk(userId);
        if(!user){
            res.status(404).json({message: "User non found."});
        }

        await user.destroy();
        res.status(200).json({message: "User deleted successfully"});
        
    } catch (err) {
        console.error("Error deleting user:", err);
        res.status(500).json({ message: "Internal server error", error: err });
    }
    
}

export default { getAllUsers, getUserById, createUser, updateUser, deleteUser }
