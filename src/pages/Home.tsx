import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/Sidebar";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar activePage="home" />
      <div className="flex-1 ml-[76px] overflow-y-auto flex flex-col items-center justify-center">
        <h1
          className="text-5xl font-bold mb-4"
          style={{ fontFamily: "Arial, sans-serif" }}
        >
          Your idea. A movie. In minutes.
        </h1>
        <p className="text-foreground/50 text-lg mb-8">
          From Spark to Screen: Your Vision, Now Playing.
        </p>
        <div
          className="w-[800px] h-[200px] rounded-2xl border border-foreground/20 flex items-start p-6"
          style={{ background: "rgba(255,255,255,0.05)" }}
        >
          <span className="text-foreground/30 text-lg">
            Describe the story you want to make...
          </span>
        </div>
      </div>
    </div>
  );
};

export default Home;
