import cron from "node-cron";
import Habit from "../models/habit.js";
import { io } from "../server.js";

export const startStreakMonitor = () => {
    // Run every hour — soft-deletes habits that have been in "missed" status for > 24 hours.
    // Uses isDeleted: true instead of hard-deleting so data remains recoverable.
    cron.schedule("0 * * * *", async () => {
        console.log("[Cron] Running streak monitor...");
        try {
            const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

            // Only fetch habits that are missed, NOT already soft-deleted, and overdue
            const habitsToSoftDelete = await Habit.find({
                status: "missed",
                isDeleted: { $ne: true },
                updatedAt: { $lt: twentyFourHoursAgo },
            });

            if (habitsToSoftDelete.length > 0) {
                console.log(`[Cron] Soft-deleting ${habitsToSoftDelete.length} overdue missed habit(s).`);

                for (const habit of habitsToSoftDelete) {
                    const habitId = habit._id;
                    const userId = habit.user;

                    // Soft delete — keeps the document in MongoDB, recoverable by an admin
                    await Habit.findByIdAndUpdate(habitId, {
                        isDeleted: true,
                        deletedAt: new Date(),
                    });

                    console.log(`[Cron] Soft-deleted habit: "${habit.name}" (id: ${habitId})`);

                    // Notify connected clients so the UI removes it immediately
                    io.to(userId.toString()).emit("habit_deleted", { habitId, userId });
                }
            } else {
                console.log("[Cron] No overdue missed habits found.");
            }
        } catch (error) {
            console.error("[Cron] Error in streak monitor:", error);
        }
    });
};
