import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, ChevronDown, X, Check } from "lucide-react";
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
import iconGift from "@/assets/icon-gift.svg";
import iconCredit from "@/assets/icon-credit.svg";

/* ───── Quick‑link data ───── */
const QUICK_LINKS = [
  { label: "All", icon: iconAll, bg: "hsl(var(--quick-link-all))", section: "all" },
  { label: "Toolkit", icon: iconTool, bg: "hsl(var(--quick-link-toolkit))", section: "toolkits" },
  { label: "Lab", icon: iconAideo, bg: "hsl(var(--quick-link-lab))", section: "labs" },
  { label: "Assets", icon: iconAssets, bg: "hsl(var(--primary))", section: "assets" },
  { label: "AIdeo World", icon: iconAideo, bg: "hsl(var(--quick-link-aideo))", section: "aideo" },
  { label: "Fun", icon: iconTool, bg: "hsl(var(--quick-link-fun))", section: "fun" },
];

const LABS = [
  { src: project1, desc: "Type something to describe this inspiration lab, tell us what kind of AI video you would like to make.", badge: "HOT" },
  { src: project2, desc: "Type something to describe this inspiration lab, tell us what kind of AI video you would like to make.", badge: "HOT" },
  { src: project3, desc: "Type something to describe this inspiration lab, tell us what kind of AI video you would like to make.", badge: "HOT" },
  { src: project4, desc: "Type something to describe this inspiration lab, tell us what kind of AI video you would like to make.", badge: "NEW" },
  { src: project5, desc: "Type something to describe this inspiration lab, tell us what kind of AI video you would like to make.", badge: "NEW" },
];

const FUN_ITEMS = [assetChar1, assetChar2, assetChar3, assetChar4, assetChar5, assetChar6, assetChar7];

const TOOLKIT_ITEMS = [{ src: tool1 }, { src: tool2 }, { src: tool3 }];

const MODEL_OPTIONS = [
  { label: "Seedance", value: "seedance", badge: "Seedance 2.0", desc: "Full-featured Agent for images, clips & long videos", isNew: false },
  { label: "Kling", value: "kling", badge: "Kling 1.6", desc: "High-quality video generation with cinematic style", isNew: true },
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

/* ───── For‑You showcase images ───── */
const SHOWCASE_SETS = [
  [project1, project2, project3],
  [project3, project5, project1],
  [project4, project1, project5],
];

/* ───── Main page ───── */
const Home = () => {
  const navigate = useNavigate();
  const [selectedModel, setSelectedModel] = useState("seedance");
  const [selectedLang, setSelectedLang] = useState("en");
  const [selectedEnhance, setSelectedEnhance] = useState("on");
  const [selectedTime, setSelectedTime] = useState("6min");
  const [selectedRatio, setSelectedRatio] = useState("16:9");
  const [activeQuickLink, setActiveQuickLink] = useState("all");
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToSection = useCallback((section: string) => {
    setActiveQuickLink(section);
    if (section === "all") {
      scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(`section-${section}`);
    if (el && scrollRef.current) {
      const containerTop = scrollRef.current.getBoundingClientRect().top;
      const elTop = el.getBoundingClientRect().top;
      scrollRef.current.scrollBy({ top: elTop - containerTop - 24, behavior: "smooth" });
    }
  }, []);

  return (
    <div className="h-screen bg-background flex overflow-hidden">
      <Sidebar activePage="home" />

      <div ref={scrollRef} className="flex-1 ml-[88px] overflow-y-auto hide-scrollbar">
        {/* ── Hero section with video banner behind input ── */}
        <div className="relative overflow-hidden px-9 pt-6" style={{ minHeight: 800 }}>
          {/* Video banner background — fallback to image if video missing */}
          <div
            className="absolute left-9 right-9 top-0 rounded-[12px] overflow-hidden"
            style={{ height: 343 }}
          >
            <img
              src={bannerBg}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
            <video
              src="/banner-video.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              style={{ zIndex: 1 }}
            />
            {/* Dark overlay on video */}
            <div
              className="absolute inset-0"
              style={{ background: "hsl(var(--background) / 0.55)", zIndex: 2 }}
            />
          </div>

          {/* Blue glow layers */}
          <div
            className="absolute"
            style={{
              width: "66%", height: 296, left: "15%", top: 45,
              background: "hsl(223 70% 65% / 0.5)", filter: "blur(112px)",
            }}
          />
          <div
            className="absolute"
            style={{
              width: "38%", height: 150, left: "30%", top: 62,
              background: "hsl(195 92% 36% / 0.5)", filter: "blur(70px)",
            }}
          />

          <TopRightHeader />

          <div className="relative z-10 flex flex-col items-center" style={{ paddingTop: 64 }}>
            {/* Title */}
            <div className="flex flex-col items-center gap-2">
              <h1
                className="text-foreground font-bold text-center"
                style={{ fontFamily: "Arial, sans-serif", fontSize: 36, lineHeight: "44px" }}
              >
                Your idea. A movie. In minutes.
              </h1>
              <p
                className="text-center"
                style={{ fontFamily: "Arial, sans-serif", fontSize: 16, lineHeight: "24px", color: "hsl(var(--foreground) / 0.7)" }}
              >
                From Spark to Screen: Your Vision, Now Playing.
              </p>
            </div>

            {/* Input box */}
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
                      fontFamily: "Arial, sans-serif", fontSize: 16, lineHeight: "24px",
                      color: "hsl(var(--foreground) / 0.6)", letterSpacing: "0.015em",
                    }}
                  >
                    Describe the story you want to make...
                  </span>
                </div>

                {/* Input options bar */}
                <div className="absolute left-4 right-4 flex items-center" style={{ bottom: 8, gap: 8 }}>
                  <ModelPillDropdown
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
                  />
                  <RatioToggle value={selectedRatio} onChange={setSelectedRatio} />
                  <MakePill />
                </div>
              </div>
            </div>

            {/* For You showcase – 32px below input */}
            <div style={{ marginTop: 32 }} className="w-full max-w-[1794px]">
              <ForYouShowcase />
            </div>

            {/* Quick navigation – 32px below For You */}
            <div className="flex flex-wrap justify-center" style={{ marginTop: 32, gap: 64 }}>
              {QUICK_LINKS.map((link) => (
                <button
                  key={link.label}
                  className="flex flex-col items-center gap-2 transition-all hover:opacity-80"
                  onClick={() => scrollToSection(link.section)}
                >
                  <div
                    className="flex h-16 w-16 items-center justify-center rounded-full transition-all"
                    style={{
                      background: link.bg,
                      boxShadow: activeQuickLink === link.section ? "0 0 0 3px hsl(var(--foreground))" : "none",
                    }}
                  >
                    <img
                      src={link.icon}
                      alt={link.label}
                      style={{
                        width: link.label === "All" ? 18 : 24,
                        height: link.label === "All" ? 18 : 24,
                        filter: "brightness(0) invert(1)",
                      }}
                    />
                  </div>
                  <span
                    className="text-center text-foreground"
                    style={{ fontFamily: "Arial, sans-serif", fontSize: 14, lineHeight: "22px" }}
                  >
                    {link.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Scrollable sections ── */}
        <div className="px-9 pb-16">
          {/* Inspiration Labs */}
          <div id="section-labs">
            <SectionHeader title="Inspiration Labs" />
            <div className="flex gap-[22px] overflow-x-auto hide-scrollbar" style={{ marginTop: 24 }}>
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
          </div>

          {/* AIdeo World banner – 64px gap */}
          <div id="section-aideo" style={{ marginTop: 64 }}>
            <div className="relative overflow-hidden rounded-[20px]" style={{ height: 412 }}>
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
              <GlassButton className="absolute" style={{ left: 25, top: 299, width: 179, height: 41 }}>
                Check It Out
              </GlassButton>
            </div>
          </div>

          {/* Fun – 64px gap */}
          <div id="section-fun" style={{ marginTop: 64 }}>
            <SectionHeader title="Fun" />
            <div className="flex gap-[26px] overflow-x-auto hide-scrollbar" style={{ marginTop: 24 }}>
              {FUN_ITEMS.map((src, index) => (
                <div key={index} className="group relative h-[240px] w-[240px] flex-shrink-0 cursor-pointer overflow-hidden rounded-[5px]">
                  <img src={src} alt="Fun asset" className="h-full w-full object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 h-[50px]" style={{ background: "hsl(var(--foreground) / 0.28)", filter: "blur(19px)" }} />
                </div>
              ))}
            </div>
          </div>

          {/* Toolkits – 64px gap */}
          <div id="section-toolkits" style={{ marginTop: 64 }}>
            <SectionHeader title="Toolkits" />
            <div className="flex gap-3" style={{ marginTop: 24 }}>
              {TOOLKIT_ITEMS.map((item, index) => (
                <div key={index} className="h-[340px] flex-1 cursor-pointer overflow-hidden rounded-[5px]">
                  <img src={item.src} alt="Toolkit preview" className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Assets banner – 64px gap */}
          <div id="section-assets" style={{ marginTop: 64 }}>
            <div className="relative overflow-hidden rounded-[5px]" style={{ height: 297 }}>
              <img src={bannerBg} alt="Assets Library" className="h-full w-full object-cover" />
              <div className="absolute left-[28px] top-[62px]">
                <h3 className="font-bold text-foreground" style={{ fontFamily: "Arial, sans-serif", fontSize: 28, lineHeight: "32px" }}>
                  Assets Library
                </h3>
              </div>
              <GlassButton className="absolute" style={{ left: 38, top: 182, width: 215, height: 43 }}>
                Check It Out
              </GlassButton>
            </div>
          </div>
        </div>
      </div>

      {/* Announcement Modal */}
      {showAnnouncement && <AnnouncementModal onClose={() => setShowAnnouncement(false)} />}
    </div>
  );
};

/* ───── Top‑right header ───── */
const TopRightHeader = () => (
  <div className="fixed right-0 top-0 z-50 flex items-center gap-4" style={{ padding: "24px 32px" }}>
    {/* Free Credit button with gift icon */}
    <button className="flex items-center gap-2 rounded-full" style={{ background: "hsl(var(--foreground) / 0.08)", padding: "8px 16px" }}>
      <img src={iconGift} alt="gift" style={{ width: 18, height: 18 }} />
      <span className="text-foreground" style={{ fontFamily: "Arial, sans-serif", fontSize: 16, lineHeight: "24px" }}>Free Credit</span>
    </button>
    {/* Credit score display */}
    <div className="flex items-center gap-1.5 rounded-full" style={{ background: "hsl(var(--foreground) / 0.08)", padding: "8px 16px" }}>
      <img src={iconCredit} alt="credit" style={{ width: 16, height: 16 }} />
      <span style={{ fontFamily: "Arial, sans-serif", fontSize: 16, lineHeight: "24px", color: "#71F0F6" }}>0</span>
    </div>
    {/* Subscribe Now */}
    <GlassButton style={{ width: 180, height: 40 }}>
      Subscribe Now
    </GlassButton>
  </div>
);

/* ───── For‑You showcase with carousel (3 images, center focus) ───── */
const ForYouShowcase = () => {
  const [currentSet, setCurrentSet] = useState(0);
  const imgs = SHOWCASE_SETS[currentSet];

  const prev = () => setCurrentSet((c) => (c - 1 + SHOWCASE_SETS.length) % SHOWCASE_SETS.length);
  const next = () => setCurrentSet((c) => (c + 1) % SHOWCASE_SETS.length);

  return (
    <div>
      {/* Title row */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-foreground" style={{ fontFamily: "Arial, sans-serif", fontSize: 20, lineHeight: "16px" }}>
          For You
        </h2>
        <div className="flex items-center gap-2">
          <CarouselArrow direction="left" onClick={prev} />
          <CarouselArrow direction="right" onClick={next} />
        </div>
      </div>

      {/* 3-image carousel */}
      <div className="relative flex items-center justify-center" style={{ height: 420, gap: 16 }}>
        {/* Left image – smaller, dimmed */}
        <div
          className="flex-shrink-0 overflow-hidden rounded-[12px] transition-all duration-500"
          style={{ width: "28%", height: "85%", opacity: 0.6, filter: "brightness(0.7)" }}
        >
          <img src={imgs[0]} alt="" className="h-full w-full object-cover" />
        </div>

        {/* Center image – largest, highlighted */}
        <div
          className="flex-shrink-0 overflow-hidden rounded-[14px] transition-all duration-500 border"
          style={{
            width: "40%", height: "100%", zIndex: 2,
            borderColor: "hsl(var(--foreground) / 0.1)",
            boxShadow: "0 8px 32px hsl(var(--background) / 0.5)",
          }}
        >
          <img src={imgs[1]} alt="" className="h-full w-full object-cover" />
        </div>

        {/* Right image – smaller, dimmed */}
        <div
          className="flex-shrink-0 overflow-hidden rounded-[12px] transition-all duration-500"
          style={{ width: "28%", height: "85%", opacity: 0.6, filter: "brightness(0.7)" }}
        >
          <img src={imgs[2]} alt="" className="h-full w-full object-cover" />
        </div>
      </div>

      {/* Pagination dots */}
      <div className="flex items-center justify-center gap-2 mt-4">
        {SHOWCASE_SETS.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSet(i)}
            className="rounded-full transition-all"
            style={{
              width: currentSet === i ? 24 : 8,
              height: 8,
              background: currentSet === i ? "#71F0F6" : "hsl(var(--foreground) / 0.3)",
            }}
          />
        ))}
      </div>
    </div>
  );
};

/* ───── Carousel arrow with 3 states ───── */
const CarouselArrow = ({ direction, onClick }: { direction: "left" | "right"; onClick: () => void }) => {
  const Icon = direction === "left" ? ChevronLeft : ChevronRight;

  return (
    <button
      onClick={onClick}
      className="flex h-8 w-8 items-center justify-center rounded-full
        bg-foreground/10 text-foreground/70
        hover:bg-foreground/20 hover:text-foreground
        active:bg-foreground/30 active:scale-95
        transition-all duration-200"
      aria-label={direction === "left" ? "Previous" : "Next"}
    >
      <Icon size={16} />
    </button>
  );
};

/* ───── Section header ───── */
const SectionHeader = ({ title }: { title: string }) => (
  <div className="flex items-center justify-between">
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

/* ───── Reusable dropdown pill (opens downward) ───── */
const OptionPillDropdown = ({
  icon, label, options, value, onChange,
}: {
  icon?: string;
  label: string;
  options: { label: string; value: string }[];
  value: string;
  onChange: (v: string) => void;
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
        style={{ padding: "0 16px", border: "0.7px solid hsl(var(--foreground) / 0.25)", gap: 8 }}
      >
        {icon && <img src={icon} alt="" className="w-4 h-4" style={{ opacity: 0.7 }} />}
        <span style={{ fontFamily: "Arial, sans-serif", fontSize: 14, lineHeight: "22px", color: "hsl(var(--foreground) / 0.8)" }}>
          {label}
        </span>
        <ChevronDown size={14} className="text-foreground/50" style={{ marginLeft: -2 }} />
      </button>
      {open && (
        <div
          className="absolute top-full left-0 mt-2 rounded-xl border border-foreground/10 shadow-lg z-50 py-1"
          style={{ minWidth: 160, background: "#1a1a1a" }}
        >
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => { onChange(opt.value); setOpen(false); }}
              className={`w-full flex items-center text-left transition-colors hover:bg-foreground/10 ${
                value === opt.value ? "text-primary" : "text-foreground/70 hover:text-foreground"
              }`}
              style={{ padding: "8px 16px", gap: 8, fontFamily: "Arial, sans-serif", fontSize: 16, lineHeight: "16px" }}
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

/* ───── Model dropdown (redesigned with badge + desc) ───── */
const ModelPillDropdown = ({
  value, onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = MODEL_OPTIONS.find(o => o.value === value);

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
        style={{ padding: "0 16px", border: "0.7px solid hsl(var(--foreground) / 0.25)", gap: 8 }}
      >
        <span style={{ fontFamily: "Arial, sans-serif", fontSize: 14, lineHeight: "22px", color: "hsl(var(--foreground) / 0.8)" }}>
          {selected?.label || "Seedance"}
        </span>
        <ChevronDown size={14} className="text-foreground/50" style={{ marginLeft: -2 }} />
      </button>
      {/* NEW badge on model pill */}
      {selected && MODEL_OPTIONS.some(o => o.isNew) && (
        <div className="absolute -right-2 -top-3" style={{ width: 30, height: 30 }}>
          <img src={iconNewBadge} alt="new" className="w-full h-full" />
        </div>
      )}
      {open && (
        <div
          className="absolute top-full left-0 mt-2 rounded-2xl border border-foreground/10 shadow-2xl z-50 overflow-hidden"
          style={{ width: 320, background: "rgba(26, 26, 26, 0.95)", backdropFilter: "blur(20px)" }}
        >
          {/* Header */}
          <div style={{ padding: "12px 16px 8px" }}>
            <span style={{ fontFamily: "Arial, sans-serif", fontSize: 13, fontWeight: 700, color: "#71F0F6" }}>
              Select Mode
            </span>
          </div>
          {/* Options */}
          {MODEL_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => { onChange(opt.value); setOpen(false); }}
              className="w-full flex items-start text-left transition-colors hover:bg-foreground/8"
              style={{ padding: "12px 16px", gap: 12 }}
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-foreground" style={{ fontFamily: "Arial, sans-serif", fontSize: 15 }}>
                    {opt.label}
                  </span>
                  <span
                    className="rounded px-1.5 py-0.5"
                    style={{ fontSize: 11, background: "hsl(var(--foreground) / 0.1)", color: "hsl(var(--foreground) / 0.6)" }}
                  >
                    {opt.badge}
                  </span>
                  {opt.isNew && (
                    <img src={iconNewBadge} alt="new" style={{ width: 28, height: 12 }} />
                  )}
                </div>
                <p style={{ fontFamily: "Arial, sans-serif", fontSize: 12, lineHeight: "18px", color: "hsl(var(--foreground) / 0.5)", marginTop: 4 }}>
                  {opt.desc}
                </p>
              </div>
              {value === opt.value && (
                <Check size={16} className="flex-shrink-0 mt-1" style={{ color: "#71F0F6" }} />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

/* ───── Ratio icon & toggle ───── */
const RatioIcon = ({ ratio, selected }: { ratio: string; selected?: boolean }) => {
  const dims = ratio === "16:9" ? { w: 16, h: 10 } : { w: 10, h: 16 };
  return (
    <div
      style={{
        width: dims.w, height: dims.h,
        border: `1.5px solid ${selected ? "#71F0F6" : "hsl(var(--foreground) / 0.5)"}`,
        borderRadius: 2,
      }}
    />
  );
};

const RatioToggle = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => (
  <div
    className="flex h-[31px] items-center rounded-full"
    style={{ border: "0.7px solid hsl(var(--foreground) / 0.25)", padding: "0 4px", gap: 2 }}
  >
    {RATIO_OPTIONS.map((opt) => (
      <button
        key={opt.value}
        onClick={() => onChange(opt.value)}
        className="flex h-[25px] w-[30px] items-center justify-center rounded-full transition-colors"
        style={{ background: value === opt.value ? "hsl(var(--foreground) / 0.15)" : "transparent" }}
      >
        <RatioIcon ratio={opt.value} selected={value === opt.value} />
      </button>
    ))}
  </div>
);

/* ───── Glass CTA button (Figma spec) ───── */
const GlassButton = ({
  children, style, className, onClick,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  onClick?: () => void;
}) => {
  const id = useRef(`glass-${Math.random().toString(36).slice(2, 8)}`).current;

  return (
    <button
      onClick={onClick}
      data-glass={id}
      className={`relative flex items-center justify-center rounded-full overflow-hidden transition-all active:scale-[0.97] ${className || ""}`}
      style={{ background: "rgba(69, 196, 246, 0.05)", borderRadius: 20.45, ...style }}
    >
      <div
        className="absolute pointer-events-none"
        data-glass-glow={id}
        style={{
          left: 6, right: 4, top: 6, bottom: 5,
          background: "rgba(69, 196, 246, 0.6)",
          filter: "blur(6.75px)",
          borderRadius: 20.45,
          transition: "background 0.2s, filter 0.2s",
        }}
      />
      <span
        className="relative font-bold"
        style={{ fontFamily: "Arial, sans-serif", fontSize: 15, lineHeight: "23px", color: "#71F0F6" }}
      >
        {children}
      </span>
      <style>{`
        [data-glass="${id}"]:hover [data-glass-glow="${id}"] {
          background: rgba(69, 196, 246, 0.85) !important;
          filter: blur(10px) !important;
        }
      `}</style>
    </button>
  );
};

/* ───── Make pill button ───── */
const MakePill = () => {
  const id = useRef(`make-${Math.random().toString(36).slice(2, 8)}`).current;

  return (
    <button
      data-make={id}
      className="relative ml-auto flex h-[29px] items-center justify-center rounded-full px-[10px] overflow-hidden transition-all active:scale-[0.97]"
      style={{ background: "rgba(69, 196, 246, 0.05)", borderRadius: 20.45 }}
    >
      <div
        className="absolute pointer-events-none"
        data-make-glow={id}
        style={{
          left: 6, right: 4, top: 6, bottom: 5,
          background: "rgba(69, 196, 246, 0.6)",
          filter: "blur(6.75px)",
          borderRadius: 20.45,
          transition: "background 0.2s, filter 0.2s",
        }}
      />
      <span className="relative font-bold" style={{ fontFamily: "Arial, sans-serif", fontSize: 10.9, lineHeight: "16px", color: "#71F0F6" }}>
        Make
      </span>
      <span className="relative ml-1" style={{ fontFamily: "Arial, sans-serif", fontSize: 10.9, lineHeight: "16px" }}>
        <span style={{ background: "linear-gradient(90deg, #71F0F6 25%, #AEF5FB 84%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          ✦
        </span>
      </span>
      <span className="relative ml-1" style={{ fontFamily: "Arial, sans-serif", fontSize: 10.9, lineHeight: "16px", color: "#71F0F6" }}>
        10/s
      </span>
      <style>{`
        [data-make="${id}"]:hover [data-make-glow="${id}"] {
          background: rgba(69, 196, 246, 0.85) !important;
          filter: blur(10px) !important;
        }
      `}</style>
    </button>
  );
};

/* ───── Announcement Modal (frosted glass) ───── */
const AnnouncementModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: "rgba(0, 0, 0, 0.6)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="relative"
        style={{
          width: 480,
          background: "rgba(26, 26, 26, 0.85)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderRadius: 20,
          padding: 24,
          border: "1px solid rgba(255, 255, 255, 0.08)",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute z-10 flex items-center justify-center rounded-full transition-all hover:bg-foreground/20"
          style={{ right: 16, top: 16, width: 32, height: 32, background: "hsl(var(--foreground) / 0.1)" }}
        >
          <X size={16} className="text-foreground/70" />
        </button>

        {/* Hero image */}
        <div className="overflow-hidden rounded-[12px]" style={{ height: 200 }}>
          <img src={bannerBg} alt="Announcement" className="w-full h-full object-cover" />
        </div>

        {/* Content */}
        <div style={{ marginTop: 20 }}>
          <h3
            className="font-bold text-foreground"
            style={{ fontFamily: "Arial, sans-serif", fontSize: 22, lineHeight: "28px" }}
          >
            The Most Powerful <span style={{ color: "#71F0F6" }}>Model 2.0</span> is Here
          </h3>

          <div className="flex flex-col gap-3" style={{ marginTop: 16 }}>
            {[
              { highlight: "10x faster", text: " video generation with enhanced AI engine" },
              { highlight: "Cinema-grade", text: " quality output at up to 4K resolution" },
              { highlight: "Multi-scene", text: " storytelling with intelligent transitions" },
              { highlight: "Voice & Music", text: " auto-generation for complete productions" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <div
                  className="flex-shrink-0 flex items-center justify-center rounded-full mt-0.5"
                  style={{ width: 18, height: 18, background: "rgba(113, 240, 246, 0.15)" }}
                >
                  <Check size={12} style={{ color: "#71F0F6" }} />
                </div>
                <p style={{ fontFamily: "Arial, sans-serif", fontSize: 14, lineHeight: "20px", color: "hsl(var(--foreground) / 0.7)" }}>
                  <span className="font-bold" style={{ color: "#71F0F6" }}>{item.highlight}</span>
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          <p style={{ marginTop: 16, fontFamily: "Arial, sans-serif", fontSize: 12, lineHeight: "18px", color: "hsl(var(--foreground) / 0.4)" }}>
            Available now for all subscribers. Free users get 3 trial generations.
          </p>

          {/* CTA */}
          <div className="flex justify-end" style={{ marginTop: 20 }}>
            <GlassButton onClick={onClose} style={{ width: 140, height: 40 }}>
              Get Started
            </GlassButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
