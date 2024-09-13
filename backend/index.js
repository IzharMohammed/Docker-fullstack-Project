import { PrismaClient } from "@prisma/client";
import express from "express";

const app = express();
const prisma = new PrismaClient();
app.use(express.json()); // Middleware to parse JSON request bodies

// CORS middleware to allow cross-origin requests
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Allowed HTTP methods
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Allow specific headers
    next();
});

// Test route to check if the API is working
app.get('/test', (req, res) => {
    try {
        res.status(200).json({ msg: "Api working" }) // Success response
    } catch (error) {
        res.status(500).json({ msg: "Some error in api" }) // Error response
    }
});

// Route to get all users
app.get('/users', async (req, res) => {
    try {
        const users = await prisma.user.findMany(); // Fetch all users from the database
        res.status(200).json({ users }); // Send users as response
    } catch (error) {
        res.status(500).json({ status: 'error', msg: "Error fetching users" }); // Error handling
    }
});

// Route to get a single user by ID
app.get('/users/:id', async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(req.params['id']) // Convert ID to integer and find user
            }
        })
        if (!user) {
            return res.status(404).json({ status: 'error', msg: 'User not found' }); // User not found response
        }
        res.status(200).json({ user }) // Success response with user data
    } catch (error) {
        res.status(500).json({ status: 'error', msg: `Error fetching user: ${error.message}` }) // Error handling
    }
});

// Route to create a new user
app.post('/users', async (req, res) => {
    try {
        const { name, email } = req.body; // Get name and email from request body
        if (!name || !email) {
            res.status(400).json({ status: 'error', msg: 'name or email are missing' }) // Validation error
        }
        const users = await prisma.user.create({
            data: {
                name,
                email // Create a new user with provided name and email
            }
        })
        res.status(200).json({ status: 'success', msg: 'User added successfully' }) // Success response
    } catch (error) {
        res.status(500).json({ status: 'error', msg: `${error}` }) // Error handling
    }
});

// Route to update a user based on email
app.post('/updateUser', async (req, res) => {
    try {
        const { email, name } = req.body; // Get email and name from request body
        if (!email || !name) {
            res.status(400).json({ status: 'error', msg: 'Email and name are required' }); // Validation error
        }
        const userExist = await prisma.user.findFirst({
            where: { email } // Check if user exists by email
        })
        if (!userExist) {
            res.status(404).json({ status: 'error', msg: 'User not found' }); // User not found error
        }
        const user = await prisma.user.update({
            where: {
                id: userExist.id, email // Update user using ID and email
            },
            data: { name } // Update the user's name
        })
        res.status(200).json({ status: 'success', msg: 'Updated successfully' }) // Success response
    } catch (error) {
        res.status(500).json({ status: 'error', msg: `Error updating user: ${error.message}` }); // Error handling
    }
})

// Route to delete a user by ID
app.delete('/user/:id', async (req, res) => {
    const id = req.params['id']; // Get ID from request params
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(id) // Convert ID to integer and find user
            }
        })
        if (!user) {
            return res.status(404).json({ status: 'error', msg: 'User not found' }) // User not found error
        }

        await prisma.user.delete({
            where: {
                id: parseInt(id) // Delete user by ID
            }
        })

        res.status(200).json({ status: 'success', msg: `removed successfully` }) // Success response
    } catch (error) {
        res.status(500).json({ status: 'error', msg: `Error deleting user: ${error.message}` }) // Error handling
    }
})

// Start the Express server on port 3000
app.listen(8000, () => {
    console.log('server is up!!!'); // Log when the server is running
})
