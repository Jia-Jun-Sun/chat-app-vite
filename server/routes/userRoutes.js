import express, { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.model.js";

dotenv.config();
const router = express.Router();


// Defines a http POST route at /signup that allows the client to create a new user
router.post("/signup", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // checks if user already exist in our User database
        const existingUser = User.findOne({ username }); // Uses Mongoose’s findOne() to check if a user with the same username already exists in MongoDB
        if (existingUser) return res.status(400).json({ error: "Username already exist." });

        // Hash the password before saving
        const salt = await bcrypt.genSalt(10); // Generates a salt (a random string) to strengthen the hash
        const hashedPassword = await bcrypt.hash(password, hash); // hash the password using the salt

        // Create new user
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save(); // saves the new user we just created to MongoDB database

        // Generate JWT Token
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expires_in:"1h" });




        res.status(201).json({ user: newUser, token }); // sends the newly created user back to the client as a JSON format
    } catch (err) {
        res.status(500).json({ errorMessage: err.message, errorType: err.name }); // send  the error's message and type
    }
});



// Handles Logging in
router.post('signin', async (req, res) => {
    try {
        // takes in the user's username or email, and password
        const { username, email, password } = req.body;

        // check if user exisit by checking the username OR email entered by the client matches the one we have in the database
        const user = await User.findOne({
            $or: [{ username }, {email}] // using Mongodb's $or logical or operator to look for a match in either field, finds a user by username or email
        });

        if (!user) return res.status(400).json({ error: "No user with that username or email exists, double check your spelling or create a new user" });

        // compare it with the hashed password when they signed up
        const isMatch = await bcrypt.compare(password, user.password); // Uses bcrypt.compare() to check if the entered password matches the stored (hashed) password. password is what the client entered, user.password is the hashed password stored inside Mongodb
        if (!isMatch) return res.status(400).json({ error: "Wrong password... please please please try again" });

        // if it matches, generate a JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expires_in:"1h" });

        // send the response
        res.json({ user, token }); // send the user and the token back the client to display
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



// This route allows you to fetch all users stored in the database (for testing purposes, we don't really need this)
router.get('/', async (req, res) => {
   try {
       const users = await User.find(); // Queries the database to find ALL users
       res.json(users); // sends all the users back a JSON response
   } catch (err) {
       res.status(500).json({ error: err.message });
   }
});

export default router;