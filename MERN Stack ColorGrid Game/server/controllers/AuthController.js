
import User from '../models/Users.js';
import { generateToken } from '../utils/auth.js';


const signUp = async (req, res) => {
  const { username, password, profilePic } = req.body;
  console.log("profile pic ere is  ", profilePic)
  try {

    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    
    const user = await User.create({
      username,
      password,
      profilePic: profilePic || ''
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        username: user.username,
        profilePic: profilePic,
        coins: user.coins,
        token: generateToken(user._id)
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    
    if (user && (await user.comparePassword(password))) {
      res.json({
        _id: user._id,
        username: user.username,
        coins: user.coins,
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export { signUp, login };