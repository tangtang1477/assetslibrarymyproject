import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
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
import iconAll from "@/assets/icon-all.svg";
import iconLanguage from "@/assets/icon-language.svg";
import iconEnhance from "@/assets/icon-enhance.svg";
import iconTime from "@/assets/icon-time.svg";
import iconNewBadge from "@/assets/icon-new-badge.svg";

const QUICK_LINKS = [
  { label: "All", icon: iconAll, bg: "hsl(var(--quick-link-all))", path: "/home" },
  { label: "Toolkit", icon: iconTool, bg: "hsl(var(--quick-link-toolkit))", path: "/toolkit" },
  { label: "Lab", icon: iconAideo, bg: "hsl(var(--quick-link-lab))", path: "/" },
  { label: "Assets", icon: iconAssets, bg: "hsl(var(--primary))", path: "/?tab=asset-library" },
  { label: "AIdeo World", icon: iconAideo, bg: "hsl(var(--quick-link-aideo))", path: "/" },
  { label: "Fun", icon: iconTool, bg: "hsl(var(--quick-link-fun))", path: "/" },
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
  { src: tool1 },
  { src: tool2 },
  { src: tool3 },
];

const MODEL_OPTIONS = [
  { label: "Seedance", value: "seedance" },
  { label: "Kling", value: "kling" },
];

const LANGUAGE_OPTIONS = [
  { label: "EN", value: "en" },
  { label: "中文", value: "zh" },
  { label: "日本語", value: "ja" },
  { label: "한국어", value: "ko" },
  { label: "Español", value: "es" },
];

const ENHANCE_OPTIONS = [
  { label: "Enhance on", value: "on" },
  { label: "Enhance off", value: "off" },
];

const TIME_OPTIONS = [
  { label: "6min", value: "6min" },
  { label: "3min", value: "3min" },
  { label: "1min", value: "1min" },
  { label: "10min", value: "10min" },
];

const RATIO_OPTIONS = [
  { label: "16:9", value: "16:9" },
  { label: "9:16", value: "9:16" },
];

const Home = () => {
  const navigate = useNavigate();
  const [selectedModel, setSelectedModel] = useState("seedance");
  const [selectedLang, setSelectedLang] = useState("en");
  const [selectedEnhance, setSelectedEnhance] = useState("on");
  const [selectedTime, setSelectedTime] = useState("6min");
  const [selectedRatio, setSelectedRatio] = useState("16:9");

  return (
    <div className="h-screen bg-background flex overflow-hidden">
      <Sidebar activePage="home" />

      <div className="flex-1 ml-[88px] overflow-y-auto hide-scrollbar">
        <div className="relative overflow-hidden px-9 pt-6" style={{ minHeight: 800 }}>
          <div
            className="absolute left-9 right-9 top-0 rounded-[12px]"
            style={{
              height: 343,
              backgroundImage: `url(${bannerBg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(22.8px)",
            }}
          />

          <div
            className="absolute"
            style={{
              width: "66%",
              height: 296,
              left: "15%",
              top: 45,
              background: "hsl(223 70% 65% / 0.5)",
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
              background: "hsl(195 92% 36% / 0.5)",
              filter: "blur(70px)",
            }}
          />

          <TopRightHeader />

          <div className="relative z-10 flex flex-col items-center" style={{ paddingTop: 64 }}>
            <div className="flex flex-col items-center gap-2">
              <h1 className="text-foreground font-bold text-center" style={{ fontFamily: "Arial, sans-serif", fontSize: 36, lineHeight: "44px" }}>
                Your idea. A movie. In minutes.
              </h1>
              <p
                className="text-center"
                style={{ fontFamily: "Arial, sans-serif", fontSize: 16, lineHeight: "24px", color: "hsl(var(--foreground) / 0.7)" }}
              >
                From Spark to Screen: Your Vision, Now Playing.
              </p>
            </div>

            <div className="mt-14 flex w-full justify-center">
              <div
                className="relative w-[990px] rounded-[25px]"
                style={{
                  height: 159,
                  background: "hsl(var(--background) / 0.05)",
                  boxShadow:
                    "inset 0px 0px 7.3px hsl(var(--foreground) / 0.25), inset 0px 7.3px 14.6px hsl(var(--foreground) / 0.15), inset 0px 0.4px 0.49px hsl(var(--foreground) / 0.2), inset 0px 0px 0.9px hsl(var(--foreground) / 0.12)",
                  backdropFilter: "blur(12.6px)",
                  WebkitBackdropFilter: "blur(12.6px)",
                }}
              >
                <div className="flex items-start px-6 pt-4">
                  <div
                    className="mr-3 flex h-[50px] w-10 flex-shrink-0 items-center justify-center"
                    style={{
                      background: "hsl(var(--foreground) / 0.05)",
                      boxShadow:
                        "inset 0px 0px 5.9px hsl(var(--foreground) / 0.25), inset 0px 5.9px 11.8px hsl(var(--primary) / 0.15), inset 0px 0.33px 0.39px hsl(var(--foreground) / 0.2), inset 0px 0px 0.73px hsl(var(--primary) / 0.12)",
                      backdropFilter: "blur(10px)",
                      borderRadius: 8,
                      transform: "rotate(-5.76deg)",
                    }}
                  >
                    <span className="text-2xl" style={{ color: "hsl(var(--foreground) / 0.37)" }}>+</span>
                  </div>

                  <span
                    className="pt-2"
                    style={{
                      fontFamily: "Arial, sans-serif",
                      fontSize: 16,
                      lineHeight: "24px",
                      color: "hsl(var(--foreground) / 0.6)",
                      letterSpacing: "0.015em",
                    }}
                  >
                    Describe the story you want to make...
                  </span>
                </div>

                {/* Input options inside the box, 8px from bottom, 8px gap */}
                <div className="absolute left-4 right-4 flex items-center" style={{ bottom: 8, gap: 8 }}>
                  <OptionPillDropdown
                    icon={undefined}
                    label={MODEL_OPTIONS.find(o => o.value === selectedModel)?.label || "Seedance"}
                    options={MODEL_OPTIONS}
                    value={selectedModel}
                    onChange={setSelectedModel}
                  />
                  <OptionPillDropdown
                    icon={iconLanguage}
                    label={LANGUAGE_OPTIONS.find(o => o.value === selectedLang)?.label || "EN"}
                    options={LANGUAGE_OPTIONS}
                    value={selectedLang}
                    onChange={setSelectedLang}
                  />
                  <OptionPillDropdown
                    icon={iconEnhance}
                    label={ENHANCE_OPTIONS.find(o => o.value === selectedEnhance)?.label || "Enhance on"}
                    options={ENHANCE_OPTIONS}
                    value={selectedEnhance}
                    onChange={setSelectedEnhance}
                  />
                  <OptionPillDropdown
                    icon={iconTime}
                    label={TIME_OPTIONS.find(o => o.value === selectedTime)?.label || "6min"}
                    options={TIME_OPTIONS}
                    value={selectedTime}
                    onChange={setSelectedTime}
                    badgeIcon={iconNewBadge}
                  />
                  <OptionPillDropdown
                    icon={undefined}
                    label={RATIO_OPTIONS.find(o => o.value === selectedRatio)?.label || "Portrait"}
                    options={RATIO_OPTIONS}
                    value={selectedRatio}
                    onChange={setSelectedRatio}
                  />
                  <MakePill />
                </div>
              </div>
            </div>

            {/* For You showcase - 32px below input */}
            <div style={{ marginTop: 32 }} className="w-full max-w-[1794px]">
              <ForYouShowcase />
            </div>

            {/* Quick navigation - 32px below For You */}
            <div className="flex flex-wrap justify-center" style={{ marginTop: 32, gap: 64 }}>
              {QUICK_LINKS.map((link) => (
                <button
                  key={link.label}
                  className="flex flex-col items-center gap-2 transition-opacity hover:opacity-80"
                  onClick={() => navigate(link.path)}
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full" style={{ background: link.bg }}>
                    <img src={link.icon} alt={link.label} className="h-6 w-6" style={{ filter: "brightness(0) invert(1)" }} />
                  </div>
                  <span className="text-center text-foreground" style={{ fontFamily: "Arial, sans-serif", fontSize: 14, lineHeight: "22px" }}>
                    {link.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Scrollable lower content */}
        <div className="px-9 pb-16">
          <SectionHeader title="Inspiration Labs" />
          <div className="mt-12 flex gap-[22px] overflow-x-auto hide-scrollbar">
            {LABS.map((lab, index) => (
              <div key={index} className="group relative flex-shrink-0 cursor-pointer overflow-hidden rounded-[10px]" style={{ width: 350, height: 384 }}>
                <img src={lab.src} alt={lab.desc} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                <div
                  className="absolute bottom-0 left-0 right-0"
                  style={{
                    height: 136,
                    background: "hsl(var(--background) / 0.05)",
                    boxShadow: "inset 0px 0px 7.1px hsl(var(--foreground) / 0.25), inset 0px 7.1px 14.2px hsl(var(--foreground) / 0.15)",
                    backdropFilter: "blur(12px)",
                    borderRadius: "0 0 10px 10px",
                  }}
                />
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-foreground" style={{ fontFamily: "Arial, sans-serif", fontSize: 15.6, lineHeight: "18px" }}>
                    {lab.desc}
                  </p>
                </div>
                <div
                  className="absolute flex items-center justify-center"
                  style={{ left: 18, top: 14, width: 41, height: 21, background: "hsl(var(--primary))", borderRadius: 5, transform: "matrix(1, 0, -0.17, 0.98, 0, 0)" }}
                >
                  <span className="font-bold" style={{ fontSize: 14, lineHeight: "16px", color: "hsl(var(--foreground))", transform: "matrix(1, 0, -0.17, 0.98, 0, 0)" }}>
                    {lab.badge}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="relative mt-16 overflow-hidden rounded-[20px]" style={{ height: 412 }}>
            <img src={bannerBg} alt="AIdeo World" className="h-full w-full object-cover" />
            <div className="absolute left-0 top-0 h-full" style={{ width: 693, background: "hsl(211 34% 34% / 0.69)", filter: "blur(30px)" }} />
            <div className="absolute left-[34px] top-[76px]">
              <p className="text-foreground" style={{ fontFamily: "Arial, sans-serif", fontSize: 20, lineHeight: "23px" }}>
                ✨New! Welcome to AIdeo World. Come and explore.
              </p>
            </div>
            <h2 className="absolute font-bold text-foreground" style={{ left: 40, top: 129, fontFamily: "Arial, sans-serif", fontSize: 100, lineHeight: "16px" }}>
              AIdeo World
            </h2>
            <button className="absolute flex items-center justify-center" style={{ left: 25, top: 299, width: 179, height: 41, background: "hsl(var(--primary) / 0.05)", borderRadius: 29 }}>
              <div className="absolute inset-0" style={{ background: "hsl(var(--primary) / 0.6)", filter: "blur(12px)", borderRadius: 29 }} />
              <span className="relative font-bold text-primary" style={{ fontSize: 15, lineHeight: "23px" }}>
                Check It Out
              </span>
            </button>
          </div>

          <SectionHeader title="Fun" />
          <div className="mt-[74px] flex gap-[26px] overflow-x-auto hide-scrollbar">
            {FUN_ITEMS.map((src, index) => (
              <div key={index} className="group relative h-[240px] w-[240px] flex-shrink-0 cursor-pointer overflow-hidden rounded-[5px]">
                <img src={src} alt="Fun asset" className="h-full w-full object-cover" />
                <div className="absolute bottom-0 left-0 right-0 h-[50px]" style={{ background: "hsl(var(--foreground) / 0.28)", filter: "blur(19px)" }} />
              </div>
            ))}
          </div>

          <SectionHeader title="Toolkits" />
          <div className="mt-[67px] flex gap-3">
            {TOOLKIT_ITEMS.map((item, index) => (
              <div key={index} className="h-[340px] flex-1 cursor-pointer overflow-hidden rounded-[5px]">
                <img src={item.src} alt="Toolkit preview" className="h-full w-full object-cover" />
              </div>
            ))}
          </div>

          <div className="relative mt-16 overflow-hidden rounded-[5px]" style={{ height: 297 }}>
            <img src={bannerBg} alt="Assets Library" className="h-full w-full object-cover" />
            <div className="absolute left-[28px] top-[62px]">
              <h3 className="font-bold text-foreground" style={{ fontFamily: "Arial, sans-serif", fontSize: 28, lineHeight: "32px" }}>
                Assets Library
              </h3>
            </div>
            <button className="absolute flex items-center justify-center" style={{ left: 38, top: 182, width: 215, height: 43, background: "hsl(var(--primary) / 0.05)", borderRadius: 29 }}>
              <div className="absolute inset-0" style={{ background: "hsl(var(--primary) / 0.6)", filter: "blur(12px)", borderRadius: 29 }} />
              <span className="relative font-bold text-primary" style={{ fontSize: 15, lineHeight: "23px" }}>
                Check It Out
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const TopRightHeader = () => (
  <div className="fixed right-0 top-0 z-50 flex items-center gap-4" style={{ padding: "24px 32px" }}>
    <button className="flex items-center gap-2 rounded-full" style={{ background: "hsl(var(--foreground) / 0.08)", padding: "8px 16px" }}>
      <span className="text-foreground" style={{ fontSize: 16, lineHeight: "24px" }}>🎁</span>
      <span className="text-foreground" style={{ fontFamily: "Arial, sans-serif", fontSize: 16, lineHeight: "24px" }}>Free Credit</span>
    </button>
    <div className="flex items-center gap-1">
      <span className="text-primary" style={{ fontSize: 16, lineHeight: "24px" }}>💎</span>
      <span className="text-primary" style={{ fontFamily: "'SF Pro', sans-serif", fontSize: 16, lineHeight: "24px" }}>500</span>
    </div>
    <button className="relative flex h-10 w-[180px] items-center justify-center rounded-full" style={{ background: "hsl(var(--primary) / 0.1)" }}>
      <div className="absolute inset-0 rounded-full" style={{ background: "hsl(var(--primary) / 0.4)", filter: "blur(12.5px)" }} />
      <span className="relative font-bold text-foreground" style={{ fontFamily: "Arial, sans-serif", fontSize: 16, lineHeight: "24px" }}>
        Subscribe Now
      </span>
    </button>
  </div>
);

const ForYouShowcase = () => (
  <div className="relative mx-auto h-[518px] w-full max-w-[1794px] overflow-hidden">
    <button className="absolute left-0 top-1/2 z-10 -translate-y-1/2 transition-opacity hover:opacity-80" aria-label="Previous showcase item">
      <ChevronLeft size={18} className="text-foreground" />
    </button>

    <div className="absolute bottom-0 left-[5.2%] h-[24.8%] w-[10.7%] overflow-hidden rounded-[6px] blur-[1.16px]">
      <img src={project1} alt="Featured preview left" className="h-full w-full object-cover" />
    </div>

    <div className="absolute left-[10.9%] top-0 h-[98.7%] w-[32.5%] overflow-hidden rounded-[10px]">
      <img src={project2} alt="Featured preview" className="h-full w-full object-cover" />
    </div>

    <div className="absolute left-1/2 top-[39.2%] h-[46.3%] w-[28.8%] -translate-x-1/2 overflow-hidden rounded-[14px] border" style={{ borderColor: "hsl(var(--foreground) / 0.1)" }}>
      <img src={tool2} alt="Featured center card" className="h-full w-full object-cover" />
    </div>

    <div className="absolute right-[10.9%] top-0 h-[98.7%] w-[32.5%] overflow-hidden rounded-[10px]">
      <img src={project3} alt="Featured preview right" className="h-full w-full object-cover scale-x-[-1]" />
    </div>

    <div className="absolute bottom-0 right-[5.2%] h-[24.8%] w-[10.7%] overflow-hidden rounded-[6px] blur-[1.16px]">
      <img src={project4} alt="Featured preview far right" className="h-full w-full object-cover scale-x-[-1]" />
    </div>

    <button className="absolute right-0 top-1/2 z-10 -translate-y-1/2 transition-opacity hover:opacity-80" aria-label="Next showcase item">
      <ChevronRight size={18} className="text-foreground" />
    </button>
  </div>
);

const SectionHeader = ({ title }: { title: string }) => (
  <div className="mt-16 flex items-center justify-between">
    <h2 className="font-bold text-foreground" style={{ fontFamily: "Arial, sans-serif", fontSize: 20, lineHeight: "16px" }}>
      {title}
    </h2>
    <button className="flex items-center gap-1 transition-opacity hover:opacity-80">
      <span style={{ fontFamily: "Arial, sans-serif", fontSize: 18, lineHeight: "21px", color: "hsl(var(--foreground) / 0.6)", fontWeight: 700 }}>
        View more
      </span>
      <ChevronRight size={16} className="text-foreground" />
    </button>
  </div>
);

/** Reusable dropdown pill for input options */
const OptionPillDropdown = ({
  icon,
  label,
  options,
  value,
  onChange,
  badgeIcon,
}: {
  icon?: string;
  label: string;
  options: { label: string; value: string }[];
  value: string;
  onChange: (v: string) => void;
  badgeIcon?: string;
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex h-[31px] items-center justify-center rounded-full transition-colors hover:bg-foreground/10"
        style={{
          padding: "0 16px",
          border: "0.7px solid hsl(var(--foreground) / 0.25)",
          gap: 8,
        }}
      >
        {icon && <img src={icon} alt="" className="w-4 h-4" style={{ opacity: 0.7 }} />}
        <span
          style={{
            fontFamily: "Arial, sans-serif",
            fontSize: 14,
            lineHeight: "22px",
            color: "hsl(var(--foreground) / 0.8)",
          }}
        >
          {label}
        </span>
        <ChevronDown size={14} className="text-foreground/50" style={{ marginLeft: -2 }} />
      </button>
      {badgeIcon && (
        <div className="absolute -right-1 -top-1 w-[10px] h-[10px]">
          <img src={badgeIcon} alt="new" className="w-full h-full" />
        </div>
      )}
      {open && (
        <div
          className="absolute bottom-full left-0 mb-2 rounded-xl border border-foreground/10 shadow-lg z-50 py-1"
          style={{
            minWidth: 160,
            background: "#1a1a1a",
          }}
        >
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => { onChange(opt.value); setOpen(false); }}
              className={`w-full flex items-center text-left transition-colors hover:bg-foreground/10 ${
                value === opt.value ? "text-primary" : "text-foreground/70 hover:text-foreground"
              }`}
              style={{
                padding: "8px 16px",
                gap: 8,
                fontFamily: "Arial, sans-serif",
                fontSize: 16,
                lineHeight: "16px",
                fontWeight: 400,
              }}
            >
              {icon && <img src={icon} alt="" className="w-4 h-4" style={{ opacity: value === opt.value ? 1 : 0.7 }} />}
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const MakePill = () => (
  <button className="relative ml-auto flex h-[29px] items-center justify-center rounded-full px-[10px]" style={{ background: "hsl(var(--primary) / 0.05)" }}>
    <div className="absolute inset-[4px] rounded-full" style={{ background: "hsl(var(--primary) / 0.6)", filter: "blur(6.75px)" }} />
    <span className="relative font-bold text-primary" style={{ fontFamily: "Arial, sans-serif", fontSize: 10.9, lineHeight: "16px" }}>
      Make
    </span>
    <span className="relative ml-2 text-primary" style={{ fontFamily: "Arial, sans-serif", fontSize: 10.9, lineHeight: "16px" }}>
      ✦ 10/s
    </span>
  </button>
);

export default Home;
