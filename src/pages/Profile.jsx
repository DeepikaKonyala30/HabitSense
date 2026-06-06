import React, { useState, useEffect } from "react";
import { Camera } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import useHabits from "../hooks/useHabits";

const Profile = () => {
  const { user, updateUser } = useAuth();
  const { habits } = useHabits();

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setBio(user.bio || "");
    }
  }, [user]);

  // 🔹 Calculate today date
  const today = new Date().toISOString().split("T")[0];

  // 🔹 Completed Today
  const completedToday = habits.filter((habit) =>
    habit.completedDates?.includes(today)
  ).length;

  // 🔹 Total Completed
  const totalCompleted = habits.reduce(
    (acc, habit) => acc + (habit.completedDates?.length || 0),
    0
  );

  // 🔹 Longest Streak
  const longestStreak = Math.max(
    0,
    ...habits.map((habit) => habit.streak || 0)
  );

  // 🔹 Current Streak (sum of active streaks)
  const streakCount = habits.reduce(
    (acc, habit) => acc + (habit.streak || 0),
    0
  );

  // 🔹 Completion Rate
  const completionRate =
    habits.length === 0
      ? "0%"
      : `${Math.round((completedToday / habits.length) * 100)}%`;

  const handleSave = async () => {
    try {
      setSaving(true);
      await updateUser({ name, bio });
    } catch (err) {
      console.error("Save failed:", err);
    } finally {
      setSaving(false);
    }
  };

  // 🔹 Dynamic Badges
  const unlockedBadges = [];
  if (longestStreak >= 7) unlockedBadges.push("7-Day Warrior");
  if (longestStreak >= 30) unlockedBadges.push("30-Day Master");
  if (completedToday === habits.length && habits.length > 0)
    unlockedBadges.push("Perfect Day");

  const allBadges = ["7-Day Warrior", "30-Day Master", "Perfect Day"];

  const lockedBadges = allBadges.filter(
    (badge) => !unlockedBadges.includes(badge)
  );

  return (
    <div className="p-6">
      {/* ================= PROFILE HEADER ================= */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <div className="flex items-center space-x-6">
          {/* Avatar */}
          <div className="relative">
            {user?.profileImage ? (
              <img
                src={user.profileImage}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover border-4 border-white"
              />
            ) : (
              <div className="w-20 h-20 bg-neutral-200 rounded-full border-4 border-white flex items-center justify-center text-neutral-500 text-2xl font-bold">
                {user?.name?.[0]?.toUpperCase() || "U"}
              </div>
            )}

            {/* Upload Input */}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="profileUpload"
              onChange={(e) => {
                const file = e.target.files[0];
                if (!file) return;

                const reader = new FileReader();
                reader.onloadend = async () => {
                  await updateUser({ profileImage: reader.result });
                };
                reader.readAsDataURL(file);
              }}
            />

            <label
              htmlFor="profileUpload"
              className="absolute bottom-0 right-0 bg-primary-600 text-white p-1.5 rounded-full hover:bg-primary-700 cursor-pointer"
            >
              <Camera size={14} />
            </label>
          </div>

          {/* Name + Bio */}
          <div className="flex-1">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-xl font-semibold border-b outline-none w-full mb-2"
            />

            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full border rounded p-2 text-sm resize-none"
              rows="2"
            />

            <button
              onClick={handleSave}
              disabled={saving}
              className="mt-3 px-4 py-1.5 bg-primary-600 text-white rounded hover:bg-primary-700"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {[
          { title: "Active Habits", value: habits.length },
          { title: "Current Streak", value: `${streakCount} days` },
          { title: "Longest Streak", value: `${longestStreak} days` },
          { title: "Habits Completed", value: totalCompleted },
          { title: "Completion Rate", value: completionRate },
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow p-4 text-center"
          >
            <h4 className="text-sm text-gray-500">{stat.title}</h4>
            <p className="text-lg font-semibold mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* ================= BADGES ================= */}
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Badges</h3>

        <div className="flex flex-wrap gap-4">
          {unlockedBadges.map((badge, index) => (
            <div
              key={`unlocked-${index}`}
              className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full text-sm"
            >
              🏆 {badge}
            </div>
          ))}

          {lockedBadges.map((badge, index) => (
            <div
              key={`locked-${index}`}
              className="px-4 py-2 bg-gray-100 text-gray-400 rounded-full text-sm opacity-50"
            >
              🔒 {badge}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;