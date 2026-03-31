import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import tool1 from "@/assets/tool-1.jpg";
import tool2 from "@/assets/tool-2.jpg";
import tool3 from "@/assets/tool-3.jpg";
import tool4 from "@/assets/tool-4.jpg";
import tool5 from "@/assets/tool-5.jpg";
import tool6 from "@/assets/tool-6.jpg";
import tool7 from "@/assets/tool-7.jpg";
import tool8 from "@/assets/tool-8.jpg";
import tool9 from "@/assets/tool-9.jpg";
import tool10 from "@/assets/tool-10.jpg";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";

const IMAGE_GEN_TOOLS = [
  { src: tool6, title: "MovieFlow: Fast, stylized image generation with strong prompt control." },
  { src: tool7, title: "MovieFlow: Seamlessly blend images, styles, and concepts into one." },
  { src: tool8, title: "Nano Banana Pro: Official image generation and blending with high visual consistency." },
  { src: tool9, title: "Grok: Creative image generation with bold, expressive visual ideas." },
];

const VIDEO_GEN_TOOLS = [
  { src: tool1, title: "MovieFlow: High-quality text-to-video with cinematic motion and realism." },
  { src: tool4, title: "MovieFlow: Generate video motion from a single starting frame." },
  { src: tool3, title: "MovieFlow: Generate videos from defined start and end frames." },
  { src: tool10, title: "Veo 3: Text, start-frame, and end-frame video generation with cinematic quality." },
  { src: tool5, title: "Kling 2.6: Precise start-to-end frame video generation with smooth transitions." },
];

const VIDEO_GEN_TOOLS_2 = [
  { src: tool1, title: "Kling O1: AI video editing with precise control and smooth results." },
  { src: tool2, title: "Grok 3: Dynamic video generation driven by imaginative, high-energy motion." },
  { src: tool3, title: "MovieFlow: Enhance video resolution while preserving fine details." },
  { src: tool4, title: "Sora 2: Animate a single image into smooth, realistic video motion." },
  { src: tool5, title: "Sora 2: Generate high-quality videos from text with coherent motion." },
];

const Toolkit = () => {
  const navigate = useNavigate();
  const [activeToolTab, setActiveToolTab] = useState<"tools" | "my-works">("tools");

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar activePage="toolkit" />
      <div className="flex-1 ml-[88px] overflow-y-auto px-6 py-8">
        <div className="max-w-[1720px] mx-auto flex flex-col gap-6">
          {/* Logo */}
          <h1
            className="text-2xl font-bold tracking-tight"
            style={{
              background: "linear-gradient(90.07deg, #6AF4FA 21%, #C73DFF 69.47%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "-0.02em",
            }}
          >
            Toolkit
          </h1>

          {/* Tab bar */}
          <div className="flex flex-col gap-0">
            <div className="flex gap-4 pb-3">
              <button
                onClick={() => setActiveToolTab("tools")}
                className={`text-lg transition-colors ${
                  activeToolTab === "tools" ? "text-primary" : "text-foreground"
                }`}
              >
                Tools
              </button>
              <button
                onClick={() => setActiveToolTab("my-works")}
                className={`text-lg transition-colors ${
                  activeToolTab === "my-works" ? "text-primary" : "text-foreground"
                }`}
              >
                My works
              </button>
            </div>
            <div className="relative">
              <div className="w-full h-[2px] bg-foreground/10" />
              <div
                className="absolute top-0 left-0 h-[2px] bg-primary transition-all duration-300"
                style={{
                  width: activeToolTab === "tools" ? "43px" : "77px",
                  left: activeToolTab === "tools" ? "0px" : "59px",
                }}
              />
            </div>
          </div>

          {/* Image Generation Section */}
          <div className="flex flex-col gap-4 mt-4">
            <h2 className="text-lg text-foreground/60">Image Generation</h2>
            <div className="flex gap-[30px]">
              {IMAGE_GEN_TOOLS.map((tool, i) => (
                <ToolCard key={i} src={tool.src} title={tool.title} />
              ))}
            </div>
          </div>

          {/* Video Generation Section */}
          <div className="flex flex-col gap-4 mt-6">
            <div className="flex items-center gap-3">
              <h2 className="text-lg text-foreground/60">Video Generation</h2>
              <span className="text-sm italic text-foreground">Kling 3.0</span>
              <span
                className="text-[5px] px-2 py-0.5 rounded-full text-foreground/60"
                style={{ background: "rgba(255,255,255,0.05)" }}
              >
                coming soon
              </span>
            </div>
            <div className="flex gap-[30px]">
              {VIDEO_GEN_TOOLS.map((tool, i) => (
                <ToolCard key={i} src={tool.src} title={tool.title} />
              ))}
            </div>
            <div className="flex gap-[30px] mt-[30px]">
              {VIDEO_GEN_TOOLS_2.map((tool, i) => (
                <ToolCard key={i} src={tool.src} title={tool.title} />
              ))}
            </div>
          </div>

          {/* Carousel dots and arrows */}
          <div className="flex items-center justify-between mt-6">
            <button
              className="w-[41px] h-[41px] rounded-full flex items-center justify-center hover:bg-foreground/10 transition-colors"
              style={{ background: "rgba(255,255,255,0.05)" }}
            >
              <ChevronLeft size={20} className="text-foreground" />
            </button>
            <div className="flex gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-foreground" />
              <div className="w-2.5 h-2.5 rounded-full bg-foreground/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-foreground/50" />
            </div>
            <button
              className="w-[41px] h-[41px] rounded-full flex items-center justify-center hover:bg-foreground/10 transition-colors"
              style={{ background: "rgba(255,255,255,0.05)" }}
            >
              <ChevronRight size={20} className="text-foreground" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ToolCard = ({ src, title }: { src: string; title: string }) => (
  <div
    className="w-[320px] flex-shrink-0 rounded-[10px] overflow-hidden cursor-pointer
      hover:ring-2 hover:ring-primary/40 active:brightness-75 transition-all duration-200"
    style={{ background: "#141414" }}
  >
    <div className="p-[17px] pb-0">
      <img
        src={src}
        alt={title}
        loading="lazy"
        className="w-[287px] h-[215px] object-cover rounded-[10px]"
      />
    </div>
    <p
      className="px-4 pt-3 pb-4 text-base leading-[18px]"
      style={{ color: "#9197A2" }}
    >
      {title}
    </p>
  </div>
);

export default Toolkit;
