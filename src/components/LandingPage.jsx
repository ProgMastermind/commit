import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import Features from "./sections/Features";
import GoalTracking from "./sections/GoalTracking";
import AccountabilityCommunity from "./sections/AccountabilityCommunity";
import RewardsProgram from "./sections/RewardsProgram";
import GoalChampions from "./sections/GoalChampions";
import ProgressHub from "./sections/ProgressHub";
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
        <GoalTracking />
        <AccountabilityCommunity />
        <RewardsProgram />
        <GoalChampions />
        <ProgressHub />
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
