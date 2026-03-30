import { Plus, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import toolkitWide1 from "@/assets/toolkit-wide-1.jpg";
import toolkitWide2 from "@/assets/toolkit-wide-2.jpg";
import toolkitWide3 from "@/assets/toolkit-wide-3.jpg";
import toolkitTall1 from "@/assets/toolkit-tall-1.jpg";
import toolkitTall2 from "@/assets/toolkit-tall-2.jpg";
import toolkitTall3 from "@/assets/toolkit-tall-3.jpg";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";
import project5 from "@/assets/project-5.jpg";
import project6 from "@/assets/project-6.jpg";
import projectTall1 from "@/assets/project-tall-1.jpg";
import projectTall2 from "@/assets/project-tall-2.jpg";
import projectTall3 from "@/assets/project-tall-3.jpg";
import projectTall4 from "@/assets/project-tall-4.jpg";
import projectTall5 from "@/assets/project-tall-5.jpg";

type MediaItem = {
  type: "image" | "video";
  src: string;
  poster?: string;
  aspect: "16:9" | "9:16";
};

const ITEMS: MediaItem[] = [
  { type: "image", src: toolkitWide1, aspect: "16:9" },
  { type: "video", src: "/banner-video.mp4", poster: project1, aspect: "16:9" },
  { type: "image", src: toolkitTall1, aspect: "9:16" },
  { type: "image", src: project2, aspect: "16:9" },
  { type: "image", src: toolkitWide2, aspect: "16:9" },
  { type: "video", src: "/banner-video.mp4", poster: project3, aspect: "9:16" },
  { type: "image", src: toolkitTall2, aspect: "9:16" },
  { type: "image", src: project4, aspect: "16:9" },
  { type: "image", src: toolkitWide3, aspect: "16:9" },
  { type: "image", src: toolkitTall3, aspect: "9:16" },
  { type: "video", src: "/banner-video.mp4", poster: project5, aspect: "16:9" },
  { type: "image", src: project6, aspect: "16:9" },
  { type: "image", src: projectTall1, aspect: "9:16" },
  { type: "video", src: "/banner-video.mp4", poster: projectTall2, aspect: "9:16" },
  { type: "image", src: projectTall3, aspect: "9:16" },
  { type: "image", src: projectTall4, aspect: "9:16" },
];

const ToolkitGrid = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full" style={{ columnCount: 5, columnGap: 8 }}>
      {/* New Project card */}
      <div
        onClick={() => navigate("/toolkit")}
        className="bg-foreground/5 rounded-lg flex flex-col items-center justify-center mb-2 break-inside-avoid
          cursor-pointer hover:bg-foreground/10 active:brightness-75 transition-all duration-200"
        style={{ height: 200 }}
      >
        <div className="w-16 h-16 rounded-full bg-foreground/10 flex items-center justify-center mb-4">
          <Plus size={24} className="text-foreground" />
        </div>
        <span className="text-foreground/80 text-base">New Project</span>
      </div>

      {ITEMS.map((item, i) => (
        <MediaCard key={i} item={item} />
      ))}
    </div>
  );
};

const MediaCard = ({ item }: { item: MediaItem }) => {
  const h = item.aspect === "16:9" ? 200 : 628;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovering, setHovering] = useState(false);

  const handleMouseEnter = () => {
    setHovering(true);
    if (item.type === "video" && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setHovering(false);
    if (item.type === "video" && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      className="rounded-lg overflow-hidden mb-2 break-inside-avoid cursor-pointer relative group
        hover:ring-2 hover:ring-primary/40 active:brightness-75 transition-all duration-200"
      style={{ height: h }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {item.type === "video" ? (
        <>
          <video
            ref={videoRef}
            src={item.src}
            poster={item.poster}
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
          {/* Play icon — visible when not hovering */}
          {!hovering && (
            <div className="absolute top-2 left-2 w-4 h-4 rounded-full bg-background/60 flex items-center justify-center">
              <Play size={10} className="text-foreground" fill="currentColor" />
            </div>
          )}
        </>
      ) : (
        <img
          src={item.src}
          alt=""
          loading="lazy"
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
};

export default ToolkitGrid;
