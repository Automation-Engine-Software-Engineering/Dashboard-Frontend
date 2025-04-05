import AnimatedBackground from "./components/ui/animated-background";
import Login from "./components/widget/login";

function App() {
  return (
    <>
      <AnimatedBackground />
      <div className="flex items-center justify-center min-h-full h-full">
        <Login />
      </div>
    </>
  );
}

export default App;
