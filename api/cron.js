// pages/api/cron.js
import { saveUserDataCron } from "@/utils/action";
import { useAuth } from "@clerk/nextjs";
const { userId } = useAuth();

export default async function cronHandler(req, res) {
  try {
    await saveUserDataCron(userId);
    res.status(200).json({ message: "Cron job executed successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to execute cron job" });
  }
}
