import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import Features from "./sections/Features";
import AchievementTracking from "./sections/AchievementTracking";
import SocialCommunity from "./sections/SocialCommunity";
import RewardsMarketplace from "./sections/RewardsMarketplace";
import Leaderboard from "./sections/Leaderboard";
import UserDashboard from "./sections/UserDashboard";
import Testimonials from "./sections/Testimonials";
import Pricing from "./sections/Pricing";
import FAQ from "./sections/FAQ";
import CTA from "./sections/CTA";
import Footer from "./sections/Footer";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#090909]">
      <Navbar />
      <main className="pt-16">
        <Hero />
        <Features />
        <AchievementTracking />
        <SocialCommunity />
        <RewardsMarketplace />
        <Leaderboard />
        <UserDashboard />
        <Testimonials />
        <Pricing />
        <FAQ />
        <CTA />
        <Footer />
      </main>
    </div>
  );
};

export default LandingPage;
