import LandingPage from "./components/LandingPage";

function App() {
  return (
    <div className="min-h-screen bg-[#090909]">
      {/* Later you can add routing here */}
      {/* <Routes> */}
      {/*   <Route path="/" element={<LandingPage />} /> */}
      {/*   <Route path="/dashboard" element={<Dashboard />} /> */}
      {/* </Routes> */}
      <LandingPage />
    </div>
  );
}

export default App;
