import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();

export const prisma =
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

app.use(cors())

app.get("/get-room-details/:date", async (req, res) => {
    const reqDate = req.params.date;
    const bookings = await prisma.booking.findMany({
        where: {
            checkinDate: reqDate
        }
    })
    return res.json({bookings})
})

app.listen(3000, () => {
    console.log("Server started at 3000");
})