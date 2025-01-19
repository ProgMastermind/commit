export const mockUserData = {
  username: "ProGamer",
  email: "progamer@example.com",
  joinDate: "January 2024",
  stats: {
    totalPoints: 15750,
    tokens: 2500,
    achievementsCompleted: 145,
    totalAchievements: 200,
    currentStreak: 15,
    longestStreak: 30,
    completionRate: 72.5,
  },
  recentGames: [
    { name: "PUBG", hours: 120 },
    { name: "League of Legends", hours: 89 },
    { name: "Fortnite", hours: 65 },
  ],
  achievements: {
    // Generate last 365 days of activity
    contributions: Array.from({ length: 365 }, () => ({
      date: new Date(),
      count: Math.floor(Math.random() * 5), // 0-4 achievements per day
    })),
    recent: [
      {
        id: 1,
        title: "Victory Royale",
        game: "Fortnite",
        date: "2024-02-15",
        points: 500,
      },
      {
        id: 2,
        title: "Legendary Status",
        game: "PUBG",
        date: "2024-02-14",
        points: 1000,
      },
      {
        id: 3,
        title: "Speed Runner",
        game: "Apex Legends",
        date: "2024-02-13",
        points: 750,
      },
    ],
  },
  goals: {
    completed: 45,
    total: 60,
    recent: [
      {
        id: 1,
        title: "Win 10 Matches",
        game: "PUBG",
        progress: 80,
      },
      {
        id: 2,
        title: "Reach Diamond",
        game: "League of Legends",
        progress: 65,
      },
    ],
  },
  gameStats: [
    {
      name: "PUBG",
      achievements: 50,
      completed: 38,
      icon: "🎮",
    },
    {
      name: "League of Legends",
      achievements: 75,
      completed: 52,
      icon: "⚔️",
    },
    {
      name: "Fortnite",
      achievements: 45,
      completed: 35,
      icon: "🎯",
    },
  ],
};
