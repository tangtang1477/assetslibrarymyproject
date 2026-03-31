import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import bannerBg from "@/assets/banner-bg.jpg";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";
import project5 from "@/assets/project-5.jpg";
import tool1 from "@/assets/tool-1.jpg";
import tool2 from "@/assets/tool-2.jpg";
import tool3 from "@/assets/tool-3.jpg";
import assetChar1 from "@/assets/asset-char-1.jpg";
import assetChar2 from "@/assets/asset-char-2.jpg";
import assetChar3 from "@/assets/asset-char-3.jpg";
import assetChar4 from "@/assets/asset-char-4.jpg";
import assetChar5 from "@/assets/asset-char-5.jpg";
import assetChar6 from "@/assets/asset-char-6.jpg";
import assetChar7 from "@/assets/asset-char-7.jpg";
import iconTool from "@/assets/icon-tool.svg";
import iconAideo from "@/assets/icon-aideo.svg";
import iconAssets from "@/assets/icon-assets.svg";

const QUICK_LINKS = [
  { label: "Toolkit", icon: iconTool, bg: "#A7E3E5", path: "/toolkit" },
  { label: "Lab", icon: iconAideo, bg: "#73C8CB", path: "/" },
  { label: "Assets", icon: iconAssets, bg: "#71F0F6", path: "/?tab=asset-library" },
  { label: "Aldeo world", icon: iconAideo, bg: "#3FDCE5", path: "/" },
  { label: "Fun", icon: iconTool, bg: "#16B8C7", path: "/" },
  { label: "Alchemix", icon: iconTool, bg: "#0B5C6C", path: "/" },
];

const LABS = [
  { src: project1, desc: "Type something to describe this inspiration lab, tell us what kind of AI video you would like to make.", badge: "HOT" },
  { src: project2, desc: "Type something to describe this inspiration lab, tell us what kind of AI video you would like to make.", badge: "HOT" },
  { src: project3, desc: "Type something to describe this inspiration lab, tell us what kind of AI video you would like to make.", badge: "HOT" },
  { src: project4, desc: "Type something to describe this inspiration lab, tell us what kind of AI video you would like to make.", badge: "NEW" },
  { src: project5, desc: "Type something to describe this inspiration lab, tell us what kind of AI video you would like to make.", badge: "NEW" },
];

const FUN_ITEMS = [assetChar1, assetChar2, assetChar3, assetChar4, assetChar5, assetChar6, assetChar7];

const TOOLKIT_ITEMS = [
  { src: tool1, title: "" },
  { src: tool2, title: "" },
  { src: tool3, title: "" },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar activePage="home" />
      <div className="flex-1 ml-[88px] overflow-y-auto">
        {/* Hero section */}
        <div className="relative w-full" style={{ height: 780 }}>
          {/* Blurred background */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${bannerBg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(22.8px)",
              borderRadius: 12,
            }}
          />
          {/* BG glow effects */}
          <div
            className="absolute"
            style={{
              width: "66%",
              height: 296,
              left: "15%",
              top: 45,
              background: "rgba(99, 136, 233, 0.5)",
              filter: "blur(112px)",
            }}
          />
          <div
            className="absolute"
            style={{
              width: "38%",
              height: 150,
              left: "30%",
              top: 62,
              background: "rgba(7, 131, 176, 0.5)",
              filter: "blur(70px)",
            }}
          />

          {/* Title */}
          <div className="relative flex flex-col items-center pt-16">
            <h1
              className="text-foreground font-bold text-center"
              style={{ fontFamily: "Arial, sans-serif", fontSize: 36, lineHeight: "44px" }}
            >
              Ideas Spark Movies
            </h1>
            <p
              className="mt-2 text-center"
              style={{ fontFamily: "Arial, sans-serif", fontSize: 16, lineHeight: "24px", color: "rgba(255,255,255,0.7)" }}
            >
              From Spark to Screen: Your Vision, Now Playing.
            </p>
          </div>

          {/* Input box */}
          <div className="relative flex justify-center" style={{ marginTop: 56 }}>
            <div
              className="relative flex items-start"
              style={{
                width: 990,
                height: 159,
                background: "rgba(0, 0, 0, 0.05)",
                boxShadow: "inset 0px 0px 7.3px rgba(255,255,255,0.25), inset 0px 7.3px 14.6px rgba(255,255,255,0.15), inset 0px 0.4px 0.49px rgba(255,255,255,0.2), inset 0px 0px 0.9px rgba(255,255,255,0.12)",
                backdropFilter: "blur(12.6px)",
                WebkitBackdropFilter: "blur(12.6px)",
                borderRadius: 25,
                padding: "16px 24px",
              }}
            >
              {/* Plus icon */}
              <div
                className="flex items-center justify-center flex-shrink-0"
                style={{
                  width: 40,
                  height: 50,
                  background: "rgba(255,255,255,0.05)",
                  boxShadow: "inset 0px 0px 5.9px rgba(255,255,255,0.25), inset 0px 5.9px 11.8px rgba(103,211,247,0.15)",
                  backdropFilter: "blur(10px)",
                  borderRadius: 8,
                  transform: "rotate(-5.76deg)",
                  marginRight: 12,
                }}
              >
                <span className="text-2xl" style={{ color: "rgba(255,255,255,0.37)" }}>+</span>
              </div>
              <span
                className="pt-2"
                style={{
                  fontFamily: "Arial, sans-serif",
                  fontSize: 16,
                  lineHeight: "24px",
                  color: "rgba(255,255,255,0.6)",
                  letterSpacing: "0.015em",
                }}
              >
                Describe the story you want to make...
              </span>

              {/* Bottom-right Make button */}
              <div
                className="absolute flex items-center"
                style={{
                  right: 24,
                  bottom: 16,
                  background: "rgba(69, 196, 246, 0.05)",
                  borderRadius: 20,
                  padding: "6px 12px",
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background: "rgba(69, 196, 246, 0.6)",
                    filter: "blur(6.75px)",
                    borderRadius: 20,
                  }}
                />
                <span className="relative text-primary font-bold" style={{ fontSize: 11, lineHeight: "16px" }}>Make</span>
                <span className="relative text-primary ml-1" style={{ fontSize: 11, lineHeight: "16px" }}>✦ 10/s</span>
              </div>
            </div>
          </div>

          {/* Options row below input */}
          <div className="relative flex justify-center gap-2" style={{ marginTop: 12 }}>
            <OptionPill label="🌐 EN" />
            <OptionPill label="✨ Enhance on" />
            <OptionPill label="⏱ 6min" hasNew />
            <OptionPill label="▢ Portrait" />
            <OptionPill label="✋ Landscape" />
          </div>

          {/* Tags row */}
          <div className="relative flex justify-center gap-[30px]" style={{ marginTop: 16 }}>
            <TagPill icon={assetChar1} label="3D Animation" />
            <TagPill label="Tang Dynasty" />
            <TagPill label="Horror" />
          </div>

          {/* Quick links */}
          <div className="relative flex justify-center gap-16" style={{ marginTop: 48 }}>
            {QUICK_LINKS.map((link) => (
              <button
                key={link.label}
                className="flex flex-col items-center gap-2 hover:opacity-80 transition-opacity"
                onClick={() => navigate(link.path)}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ background: link.bg }}
                >
                  <img src={link.icon} alt={link.label} className="w-6 h-6" style={{ filter: "brightness(0) invert(1)" }} />
                </div>
                <span
                  className="text-foreground text-center"
                  style={{ fontFamily: "Arial, sans-serif", fontSize: 14, lineHeight: "22px" }}
                >
                  {link.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Content sections */}
        <div className="px-9 pb-16">
          {/* Inspiration Labs */}
          <SectionHeader title="Inspiration Labs" onViewMore={() => {}} />
          <div className="flex gap-[22px] mt-12 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
            {LABS.map((lab, i) => (
              <div
                key={i}
                className="relative flex-shrink-0 rounded-[10px] overflow-hidden cursor-pointer group"
                style={{ width: 350, height: 384 }}
              >
                <img
                  src={lab.src}
                  alt={lab.desc}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Bottom glass overlay */}
                <div
                  className="absolute bottom-0 left-0 right-0"
                  style={{
                    height: 136,
                    background: "rgba(0,0,0,0.05)",
                    boxShadow: "inset 0px 0px 7.1px rgba(255,255,255,0.25), inset 0px 7.1px 14.2px rgba(255,255,255,0.15)",
                    backdropFilter: "blur(12px)",
                    borderRadius: "0 0 10px 10px",
                  }}
                />
                {/* Description */}
                <div className="absolute bottom-3 left-3 right-3">
                  <p
                    className="text-foreground"
                    style={{ fontFamily: "Arial, sans-serif", fontSize: 15.6, lineHeight: "18px" }}
                  >
                    {lab.desc}
                  </p>
                </div>
                {/* Badge */}
                <div
                  className="absolute flex items-center justify-center"
                  style={{
                    left: 18,
                    top: 14,
                    width: 41,
                    height: 21,
                    background: "hsl(var(--primary))",
                    borderRadius: 5,
                    transform: "matrix(1, 0, -0.17, 0.98, 0, 0)",
                  }}
                >
                  <span
                    className="text-foreground font-bold"
                    style={{ fontSize: 14, lineHeight: "16px", transform: "matrix(1, 0, -0.17, 0.98, 0, 0)" }}
                  >
                    {lab.badge}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* AIdeo World Banner */}
          <div
            className="relative rounded-[20px] overflow-hidden mt-16"
            style={{ height: 412 }}
          >
            <img
              src={bannerBg}
              alt="AIdeo World"
              className="w-full h-full object-cover"
            />
            <div
              className="absolute top-0 left-0 h-full"
              style={{
                width: 693,
                background: "rgba(58, 85, 117, 0.69)",
                filter: "blur(30px)",
              }}
            />
            <div className="absolute top-[76px] left-[34px]">
              <p className="text-foreground" style={{ fontFamily: "Arial, sans-serif", fontSize: 20, lineHeight: "23px" }}>
                ✨New! Welcome to AIdeo World. Come and explore.
              </p>
            </div>
            <h2
              className="absolute text-foreground font-bold"
              style={{ left: 40, top: 129, fontFamily: "Arial, sans-serif", fontSize: 100, lineHeight: "16px" }}
            >
              AIdeo World
            </h2>
            <button
              className="absolute flex items-center justify-center"
              style={{
                left: 25,
                top: 299,
                width: 179,
                height: 41,
                background: "rgba(69, 196, 246, 0.05)",
                borderRadius: 29,
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background: "rgba(69, 196, 246, 0.6)",
                  filter: "blur(12px)",
                  borderRadius: 29,
                }}
              />
              <span className="relative text-primary font-bold" style={{ fontSize: 15, lineHeight: "23px" }}>
                Check It Out
              </span>
            </button>
          </div>

          {/* Fun */}
          <SectionHeader title="Fun" onViewMore={() => {}} />
          <div className="flex gap-[26px] mt-[74px] overflow-x-auto" style={{ scrollbarWidth: "none" }}>
            {FUN_ITEMS.map((src, i) => (
              <div key={i} className="relative flex-shrink-0 rounded-[5px] overflow-hidden cursor-pointer group" style={{ width: 240, height: 240 }}>
                <img src={src} alt="" className="w-full h-full object-cover" />
                <div
                  className="absolute bottom-0 left-0 right-0 h-[50px]"
                  style={{ background: "rgba(255,255,255,0.28)", filter: "blur(19px)" }}
                />
              </div>
            ))}
          </div>

          {/* Toolkits */}
          <SectionHeader title="Toolkits" onViewMore={() => {}} />
          <div className="flex gap-3 mt-[67px]">
            {TOOLKIT_ITEMS.map((item, i) => (
              <div key={i} className="flex-1 rounded-[5px] overflow-hidden cursor-pointer" style={{ height: 340 }}>
                <img src={item.src} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>

          {/* Library banner */}
          <div
            className="relative rounded-[5px] overflow-hidden mt-16"
            style={{ height: 297 }}
          >
            <img src={bannerBg} alt="Assets Library" className="w-full h-full object-cover" />
            <div className="absolute top-[62px] left-[28px]">
              <h3
                className="text-foreground font-bold"
                style={{ fontFamily: "Arial, sans-serif", fontSize: 28, lineHeight: "32px" }}
              >
                Assets Library
              </h3>
            </div>
            <button
              className="absolute flex items-center justify-center"
              style={{
                left: 38,
                top: 182,
                width: 215,
                height: 43,
                background: "rgba(69, 196, 246, 0.05)",
                borderRadius: 29,
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background: "rgba(69, 196, 246, 0.6)",
                  filter: "blur(12px)",
                  borderRadius: 29,
                }}
              />
              <span className="relative text-primary font-bold" style={{ fontSize: 15, lineHeight: "23px" }}>
                Check It Out
              </span>
            </button>
          </div>
        </div>

        {/* Top right header bar */}
        <div className="fixed top-0 right-0 flex items-center gap-4 z-50" style={{ padding: "24px 32px" }}>
          <button
            className="flex items-center gap-2 rounded-full"
            style={{ background: "rgba(255,255,255,0.08)", padding: "8px 16px" }}
          >
            <span className="text-foreground" style={{ fontSize: 16, lineHeight: "24px" }}>🎁</span>
            <span className="text-foreground" style={{ fontFamily: "Arial, sans-serif", fontSize: 16, lineHeight: "24px" }}>Free Credit</span>
          </button>
          <div className="flex items-center gap-1">
            <span className="text-primary" style={{ fontSize: 16, lineHeight: "24px" }}>💎</span>
            <span className="text-primary" style={{ fontFamily: "'SF Pro', sans-serif", fontSize: 16, lineHeight: "24px" }}>500</span>
          </div>
          <button
            className="relative flex items-center justify-center rounded-full"
            style={{
              background: "rgba(113, 240, 246, 0.1)",
              padding: "8px 32px",
              width: 180,
              height: 40,
            }}
          >
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: "rgba(113, 240, 246, 0.4)",
                filter: "blur(12.5px)",
              }}
            />
            <span className="relative text-foreground font-bold" style={{ fontFamily: "Arial, sans-serif", fontSize: 16, lineHeight: "24px" }}>
              Subscribe Now
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

const SectionHeader = ({ title, onViewMore }: { title: string; onViewMore: () => void }) => (
  <div className="flex items-center justify-between mt-16">
    <h2
      className="text-foreground font-bold"
      style={{ fontFamily: "Arial, sans-serif", fontSize: 20, lineHeight: "16px" }}
    >
      {title}
    </h2>
    <button
      onClick={onViewMore}
      className="flex items-center gap-1 hover:opacity-80 transition-opacity"
    >
      <span
        style={{ fontFamily: "Arial, sans-serif", fontSize: 18, lineHeight: "21px", color: "rgba(255,255,255,0.6)", fontWeight: 700 }}
      >
        View more
      </span>
      <ChevronRight size={16} className="text-foreground" />
    </button>
  </div>
);

const OptionPill = ({ label, hasNew }: { label: string; hasNew?: boolean }) => (
  <div className="relative">
    <button
      className="flex items-center justify-center rounded-full"
      style={{
        border: "0.7px solid rgba(255,255,255,0.25)",
        padding: "6px 16px",
        fontFamily: "Arial, sans-serif",
        fontSize: 14,
        lineHeight: "22px",
        color: "rgba(255,255,255,0.8)",
      }}
    >
      {label}
    </button>
    {hasNew && (
      <div
        className="absolute -top-1 -right-1 w-[10px] h-[10px] rounded-full"
        style={{ background: "hsl(var(--primary))" }}
      />
    )}
  </div>
);

const TagPill = ({ icon, label }: { icon?: string; label: string }) => (
  <div
    className="flex items-center gap-2 rounded-full"
    style={{ padding: "4px 6px" }}
  >
    {icon && <img src={icon} alt="" className="w-[25px] h-[25px] rounded-full object-cover" />}
    <span
      className="text-foreground"
      style={{ fontFamily: "Arial, sans-serif", fontSize: 14, lineHeight: "16px" }}
    >
      {label}
    </span>
  </div>
);

export default Home;
