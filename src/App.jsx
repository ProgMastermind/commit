import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LandingPage from "./components/LandingPage";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Goals from "./pages/Goals";
import Profile from "./pages/Profile";
import Groups from "./pages/Groups";
import Achievements from "./pages/Achievements";
import ResetPassword from "./components/auth/ResetPassword";
import { AchievementProvider } from "./components/achievements/AchievementContext";

function App() {
  return (
    <AchievementProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* Protected Routes with DashboardLayout */}
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="/groups" element={<Groups />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AchievementProvider>
  );
}

export default App;