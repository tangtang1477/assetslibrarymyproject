import { useState, useRef, useEffect, useCallback, forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, ChevronDown, X, Check, Sparkles, Lock } from "lucide-react";
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
import avatarSara from "@/assets/avatar-sara.jpg";
import avatarNeko from "@/assets/avatar-neko.jpg";
import avatarCindy from "@/assets/avatar-cindy.jpg";
import avatarQueen from "@/assets/avatar-queen.jpg";
import avatarSam from "@/assets/avatar-sam.jpg";
import avatarJason from "@/assets/avatar-jason.jpg";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

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

/* ───── 4-tier model system (from PDF doc) ───── */
const MODEL_OPTIONS = [
  { label: "⚡ Fast-Gen", value: "fastgen", badge: "Free", desc: "Instant text-to-video, daily free credits", isNew: false, badgeLabel: "Free" },
  { label: "AI Director", value: "director", badge: "Standard", desc: "Character consistency, reference images, storyboarding", isNew: true, badgeLabel: "MF" },
  { label: "🎬 Story Agent", value: "storyagent", badge: "✨ New", desc: "Script-driven Agent with character lock & auto scenes", isNew: true, badgeLabel: "New" },
  { label: "🌪 Cinematic", value: "cinematic", badge: "Ultra", desc: "Cinema-grade physics, lighting & unlimited styles", isNew: false, badgeLabel: "Ultra" },
];

type ModelConfigType = {
  placeholder: string;
  cta: string;
  ctaIcon?: string;
  maxRefs: number;
  styleCount: number;
  lockCharacter: boolean;
  agentThinking: boolean;
  hideUpload?: boolean;
  locked?: boolean;
};

const MODEL_CONFIG: Record<string, ModelConfigType> = {
  fastgen: {
    placeholder: "Describe your scene...",
    cta: "Generate",
    ctaIcon: "⚡",
    maxRefs: 0,
    styleCount: 0,
    lockCharacter: false,
    agentThinking: false,
    hideUpload: true,
  },
  director: {
    placeholder: "Describe your story...",
    cta: "Generate",
    maxRefs: 3,
    styleCount: 5,
    lockCharacter: false,
    agentThinking: false,
  },
  storyagent: {
    placeholder: "Paste your script, let the Agent do the rest...",
    cta: "Summon Agent",
    ctaIcon: "🚀",
    maxRefs: 4,
    styleCount: 12,
    lockCharacter: true,
    agentThinking: true,
  },
  cinematic: {
    placeholder: "",
    cta: "Join Waitlist",
    ctaIcon: "🎟",
    maxRefs: 5,
    styleCount: 20,
    lockCharacter: false,
    agentThinking: false,
    locked: true,
  },
};

/* ───── 36 languages (scrollable, no scrollbar) ───── */
const LANGUAGE_OPTIONS = [
  { label: "EN", value: "en" }, { label: "中文", value: "zh" }, { label: "日本語", value: "ja" },
  { label: "한국어", value: "ko" }, { label: "Español", value: "es" }, { label: "Français", value: "fr" },
  { label: "Deutsch", value: "de" }, { label: "Italiano", value: "it" }, { label: "Português", value: "pt" },
  { label: "Русский", value: "ru" }, { label: "العربية", value: "ar" }, { label: "हिन्दी", value: "hi" },
  { label: "Türkçe", value: "tr" }, { label: "Polski", value: "pl" }, { label: "Nederlands", value: "nl" },
  { label: "Svenska", value: "sv" }, { label: "Norsk", value: "no" }, { label: "Dansk", value: "da" },
  { label: "Suomi", value: "fi" }, { label: "Ελληνικά", value: "el" }, { label: "Čeština", value: "cs" },
  { label: "Română", value: "ro" }, { label: "Magyar", value: "hu" }, { label: "ภาษาไทย", value: "th" },
  { label: "Tiếng Việt", value: "vi" }, { label: "Bahasa ID", value: "id" }, { label: "Bahasa MY", value: "ms" },
  { label: "Filipino", value: "fil" }, { label: "Українська", value: "uk" }, { label: "עברית", value: "he" },
  { label: "فارسی", value: "fa" }, { label: "বাংলা", value: "bn" }, { label: "தமிழ்", value: "ta" },
  { label: "Kiswahili", value: "sw" }, { label: "Català", value: "ca" }, { label: "Slovenčina", value: "sk" },
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

/* ───── Character cast list ───── */
const CHARACTERS = [
  { name: "Sara", avatar: avatarSara },
  { name: "Neko", avatar: avatarNeko },
  { name: "Cindy", avatar: avatarCindy },
  { name: "Queen", avatar: avatarQueen },
  { name: "Sam", avatar: avatarSam },
  { name: "Jason", avatar: avatarJason },
];

/* ───── For‑You showcase videos (7 items) ───── */
const SHOWCASE_ITEMS = [
  { poster: project1, title: "Cinematic Landscape" },
  { poster: project2, title: "Urban Night" },
  { poster: project3, title: "Nature Documentary" },
  { poster: project4, title: "Abstract Art" },
  { poster: project5, title: "Sci-Fi Scene" },
  { poster: assetChar1, title: "Character Animation" },
  { poster: assetChar2, title: "Fantasy World" },
];

/* ───── Main page ───── */
const Home = () => {
  const navigate = useNavigate();
  const [selectedModel, setSelectedModel] = useState("director");
  const [selectedLang, setSelectedLang] = useState("en");
  const [selectedEnhance, setSelectedEnhance] = useState("on");
  const [selectedTime, setSelectedTime] = useState("6min");
  const [selectedRatio, setSelectedRatio] = useState("16:9");
  const [activeQuickLink, setActiveQuickLink] = useState("all");
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);
  const [inputText, setInputText] = useState("");
  const [showAtMenu, setShowAtMenu] = useState(false);
  const [agentThinking, setAgentThinking] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const config = MODEL_CONFIG[selectedModel] || MODEL_CONFIG.director;

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

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setInputText(val);
    // Show @ menu when user types @
    if (val.endsWith("@")) {
      setShowAtMenu(true);
    } else {
      setShowAtMenu(false);
    }
  };

  const handleSelectCharacterFromAt = (name: string) => {
    setInputText(prev => prev.replace(/@$/, `@${name} `));
    setShowAtMenu(false);
    setSelectedCharacter(name);
    textareaRef.current?.focus();
  };

  const handleCTA = () => {
    if (config.agentThinking) {
      setAgentThinking(true);
      setTimeout(() => setAgentThinking(false), 3000);
    }
  };

  return (
    <div className="h-screen bg-background flex overflow-hidden">
      <Sidebar activePage="home" />

      <div ref={scrollRef} className="flex-1 ml-[88px] overflow-y-auto hide-scrollbar">
        {/* ── Hero section with video banner behind input ── */}
        <div className="relative px-9 pt-6" style={{ minHeight: 800 }}>
          {/* Video banner background */}
          <div
            className="absolute left-9 right-9 top-0 overflow-hidden"
            style={{ height: 400, borderRadius: 16 }}
          >
            <video
              src="/banner-video.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Bottom edge gradient fade — no full overlay */}
            <div
              className="absolute left-0 right-0 bottom-0 pointer-events-none"
              style={{ height: 160, background: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.7) 60%, #000 100%)" }}
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

            {/* Character Cast List — 48px avatars, left-aligned with input */}
            <div className="flex items-center mt-6" style={{ gap: 20, width: 990, marginLeft: "auto", marginRight: "auto" }}>
              {CHARACTERS.map((char) => (
                <button
                  key={char.name}
                  className="flex flex-col items-center transition-all hover:opacity-90 active:scale-95"
                  style={{ gap: 6 }}
                  onClick={() => setSelectedCharacter(selectedCharacter === char.name ? null : char.name)}
                >
                  <div
                    className="rounded-full flex-shrink-0 overflow-hidden"
                    style={{
                      width: 48, height: 48,
                      border: selectedCharacter === char.name ? "2px solid #71F0F6" : "2px solid #191E1F",
                      transition: "border-color 0.2s ease",
                    }}
                  >
                    <img src={char.avatar} alt={char.name} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <span
                    className="text-center"
                    style={{
                      fontFamily: "Arial, sans-serif", fontSize: 12, lineHeight: "14px",
                      color: selectedCharacter === char.name ? "#71F0F6" : "hsl(var(--foreground) / 0.7)",
                      transition: "color 0.2s ease",
                    }}
                  >
                    {char.name}
                  </span>
                </button>
              ))}
            </div>

            {/* Input box */}
            <div className="mt-6 flex w-full justify-center">
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
                {/* Cinematic locked overlay */}
                {config.locked && (
                  <div className="absolute inset-0 z-20 flex items-center justify-center rounded-[25px]"
                    style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}>
                    <video src="/banner-video.mp4" autoPlay loop muted playsInline
                      className="absolute inset-0 w-full h-full object-cover rounded-[25px] opacity-30" />
                    <button
                      className="glass-btn relative z-30 flex items-center justify-center rounded-full overflow-hidden px-6 py-3"
                      style={{ background: "rgba(69, 196, 246, 0.05)", borderRadius: 20.45, animation: "pulse 2s infinite" }}
                    >
                      <div className="glass-btn-glow absolute pointer-events-none"
                        style={{ left: 6, right: 4, top: 6, bottom: 5, background: "rgba(69, 196, 246, 0.6)", filter: "blur(6.75px)", borderRadius: 20.45 }} />
                      <span className="relative font-bold" style={{ fontFamily: "Arial, sans-serif", fontSize: 16, color: "#71F0F6", zIndex: 2 }}>
                        🎟 Join Waitlist
                      </span>
                    </button>
                  </div>
                )}

                <div className="flex items-start px-6 pt-4">
                  {/* Upload button — hidden for Fast-Gen */}
                  {!config.hideUpload && (
                    <div
                      className="mr-3 flex h-[50px] w-10 flex-shrink-0 items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
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
                  )}

                  {/* Real textarea input with @ support */}
                  <div className="relative flex-1">
                    <textarea
                      ref={textareaRef}
                      value={inputText}
                      onChange={handleInputChange}
                      placeholder={config.placeholder}
                      disabled={config.locked}
                      className="w-full bg-transparent border-none outline-none resize-none text-foreground"
                      style={{
                        fontFamily: "Arial, sans-serif", fontSize: 16, lineHeight: "24px",
                        letterSpacing: "0.015em", height: 72, paddingTop: 8,
                        color: "hsl(var(--foreground) / 0.9)",
                      }}
                    />
                    {/* @ mention popup */}
                    {showAtMenu && (
                      <div
                        className="absolute left-0 z-50 rounded-xl overflow-hidden"
                        style={{
                          top: -8, transform: "translateY(-100%)",
                          background: "rgba(20, 20, 20, 0.95)", backdropFilter: "blur(20px)",
                          border: "1px solid rgba(255,255,255,0.1)", minWidth: 200,
                        }}
                      >
                        {CHARACTERS.map((char) => (
                          <button
                            key={char.name}
                            onClick={() => handleSelectCharacterFromAt(char.name)}
                            className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-foreground/10 transition-colors text-left"
                          >
                            <div className="rounded-full overflow-hidden" style={{ width: 28, height: 28, flexShrink: 0 }}>
                              <img src={char.avatar} alt={char.name} className="w-full h-full object-cover" />
                            </div>
                            <span className="text-foreground" style={{ fontFamily: "Arial, sans-serif", fontSize: 14 }}>{char.name}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Lock Character indicator for Story Agent */}
                {config.lockCharacter && (
                  <div className="absolute right-6 top-4 flex items-center gap-1.5 rounded-full px-3 py-1 cursor-pointer hover:opacity-80 transition-opacity"
                    style={{ background: "rgba(113, 240, 246, 0.1)", border: "1px solid rgba(113, 240, 246, 0.3)" }}>
                    <Lock size={12} style={{ color: "#71F0F6" }} />
                    <span style={{ fontSize: 12, color: "#71F0F6", fontFamily: "Arial, sans-serif", fontWeight: 700 }}>Lock Character</span>
                  </div>
                )}

                {/* Agent thinking indicator */}
                {agentThinking && (
                  <div className="absolute left-6 right-6 top-16 flex items-center gap-2" style={{ zIndex: 30 }}>
                    <div className="flex gap-1">
                      <span className="inline-block w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#71F0F6", animationDelay: "0ms" }} />
                      <span className="inline-block w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#71F0F6", animationDelay: "300ms" }} />
                      <span className="inline-block w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#71F0F6", animationDelay: "600ms" }} />
                    </div>
                    <span style={{ fontFamily: "Arial, sans-serif", fontSize: 13, color: "#71F0F6" }}>
                      Agent is analyzing your script...
                    </span>
                  </div>
                )}

                {/* Input options bar */}
                <div className="absolute left-4 right-4 flex items-center" style={{ bottom: 8, gap: 8, zIndex: 60 }}>
                  <ModelPillDropdown value={selectedModel} onChange={setSelectedModel} />
                  <OptionPillDropdown
                    label={LANGUAGE_OPTIONS.find(o => o.value === selectedLang)?.label || "EN"}
                    options={LANGUAGE_OPTIONS}
                    value={selectedLang}
                    onChange={setSelectedLang}
                    scrollable
                    narrow
                  />
                  <OptionPillDropdown
                    label={ENHANCE_OPTIONS.find(o => o.value === selectedEnhance)?.label || "Enhance on"}
                    options={ENHANCE_OPTIONS}
                    value={selectedEnhance}
                    onChange={setSelectedEnhance}
                    highlightSelected
                  />
                  <OptionPillDropdown
                    label={TIME_OPTIONS.find(o => o.value === selectedTime)?.label || "6min"}
                    options={TIME_OPTIONS}
                    value={selectedTime}
                    onChange={setSelectedTime}
                    narrow
                  />
                  <RatioToggle value={selectedRatio} onChange={setSelectedRatio} />
                  <MakePill ctaText={config.cta} ctaIcon={config.ctaIcon} onClick={handleCTA} />
                </div>
              </div>
            </div>

            {/* For You showcase – 32px below input, NO title */}
            <div style={{ marginTop: 32 }} className="w-full">
              <ForYouShowcase />
            </div>

            {/* Quick navigation */}
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
                  <div className="absolute bottom-3 left-3 right-3 z-10">
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
                  {/* Check It Out button */}
                  <div className="absolute bottom-3 right-3 z-20">
                    <GlassButton style={{ width: 120, height: 32 }}>
                      Check It Out
                    </GlassButton>
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
              <div className="absolute left-[34px] top-[76px] z-10">
                <p className="text-foreground" style={{ fontFamily: "Arial, sans-serif", fontSize: 20, lineHeight: "23px" }}>
                  ✨New! Welcome to AIdeo World. Come and explore.
                </p>
              </div>
              <h2 className="absolute font-bold text-foreground z-10" style={{ left: 40, top: 129, fontFamily: "Arial, sans-serif", fontSize: 100, lineHeight: "16px" }}>
                AIdeo World
              </h2>
              <div className="absolute z-20" style={{ left: 25, top: 299 }}>
                <GlassButton style={{ width: 179, height: 41 }}>
                  Check It Out
                </GlassButton>
              </div>
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
              <div className="absolute left-[28px] top-[62px] z-10">
                <h3 className="font-bold text-foreground" style={{ fontFamily: "Arial, sans-serif", fontSize: 28, lineHeight: "32px" }}>
                  Assets Library
                </h3>
              </div>
              <div className="absolute z-20" style={{ left: 38, top: 182 }}>
                <GlassButton style={{ width: 215, height: 43 }}>
                  Check It Out
                </GlassButton>
              </div>
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
    <button className="flex items-center gap-2 rounded-full" style={{ background: "hsl(var(--foreground) / 0.08)", padding: "8px 16px" }}>
      <img src={iconGift} alt="gift" style={{ width: 18, height: 18 }} />
      <span className="text-foreground" style={{ fontFamily: "Arial, sans-serif", fontSize: 16, lineHeight: "24px" }}>Free Credit</span>
    </button>
    <div className="flex items-center gap-1.5 rounded-full" style={{ background: "hsl(var(--foreground) / 0.08)", padding: "8px 16px" }}>
      <img src={iconCredit} alt="credit" style={{ width: 16, height: 16 }} />
      <span style={{ fontFamily: "Arial, sans-serif", fontSize: 16, lineHeight: "24px", color: "#71F0F6" }}>0</span>
    </div>
    <GlassButton style={{ width: 180, height: 40 }}>
      Subscribe Now
    </GlassButton>
  </div>
);

/* ───── For‑You showcase – 5 slots coverflow, no title ───── */
const ForYouShowcase = () => {
  const [centerIndex, setCenterIndex] = useState(0);
  const total = SHOWCASE_ITEMS.length;

  const getSlotIndex = (offset: number) => ((centerIndex + offset) % total + total) % total;

  const prev = () => setCenterIndex((c) => ((c - 1) % total + total) % total);
  const next = () => setCenterIndex((c) => (c + 1) % total);

  const slots = [-2, -1, 0, 1, 2].map((offset) => ({
    ...SHOWCASE_ITEMS[getSlotIndex(offset)],
    offset,
  }));

  const getSlotStyle = (offset: number): React.CSSProperties => {
    const absOff = Math.abs(offset);
    if (absOff === 0) {
      return { width: "34%", zIndex: 5, opacity: 1, transform: "scale(1)", filter: "none" };
    }
    if (absOff === 1) {
      return {
        width: "22%", zIndex: 3, opacity: 0.85,
        transform: `perspective(500px) rotateY(${offset < 0 ? 12 : -12}deg) scale(0.95)`,
      };
    }
    return {
      width: "14%", zIndex: 1, opacity: 0.5,
      transform: `perspective(400px) rotateY(${offset < 0 ? 25 : -25}deg) scale(0.85)`,
    };
  };

  return (
    <div className="relative">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10" style={{ left: -4 }}>
        <CarouselArrow direction="left" onClick={prev} />
      </div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10" style={{ right: -4 }}>
        <CarouselArrow direction="right" onClick={next} />
      </div>

      <div className="flex items-center justify-center" style={{ height: 260, gap: 8 }}>
        {slots.map((slot, i) => {
          const slotStyle = getSlotStyle(slot.offset);
          return (
            <div
              key={`${slot.offset}-${i}`}
              className="flex-shrink-0 overflow-hidden rounded-[10px]"
              style={{
                ...slotStyle,
                aspectRatio: "16/9",
                height: "auto",
                transition: "all 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)",
              }}
            >
              <img
                src={slot.poster}
                alt={slot.title}
                className="w-full h-full object-cover"
                style={{ aspectRatio: "16/9" }}
              />
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-center gap-2 mt-3">
        {SHOWCASE_ITEMS.map((_, i) => (
          <button
            key={i}
            onClick={() => setCenterIndex(i)}
            className="rounded-full transition-all"
            style={{
              width: centerIndex === i ? 24 : 8,
              height: 8,
              background: centerIndex === i ? "#71F0F6" : "hsl(var(--foreground) / 0.3)",
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

/* ───── Reusable dropdown pill (Popover-based) ───── */
const OptionPillDropdown = ({
  label, options, value, onChange, scrollable, narrow, highlightSelected,
}: {
  icon?: string;
  label: string;
  options: { label: string; value: string }[];
  value: string;
  onChange: (v: string) => void;
  scrollable?: boolean;
  narrow?: boolean;
  highlightSelected?: boolean;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className="flex h-[31px] items-center justify-center rounded-full transition-colors hover:bg-foreground/10"
          style={{ padding: narrow ? "0 12px" : "0 16px", border: "0.7px solid hsl(var(--foreground) / 0.25)", gap: 6 }}
        >
          <span style={{ fontFamily: "Arial, sans-serif", fontSize: 14, lineHeight: "22px", color: "hsl(var(--foreground) / 0.8)" }}>
            {label}
          </span>
          <ChevronDown size={14} className="text-foreground/50" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        side="bottom"
        align="start"
        sideOffset={8}
        className="border-foreground/10 p-1 shadow-2xl z-[9999]"
        style={{
          minWidth: narrow ? 120 : 160,
          maxHeight: scrollable ? 280 : undefined,
          overflowY: scrollable ? "auto" : undefined,
          background: "rgba(20, 20, 20, 0.95)",
          backdropFilter: "blur(20px)",
          borderRadius: 12,
        }}
      >
        <div className={scrollable ? "hide-scrollbar" : ""}>
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => { onChange(opt.value); setOpen(false); }}
              className={`w-full flex items-center text-left transition-colors rounded-lg hover:bg-foreground/10`}
              style={{
                padding: "8px 12px", gap: 8, fontFamily: "Arial, sans-serif", fontSize: 14, lineHeight: "16px",
                color: (highlightSelected && value === opt.value) ? "#71F0F6" : value === opt.value ? "#71F0F6" : "hsl(var(--foreground) / 0.7)",
              }}
            >
              {opt.label}
              {value === opt.value && <Check size={14} className="ml-auto" style={{ color: "#71F0F6" }} />}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

/* ───── Model dropdown (4-tier system) ───── */
const ModelPillDropdown = ({
  value, onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  const selected = MODEL_OPTIONS.find(o => o.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className="relative flex h-[31px] items-center justify-center rounded-full transition-colors hover:bg-foreground/10"
          style={{ padding: "0 16px", border: "0.7px solid hsl(var(--foreground) / 0.25)", gap: 8 }}
        >
          <span style={{ fontFamily: "Arial, sans-serif", fontSize: 14, lineHeight: "22px", color: "hsl(var(--foreground) / 0.8)" }}>
            {selected?.label || "AI Director"}
          </span>
          <ChevronDown size={14} className="text-foreground/50" style={{ marginLeft: -2 }} />
          {selected?.isNew && (
            <div className="absolute -right-2 -top-3" style={{ width: 30, height: 30 }}>
              <img src={iconNewBadge} alt="new" className="w-full h-full" />
            </div>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent
        side="bottom"
        align="start"
        sideOffset={8}
        className="border-foreground/10 p-0 shadow-2xl overflow-hidden z-[9999]"
        style={{ width: 340, background: "rgba(20, 20, 20, 0.95)", backdropFilter: "blur(20px)", borderRadius: 16 }}
      >
        {MODEL_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => { onChange(opt.value); setOpen(false); }}
            className="w-full flex items-start text-left transition-colors hover:bg-foreground/8"
            style={{
              padding: "12px 16px", gap: 12,
              background: value === opt.value ? "rgba(113, 240, 246, 0.06)" : "transparent",
            }}
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
                  {opt.badgeLabel}
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
      </PopoverContent>
    </Popover>
  );
};

/* ───── Ratio icon & toggle with smooth slider ───── */
const RatioIcon = ({ ratio, selected }: { ratio: string; selected?: boolean }) => {
  const dims = ratio === "16:9" ? { w: 16, h: 10 } : { w: 10, h: 16 };
  return (
    <div
      style={{
        width: dims.w, height: dims.h,
        border: `1.5px solid ${selected ? "#71F0F6" : "hsl(var(--foreground) / 0.5)"}`,
        borderRadius: 2,
        transition: "border-color 0.2s ease",
      }}
    />
  );
};

const RatioToggle = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => {
  const activeIdx = RATIO_OPTIONS.findIndex(o => o.value === value);
  return (
    <div
      className="relative flex h-[31px] items-center rounded-full"
      style={{ border: "0.7px solid hsl(var(--foreground) / 0.25)", padding: "0 4px", gap: 2 }}
    >
      {/* Smooth sliding background */}
      <div
        className="absolute rounded-full"
        style={{
          width: 30, height: 25,
          background: "hsl(var(--foreground) / 0.15)",
          left: 4 + activeIdx * 32,
          transition: "left 0.3s ease",
        }}
      />
      {RATIO_OPTIONS.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className="relative flex h-[25px] w-[30px] items-center justify-center rounded-full z-10"
        >
          <RatioIcon ratio={opt.value} selected={value === opt.value} />
        </button>
      ))}
    </div>
  );
};

/* ───── Glass CTA button (artlist.io-inspired solid cyan) ───── */
const GlassButton = forwardRef<
  HTMLButtonElement,
  {
    children: React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
    onClick?: () => void;
  }
>(({ children, style, className, onClick }, ref) => (
  <button
    ref={ref}
    onClick={onClick}
    className={`relative flex items-center justify-center rounded-full transition-all duration-200 hover:brightness-110 hover:shadow-[0_0_20px_rgba(113,240,246,0.4)] active:scale-[0.96] active:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${className || ""}`}
    style={{
      background: "linear-gradient(135deg, #71F0F6 0%, #45C4F6 50%, #3BB8E8 100%)",
      borderRadius: 24,
      color: "#000",
      fontFamily: "Arial, sans-serif",
      fontWeight: 700,
      fontSize: 14,
      lineHeight: "20px",
      letterSpacing: "0.01em",
      ...style,
    }}
  >
    <span className="relative" style={{ zIndex: 2 }}>
      {children}
    </span>
  </button>
));
GlassButton.displayName = "GlassButton";

/* ───── Make pill button (artlist.io solid cyan style) ───── */
const MakePill = ({ ctaText = "Make", ctaIcon, onClick }: { ctaText?: string; ctaIcon?: string; onClick?: () => void }) => (
  <button
    onClick={onClick}
    className="relative ml-auto flex h-[29px] items-center justify-center rounded-full px-[10px] transition-all duration-200 hover:brightness-110 hover:shadow-[0_0_16px_rgba(113,240,246,0.4)] active:scale-[0.96] active:brightness-95"
    style={{
      background: "linear-gradient(135deg, #71F0F6 0%, #45C4F6 50%, #3BB8E8 100%)",
      borderRadius: 20.45,
    }}
  >
    <span className="relative font-bold" style={{ fontFamily: "Arial, sans-serif", fontSize: 10.9, lineHeight: "16px", color: "#000", zIndex: 2 }}>
      {ctaIcon && <span className="mr-1">{ctaIcon}</span>}
      {ctaText}
    </span>
    <span className="relative ml-1" style={{ fontFamily: "Arial, sans-serif", fontSize: 10.9, lineHeight: "16px", zIndex: 2 }}>
      <span style={{ color: "#000" }}>
        ✦
      </span>
    </span>
    <span className="relative ml-1" style={{ fontFamily: "Arial, sans-serif", fontSize: 10.9, lineHeight: "16px", color: "#000", zIndex: 2 }}>
      10/s
    </span>
  </button>
);

/* ───── Announcement Modal (lighter frosted glass) ───── */
const AnnouncementModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: "rgba(0, 0, 0, 0.5)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="relative"
        style={{
          width: 480,
          background: "hsl(var(--background) / 0.05)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderRadius: 20,
          padding: 24,
          border: "1px solid rgba(255, 255, 255, 0.06)",
          boxShadow: "inset 0px 0px 7.3px rgba(255, 255, 255, 0.15), inset 0px 7.3px 14.6px rgba(255, 255, 255, 0.08), inset 0px 0.4px 0.49px rgba(255, 255, 255, 0.12), 0 24px 80px rgba(0,0,0,0.5)",
        }}
      >
        {/* Close button — no background, just X */}
        <button
          onClick={onClose}
          className="absolute z-20 flex items-center justify-center transition-all hover:opacity-100"
          style={{ right: 16, top: 16, opacity: 0.6 }}
        >
          <X size={20} className="text-foreground" />
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

          <div className="flex justify-end" style={{ marginTop: 20 }}>
            <GlassButton onClick={onClose} style={{ width: "100%", height: 44 }}>
              Get Started
            </GlassButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
