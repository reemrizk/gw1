//entry point for app

const { PrismaClient } = require('@prisma/client');

require("dotenv").config();
const express = require("express");
// const mongoose = require("mongoose");
const cors = require("cors");
const deviceRoutes = require("./routes/devices");
const checkInRoutes = require("./routes/checkIn");
const prisma = new PrismaClient();

const app = express();

//middleware - 
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // Serve uploaded images - fix later
app.use("/api/devices", deviceRoutes);
app.use("/api/check-in", checkInRoutes);


//connect to mysql
async function startServer(){
    try{
        await prisma.$connect();
        console.log("Connected to MySQL db");

        app.listen(process.env.PORT || 5000, () => {
            console.log(`Server running on http://localhost:${process.env.PORT || 5000}`)
        });
    } catch (err) {
        console.error("Database connection error:", err);
    }
}
// ensures prisma connects to mysql db before starting express server
startServer();


