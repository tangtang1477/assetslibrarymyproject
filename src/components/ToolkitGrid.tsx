import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
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

const IMAGE_GEN_TOOLS = [
  { src: tool6, title: "MovieFlow: Fast, stylized image generation with strong prompt control." },
  { src: tool7, title: "MovieFlow: Seamlessly blend images, styles, and concepts into one." },
  { src: tool8, title: "Nano Banana Pro: Official image generation and blending with high visual consistency." },
  { src: tool9, title: "Grok: Creative image generation with bold, expressive visual ideas." },
];

const VIDEO_GEN_TOOLS = [
  { src: tool1, title: "MovieFlow: High-quality text-to-video with cinematic motion and realism." },
  { src: tool4, title: "MovieFlow: Generate video motion from a single starting frame." },
  { src: tool3, title: "MovieFlow: Enhance video resolution while preserving fine details." },
  { src: tool10, title: "MovieFlow: Generate videos from defined start and end frames." },
  { src: tool5, title: "Veo 3: Text, start-frame, and end-frame video generation with cinematic quality." },
  { src: tool1, title: "Kling O1: AI video editing with precise control and smooth results." },
  { src: tool2, title: "Grok 3: Dynamic video generation driven by imaginative, high-energy motion." },
  { src: tool4, title: "Sora 2: Animate a single image into smooth, realistic video motion." },
  { src: tool5, title: "Sora 2: Generate high-quality videos from text with coherent motion." },
  { src: tool10, title: "Kling 2.6: Precise start-to-end frame video generation with smooth transitions." },
];

const ToolkitGrid = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-8">
      {/* New Project card */}
      <div
        onClick={() => navigate("/toolkit")}
        className="bg-card-surface rounded-[10px] flex flex-col items-center justify-center cursor-pointer
          hover:bg-card-surface-hover active:brightness-75 transition-all duration-200"
        style={{ width: 320, height: 200 }}
      >
        <div className="w-16 h-16 rounded-full bg-card-surface-hover flex items-center justify-center mb-4">
          <Plus size={24} className="text-foreground" />
        </div>
        <span className="text-text-bright text-base">New Project</span>
      </div>
    </div>
  );
};

export default ToolkitGrid;
