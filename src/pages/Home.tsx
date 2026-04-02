import { useState, useRef, useEffect, useCallback, forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp, X, Check, Sparkles, Film, Zap, Plus, Bell } from "lucide-react";
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
import iconNotice from "@/assets/icon-notice.svg";
import iconMore from "@/assets/icon-more.svg";
import iconProfile from "@/assets/icon-profile.svg";
import CreditPanel from "@/components/CreditPanel";
import BuyCreditsModal from "@/components/BuyCreditsModal";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

/* ───── Quick‑link data ───── */
const QUICK_LINKS = [
  { label: "All", icon: iconAll, bg: "linear-gradient(135deg, #1e3a5f, #2d5a8e)", section: "all" },
  { label: "Toolkit", icon: iconTool, bg: "linear-gradient(135deg, #1a3352, #264d7a)", section: "toolkits" },
  { label: "Lab", icon: iconAideo, bg: "linear-gradient(135deg, #162d4a, #1f4470)", section: "labs" },
  { label: "Assets", icon: iconAssets, bg: "linear-gradient(135deg, #1b3557, #2a5285)", section: "assets" },
  { label: "AIdeo World", icon: iconAideo, bg: "linear-gradient(135deg, #142840, #1c3d65)", section: "aideo" },
  { label: "Fun", icon: iconTool, bg: "linear-gradient(135deg, #112238, #19365c)", section: "fun" },
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

/* ───── 3-model system ───── */
const MODEL_OPTIONS = [
  {
    label: "Seedance 2.0",
    value: "surprise",
    badge: "Advanced",
    desc: "Multimodal creation, editing, extension, and precise prompt control",
    icon: "sparkles" as const,
  },
  {
    label: "Kling 2.0",
    value: "kling",
    badge: "Pro",
    desc: "Better character consistency and long-script scene understanding",
    icon: "film" as const,
  },
  {
    label: "Standard",
    value: "standard",
    badge: "Recommended",
    desc: "Balanced quality, speed, and control for daily creation",
    icon: "zap" as const,
  },
];

const MODEL_ICONS: Record<string, typeof Sparkles> = {
  sparkles: Sparkles,
  film: Film,
  zap: Zap,
};

type ModelConfigType = {
  placeholder: string;
  maxRefs: number;
  styleCount: number;
  agentThinking: boolean;
  hideUpload?: boolean;
  timeOptions: { label: string; value: string }[];
};

const MODEL_CONFIG: Record<string, ModelConfigType> = {
  surprise: {
    placeholder: "Create, edit, or extend with text, images, video, and audio...",
    maxRefs: 9,
    styleCount: 0,
    agentThinking: false,
    timeOptions: [
      { label: "4s", value: "4s" },
      { label: "5s", value: "5s" },
      { label: "10s", value: "10s" },
      { label: "15s", value: "15s" },
    ],
  },
  kling: {
    placeholder: "Describe your story or paste your script...",
    maxRefs: 4,
    styleCount: 5,
    agentThinking: false,
    timeOptions: [
      { label: "5s", value: "5s" },
      { label: "10s", value: "10s" },
    ],
  },
  standard: {
    placeholder: "Describe your story...",
    maxRefs: 3,
    styleCount: 5,
    agentThinking: false,
    timeOptions: [
      { label: "5s", value: "5s" },
      { label: "10s", value: "10s" },
    ],
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

const RATIO_OPTIONS = [
  { label: "16:9", value: "16:9" },
  { label: "9:16", value: "9:16" },
];

/* ───── Mock asset thumbnails ───── */
const MOCK_ASSET_THUMBS = [assetChar1, assetChar2, assetChar3, assetChar4, assetChar5, assetChar6, assetChar7, assetChar1, assetChar2];

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
  const [selectedModel, setSelectedModel] = useState("standard");
  const [selectedLang, setSelectedLang] = useState("en");
  const [selectedEnhance, setSelectedEnhance] = useState("on");
  const [selectedTime, setSelectedTime] = useState("5s");
  const [selectedRatio, setSelectedRatio] = useState("16:9");
  const [activeQuickLink, setActiveQuickLink] = useState("all");
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [inputText, setInputText] = useState("");
  const [agentThinking, setAgentThinking] = useState(false);
  
  // Asset reference system
  const [uploadedAssets, setUploadedAssets] = useState<{ id: number; name: string; thumbnail: string }[]>([]);
  const [referencedAssets, setReferencedAssets] = useState<number[]>([]);
  const [showAssetPanel, setShowAssetPanel] = useState(false);
  const [previewAsset, setPreviewAsset] = useState<{ id: number; name: string; thumbnail: string } | null>(null);
  
  const [modelPillFlash, setModelPillFlash] = useState(false);
  const [quotaExhausted, setQuotaExhausted] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notifications, setNotifications] = useState<{ id: number; text: string; time: string }[]>([]);
  const [showNotifPanel, setShowNotifPanel] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const modelPillRef = useRef<HTMLButtonElement>(null);
  const assetPanelRef = useRef<HTMLDivElement>(null);
  const mirrorRef = useRef<HTMLSpanElement>(null);
  const [atPosition, setAtPosition] = useState({ left: 0, top: 28 });

  const config = MODEL_CONFIG[selectedModel] || MODEL_CONFIG.standard;

  useEffect(() => {
    const timeOpts = config.timeOptions;
    if (!timeOpts.find(t => t.value === selectedTime)) {
      setSelectedTime(timeOpts[0].value);
    }
  }, [selectedModel]);

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
    if (val.endsWith("@") && uploadedAssets.length > 0) {
      setShowAssetPanel(true);
      requestAnimationFrame(() => {
        if (mirrorRef.current && textareaRef.current) {
          const atIdx = val.lastIndexOf("@");
          const textBefore = val.substring(0, atIdx);
          const lastLine = textBefore.split("\n").pop() || "";
          mirrorRef.current.textContent = lastLine;
          const left = Math.min(mirrorRef.current.offsetWidth, textareaRef.current.clientWidth - 200);
          const linesBefore = (textBefore.match(/\n/g) || []).length;
          const top = (linesBefore + 1) * 28 + 4;
          setAtPosition({ left: Math.max(0, left), top });
        }
      });
    } else if (!val.includes("@")) {
      setShowAssetPanel(false);
    }
  };

  const handleUploadAsset = () => {
    if (uploadedAssets.length >= 9) return;
    const newId = uploadedAssets.length + 1;
    setUploadedAssets(prev => [...prev, {
      id: newId,
      name: `Image ${newId}`,
      thumbnail: MOCK_ASSET_THUMBS[(newId - 1) % MOCK_ASSET_THUMBS.length],
    }]);
  };

  const handleReferenceAsset = (assetId: number) => {
    if (!referencedAssets.includes(assetId)) {
      setReferencedAssets(prev => [...prev, assetId]);
    }
    // Remove trailing @ from input text
    setInputText(prev => prev.replace(/@$/, ""));
    setShowAssetPanel(false);
  };

  const handleRemoveReference = (assetId: number) => {
    setReferencedAssets(prev => prev.filter(id => id !== assetId));
  };

  const handleDeleteAsset = (assetId: number) => {
    setUploadedAssets(prev => prev.filter(a => a.id !== assetId));
    setReferencedAssets(prev => prev.filter(id => id !== assetId));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Delete" || e.key === "Backspace") {
      if (!inputText && referencedAssets.length > 0) {
        e.preventDefault();
        setReferencedAssets(prev => prev.slice(0, -1));
      }
    }
  };

  const handleCTA = () => {
    if (selectedModel === "kling") {
      navigate("/subscribe");
      return;
    }
    if (config.agentThinking) {
      setAgentThinking(true);
      setTimeout(() => setAgentThinking(false), 3000);
    }
    // Show notification
    const newNotif = {
      id: Date.now(),
      text: "Your video is in progress. We'll notify you when it's ready.",
      time: "Just now",
    };
    setNotifications(prev => [newNotif, ...prev]);
    setShowNotification(true);
  };

  const [popupFlyOut, setPopupFlyOut] = useState(false);

  const getModelPillPosition = () => {
    if (!modelPillRef.current) return { x: 0, y: 0 };
    const rect = modelPillRef.current.getBoundingClientRect();
    return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
  };

  const [flyTarget, setFlyTarget] = useState<{ x: number; y: number } | null>(null);

  const handleTrySurprise = () => {
    const target = getModelPillPosition();
    setFlyTarget(target);
    setPopupFlyOut(true);
    setTimeout(() => {
      setShowAnnouncement(false);
      setPopupFlyOut(false);
      setFlyTarget(null);
      setSelectedModel("surprise");
      setModelPillFlash(true);
      setTimeout(() => setModelPillFlash(false), 6500);
    }, 700);
  };

  return (
    <div className="h-screen bg-background flex overflow-hidden">
      <Sidebar activePage="home" />

      <div ref={scrollRef} className="flex-1 ml-[88px] overflow-y-auto hide-scrollbar">
        {/* ── Hero section with video banner behind input ── */}
        <div className="relative px-9 pt-6" style={{ minHeight: 800 }}>
          {/* Video banner background */}
          <div
            className="absolute left-0 right-0 top-0 overflow-hidden"
            style={{ height: 400, borderRadius: 0 }}
          >
            <video
              src="/banner-video.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
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

          <TopRightHeader
            onBellClick={() => setShowNotifPanel(!showNotifPanel)}
            notifCount={notifications.length}
          />

          {/* Notification panel from bell */}
          {showNotifPanel && notifications.length > 0 && (
            <NotificationPanel
              notifications={notifications}
              onClose={() => setShowNotifPanel(false)}
              style={{ position: "fixed", top: 64, right: 32, zIndex: 200 }}
            />
          )}

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
            <div className="mt-6 flex w-full justify-center">
              <div
                className="relative w-[990px] rounded-[25px] hide-scrollbar"
                style={{
                  minHeight: 159,
                  maxHeight: 800,
                  overflowY: "auto",
                  background: "hsl(var(--background) / 0.05)",
                  boxShadow:
                    "inset 0px 0px 7.3px hsl(var(--foreground) / 0.25), inset 0px 7.3px 14.6px hsl(var(--foreground) / 0.15), inset 0px 0.4px 0.49px hsl(var(--foreground) / 0.2), inset 0px 0px 0.9px hsl(var(--foreground) / 0.12)",
                  backdropFilter: "blur(12.6px)",
                  WebkitBackdropFilter: "blur(12.6px)",
                }}
              >
                {/* Row 1: Asset upload slots INSIDE input box */}
                <div className="flex items-center px-6 pt-4" style={{ gap: 10 }}>
                  {uploadedAssets.map((asset) => (
                    <div
                      key={asset.id}
                      className="relative flex-shrink-0 rounded-lg overflow-hidden cursor-pointer group"
                      style={{ width: 48, height: 48, border: referencedAssets.includes(asset.id) ? "2px solid #71F0F6" : "2px solid rgba(255,255,255,0.1)" }}
                      onClick={() => setPreviewAsset(asset)}
                    >
                      <img src={asset.thumbnail} alt={asset.name} className="w-full h-full object-cover" />
                      {/* Default @ badge for referenced assets — just border, no bg block */}
                      {referencedAssets.includes(asset.id) && (
                        <div className="absolute bottom-0 right-0 flex items-center justify-center" style={{ padding: "1px 3px" }}>
                          <span style={{ fontSize: 9, fontWeight: 700, color: "#71F0F6" }}>@</span>
                        </div>
                      )}
                      {/* Hover overlay: delete (top-right) + @ (bottom-right) */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between items-end p-0.5">
                        <button
                          onClick={(e) => { e.stopPropagation(); handleDeleteAsset(asset.id); }}
                          className="flex items-center justify-center rounded-sm transition-opacity"
                          style={{ width: 16, height: 16, background: "rgba(255,255,255,0.3)" }}
                        >
                          <X size={10} style={{ color: "#fff" }} />
                        </button>
                        {!referencedAssets.includes(asset.id) && (
                          <button
                            onClick={(e) => { e.stopPropagation(); handleReferenceAsset(asset.id); }}
                            className="flex items-center justify-center rounded-sm transition-opacity"
                            style={{ width: 16, height: 16, border: "1.5px solid #71F0F6", background: "transparent" }}
                          >
                            <span style={{ fontSize: 9, fontWeight: 700, color: "#71F0F6" }}>@</span>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  {uploadedAssets.length < 9 && (
                    <button
                      onClick={handleUploadAsset}
                      className="flex-shrink-0 flex items-center justify-center rounded-lg transition-all hover:bg-[rgba(255,255,255,0.08)] active:scale-95"
                      style={{
                        width: 48, height: 48,
                        border: "2px dashed rgba(255,255,255,0.15)",
                        background: "rgba(255,255,255,0.03)",
                      }}
                    >
                      <Plus size={18} style={{ color: "rgba(255,255,255,0.4)" }} />
                    </button>
                  )}
                </div>

                {/* Row 2: Referenced thumbnails + placeholder + textarea on same line */}
                <div className="px-6 relative" style={{ paddingTop: 8 }}>
                  <div className="flex items-center gap-1.5 flex-wrap" style={{ minHeight: 28 }}>
                    {/* Inline referenced asset thumbnails */}
                    {referencedAssets.map((assetId) => {
                      const asset = uploadedAssets.find(a => a.id === assetId);
                      if (!asset) return null;
                      return (
                        <img
                          key={asset.id}
                          src={asset.thumbnail}
                          alt={asset.name}
                          className="rounded-md flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
                          style={{ width: 28, height: 28, objectFit: "cover" }}
                          onClick={() => handleRemoveReference(asset.id)}
                        />
                      );
                    })}
                    <div className="relative flex-1 min-w-[200px]">
                      {!inputText && referencedAssets.length === 0 && (
                        <div className="absolute inset-0 pointer-events-none flex items-start" style={{ paddingTop: 0 }}>
                          <span style={{ fontFamily: "Arial, sans-serif", fontSize: 16, lineHeight: "28px", color: "hsl(var(--foreground) / 0.4)" }}>
                            {config.placeholder}
                          </span>
                        </div>
                      )}
                      <textarea
                        ref={textareaRef}
                        value={inputText}
                        onChange={(e) => {
                          handleInputChange(e);
                          // Auto-resize
                          const el = e.target;
                          el.style.height = "auto";
                          el.style.height = el.scrollHeight + "px";
                        }}
                        onKeyDown={handleKeyDown}
                        rows={1}
                        className="w-full bg-transparent border-none outline-none resize-none text-foreground hide-scrollbar"
                        style={{
                          fontFamily: "Arial, sans-serif", fontSize: 16, lineHeight: "28px",
                          letterSpacing: "0.015em", minHeight: 28, height: "auto",
                          color: "hsl(var(--foreground) / 0.9)",
                          maxHeight: 400,
                          overflowY: "auto",
                        }}
                      />
                    </div>
                  </div>

                  {/* Asset reference panel (@ trigger) — below @ text, inside input */}
                  {showAssetPanel && uploadedAssets.length > 0 && (
                    <div
                      ref={assetPanelRef}
                      className="absolute z-[9999] rounded-xl overflow-hidden"
                      style={{
                        left: 24,
                        top: 48,
                        background: "rgba(20,20,22,0.98)",
                        backdropFilter: "blur(20px)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
                        animation: "assetPanelIn 0.2s ease-out",
                        width: "auto",
                        minWidth: 180,
                      }}
                    >
                      <div style={{ padding: "10px 14px 6px" }}>
                        <span style={{ fontFamily: "Arial, sans-serif", fontSize: 12, color: "rgba(255,255,255,0.4)" }}>Asset Reference</span>
                      </div>
                      {uploadedAssets.filter(a => !referencedAssets.includes(a.id)).map((asset) => (
                        <button
                          key={asset.id}
                          onClick={() => handleReferenceAsset(asset.id)}
                          className="w-full flex items-center gap-3 px-3 py-2.5 transition-colors text-left"
                          style={{ background: "transparent" }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                          onMouseDown={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.14)"; }}
                          onMouseUp={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
                        >
                          <img src={asset.thumbnail} alt={asset.name} className="rounded-md" style={{ width: 28, height: 28, objectFit: "cover", flexShrink: 0 }} />
                          <span style={{ fontFamily: "Arial, sans-serif", fontSize: 13, color: "rgba(255,255,255,0.85)", whiteSpace: "nowrap" }}>Image {asset.id}</span>
                        </button>
                      ))}
                      {uploadedAssets.filter(a => !referencedAssets.includes(a.id)).length === 0 && (
                        <div style={{ padding: "8px 14px 12px" }}>
                          <span style={{ fontFamily: "Arial, sans-serif", fontSize: 12, color: "rgba(255,255,255,0.3)" }}>All assets referenced</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

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
                  <ModelPillDropdown ref={modelPillRef} value={selectedModel} onChange={setSelectedModel} flash={modelPillFlash} />
                  <OptionPillDropdown
                    icon={iconLanguage}
                    label={LANGUAGE_OPTIONS.find(o => o.value === selectedLang)?.label || "EN"}
                    options={LANGUAGE_OPTIONS}
                    value={selectedLang}
                    onChange={setSelectedLang}
                    scrollable
                    narrow
                  />
                  <OptionPillDropdown
                    icon={iconEnhance}
                    label={ENHANCE_OPTIONS.find(o => o.value === selectedEnhance)?.label || "Enhance on"}
                    options={ENHANCE_OPTIONS}
                    value={selectedEnhance}
                    onChange={setSelectedEnhance}
                    highlightSelected
                  />
                  <OptionPillDropdown
                    icon={iconTime}
                    label={config.timeOptions.find(o => o.value === selectedTime)?.label || config.timeOptions[0].label}
                    options={config.timeOptions}
                    value={selectedTime}
                    onChange={setSelectedTime}
                    narrow
                  />
                  <RatioToggle value={selectedRatio} onChange={setSelectedRatio} />
                  <MakePill
                    ctaText={selectedModel === "kling" ? "Subscribe Now" : "Make"}
                    onClick={handleCTA}
                    showCredits={selectedModel !== "kling"}
                  />
                </div>
              </div>
            </div>

            {/* For You showcase */}
            <div style={{ marginTop: 32, width: "100%" }}>
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
                      boxShadow: activeQuickLink === link.section ? "0 0 0 2px rgba(255,255,255,0.9)" : "none",
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
                    className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none"
                    style={{
                      height: "50%",
                      background: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 100%)",
                      borderRadius: "0 0 10px 10px",
                    }}
                  />
                  <div
                    className="absolute bottom-0 left-0 right-0 z-20"
                    style={{ padding: "0 10px 10px" }}
                  >
                    <div
                      style={{
                        background: "rgba(255,255,255,0.08)",
                        backdropFilter: "blur(16px)",
                        WebkitBackdropFilter: "blur(16px)",
                        borderRadius: 10,
                        padding: "10px 12px",
                        border: "1px solid rgba(255,255,255,0.1)",
                        boxShadow: "0 -8px 24px rgba(0,0,0,0.2)",
                      }}
                    >
                      <p className="text-foreground" style={{ fontFamily: "Arial, sans-serif", fontSize: 14, lineHeight: "20px" }}>
                        {lab.desc}
                      </p>
                    </div>
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

          {/* AIdeo World banner */}
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

          {/* Fun */}
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

          {/* Toolkits */}
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

          {/* Assets banner */}
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

      {/* Asset Preview Modal */}
      {previewAsset && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.7)" }}
          onClick={() => setPreviewAsset(null)}
        >
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <img
              src={previewAsset.thumbnail}
              alt={previewAsset.name}
              className="rounded-xl"
              style={{ maxWidth: 500, maxHeight: 500, objectFit: "contain" }}
            />
            <button
              onClick={() => setPreviewAsset(null)}
              className="absolute flex items-center justify-center rounded-full transition-opacity hover:opacity-100"
              style={{ top: -12, right: -12, width: 28, height: 28, background: "rgba(255,255,255,0.2)", opacity: 0.7 }}
            >
              <X size={14} style={{ color: "#fff" }} />
            </button>
          </div>
        </div>
      )}

      {/* Notification toast — slides in from right */}
      {showNotification && notifications.length > 0 && (
        <NotificationPanel
          notifications={[notifications[0]]}
          onClose={() => setShowNotification(false)}
          style={{ position: "fixed", top: 80, right: 32, zIndex: 300 }}
          animate
        />
      )}

      {/* Announcement Modal */}
      {showAnnouncement && (
        <AnnouncementModal
          onClose={() => setShowAnnouncement(false)}
          onTrySurprise={handleTrySurprise}
          quotaExhausted={quotaExhausted}
          flyOut={popupFlyOut}
          flyTarget={flyTarget}
        />
      )}
    </div>
  );
};

/* ───── Notification Panel ───── */
const NotificationPanel = ({ notifications, onClose, style, animate }: {
  notifications: { id: number; text: string; time: string }[];
  onClose: () => void;
  style?: React.CSSProperties;
  animate?: boolean;
}) => (
  <div
    style={{
      width: 320,
      background: "rgba(28, 30, 34, 0.98)",
      borderRadius: 16,
      border: "1px solid rgba(255,255,255,0.08)",
      boxShadow: "0 12px 48px rgba(0,0,0,0.5)",
      overflow: "hidden",
      animation: animate ? "slideInRight 0.3s ease-out" : undefined,
      ...style,
    }}
  >
    <div className="flex items-center justify-between" style={{ padding: "14px 16px 10px" }}>
      <div className="flex items-center gap-2">
        <span style={{ fontFamily: "Arial, sans-serif", fontSize: 15, fontWeight: 700, color: "rgba(255,255,255,0.92)" }}>
          Notification
        </span>
        <span style={{
          fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 10,
          background: "rgba(113,240,246,0.15)", color: "#71F0F6",
        }}>
          New
        </span>
      </div>
      <button onClick={onClose} className="flex items-center justify-center transition-opacity hover:opacity-100" style={{ opacity: 0.5 }}>
        <X size={14} style={{ color: "#fff" }} />
      </button>
    </div>
    {notifications.map((notif) => (
      <div key={notif.id} style={{ padding: "10px 16px 14px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-0.5" style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(113,240,246,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Sparkles size={16} style={{ color: "#71F0F6" }} />
          </div>
          <div className="flex-1 min-w-0">
            <p style={{ fontFamily: "Arial, sans-serif", fontSize: 13, lineHeight: "18px", color: "rgba(255,255,255,0.85)" }}>
              {notif.text}
            </p>
            <span style={{ fontFamily: "Arial, sans-serif", fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 4, display: "block" }}>
              {notif.time}
            </span>
          </div>
        </div>
      </div>
    ))}
  </div>
);

/* ───── Top‑right header ───── */
const TopRightHeader = ({ onBellClick, notifCount }: { onBellClick: () => void; notifCount: number }) => (
  <div className="fixed right-0 top-0 z-50 flex items-center gap-4" style={{ padding: "24px 32px" }}>
    <button className="flex items-center gap-2 rounded-full" style={{ background: "hsl(var(--foreground) / 0.08)", padding: "8px 16px" }}>
      <img src={iconGift} alt="gift" style={{ width: 18, height: 18 }} />
      <span className="text-foreground" style={{ fontFamily: "Arial, sans-serif", fontSize: 16, lineHeight: "24px" }}>Free Credit</span>
    </button>
    <div className="flex items-center gap-1.5">
      <img src={iconCredit} alt="credit" style={{ width: 16, height: 16 }} />
      <span style={{ fontFamily: "Arial, sans-serif", fontSize: 16, lineHeight: "24px", color: "#71F0F6" }}>0</span>
    </div>
    <button
      onClick={onBellClick}
      className="relative flex items-center justify-center rounded-full transition-all hover:bg-foreground/10"
      style={{ width: 36, height: 36 }}
    >
      <img src={iconNotice} alt="notifications" style={{ width: 20, height: 20 }} />
      {notifCount > 0 && (
        <div className="absolute" style={{ top: 4, right: 4, width: 8, height: 8, borderRadius: 4, background: "#71F0F6" }} />
      )}
    </button>
    <GlassButton style={{ width: 180, height: 40 }}>
      Subscribe Now
    </GlassButton>
  </div>
);

/* ───── For‑You showcase – full-width, equal gap, manual nav, scale animation ───── */
const ForYouShowcase = () => {
  const VISIBLE_COUNT = 5;
  const [startIndex, setStartIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [justSwitched, setJustSwitched] = useState(false);
  const total = SHOWCASE_ITEMS.length;

  const showDots = isHovered || justSwitched;

  const prev = () => {
    setStartIndex((c) => ((c - 1) % total + total) % total);
    setJustSwitched(true);
    setTimeout(() => setJustSwitched(false), 2000);
  };
  const next = () => {
    setStartIndex((c) => (c + 1) % total);
    setJustSwitched(true);
    setTimeout(() => setJustSwitched(false), 2000);
  };

  // Get the 5 visible indices
  const visibleIndices = Array.from({ length: VISIBLE_COUNT }, (_, i) =>
    ((startIndex + i) % total + total) % total
  );

  return (
    <div
      className="flex flex-col items-center"
      style={{ width: "100%" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center" style={{ width: "100%", gap: 0 }}>
        {/* Left arrow */}
        <button
          onClick={prev}
          className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full
            bg-foreground/10 text-foreground/70
            hover:bg-foreground/20 hover:text-foreground hover:scale-110
            active:bg-foreground/30 active:scale-95
            transition-all duration-200"
          aria-label="Previous"
        >
          <ChevronLeft size={18} />
        </button>

        {/* Cards container — 3D perspective */}
        <div className="flex-1 flex items-center" style={{ gap: 12, padding: "0 16px", perspective: 1200 }}>
          {visibleIndices.map((idx, slotPos) => {
            const item = SHOWCASE_ITEMS[idx];
            const isCenter = slotPos === 2;
            const isMid = slotPos === 1 || slotPos === 3;
            // 3-tier sizing
            const cardHeight = isCenter ? 220 : isMid ? 200 : 180;
            const cardScale = isCenter ? 1.08 : isMid ? 1.0 : 0.92;
            const cardOpacity = isCenter ? 1 : isMid ? 0.85 : 0.65;
            // 3D rotateY + translateZ
            const rotateYValues = [35, 15, 0, -15, -35];
            const translateZValues = [-80, -30, 40, -30, -80];
            const zIndexValues = [1, 3, 5, 3, 1];

            return (
              <div
                key={`${startIndex}-${slotPos}`}
                className="flex-1 overflow-hidden rounded-[14px] cursor-pointer relative"
                style={{
                  height: cardHeight,
                  transform: `rotateY(${rotateYValues[slotPos]}deg) translateZ(${translateZValues[slotPos]}px) scale(${cardScale})`,
                  opacity: cardOpacity,
                  transition: "all 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)",
                  zIndex: zIndexValues[slotPos],
                  transformStyle: "preserve-3d",
                }}
              >
                <img
                  src={item.poster}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  draggable={false}
                />
                {/* Title overlay + dot indicators inside center card */}
                {isCenter && (
                  <>
                    <div
                      className="absolute bottom-0 left-0 right-0"
                      style={{
                        background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)",
                        padding: "20px 14px 14px",
                      }}
                    >
                      <span style={{ fontFamily: "Arial, sans-serif", fontSize: 13, color: "rgba(255,255,255,0.9)", fontWeight: 600 }}>
                        {item.title}
                      </span>
                    </div>
                    {/* Dot indicators inside center card */}
                    <div
                      className="absolute flex items-center justify-center transition-opacity duration-300"
                      style={{
                        bottom: 4,
                        left: "50%",
                        transform: "translateX(-50%)",
                        gap: 6,
                        opacity: showDots ? 1 : 0,
                        zIndex: 10,
                      }}
                    >
                      {SHOWCASE_ITEMS.map((_, i) => (
                        <button
                          key={i}
                          onClick={(e) => {
                            e.stopPropagation();
                            setStartIndex(((i - 2) % total + total) % total);
                            setJustSwitched(true);
                            setTimeout(() => setJustSwitched(false), 2000);
                          }}
                          className="rounded-full transition-all duration-300"
                          style={{
                            width: 6,
                            height: 6,
                            background: visibleIndices[2] === i ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.3)",
                            border: "none",
                            cursor: "pointer",
                          }}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* Right arrow */}
        <button
          onClick={next}
          className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full
            bg-foreground/10 text-foreground/70
            hover:bg-foreground/20 hover:text-foreground hover:scale-110
            active:bg-foreground/30 active:scale-95
            transition-all duration-200"
          aria-label="Next"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
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

/* ───── Reusable dropdown pill ───── */
const OptionPillDropdown = ({
  icon, label, options, value, onChange, scrollable, narrow, highlightSelected,
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
          {icon && <img src={icon} alt="" style={{ width: 14, height: 14, opacity: 0.7 }} />}
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
          minWidth: narrow ? 90 : 140,
          background: "rgba(20, 20, 20, 0.95)",
          backdropFilter: "blur(20px)",
          borderRadius: 12,
        }}
      >
        <div className={scrollable ? "hide-scrollbar" : ""} style={{
          maxHeight: scrollable ? 280 : undefined,
          overflowY: scrollable ? "auto" : undefined,
        }}>
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

/* ───── Model dropdown (3 models with icons + card style) ───── */
const ModelPillDropdown = forwardRef<HTMLButtonElement, {
  value: string;
  onChange: (v: string) => void;
  flash?: boolean;
}>(({ value, onChange, flash }, ref) => {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const selected = MODEL_OPTIONS.find(o => o.value === value);
  const SelectedIcon = selected ? MODEL_ICONS[selected.icon] : Zap;

  const triggerBg = open
    ? "rgba(113,240,246,0.16)"
    : hovered
      ? "rgba(113,240,246,0.10)"
      : "rgba(255,255,255,0.06)";
  const triggerBorder = open
    ? "1px solid rgba(113,240,246,0.55)"
    : hovered
      ? "1px solid rgba(113,240,246,0.35)"
      : "1px solid rgba(255,255,255,0.12)";
  const triggerShadow = flash
    ? undefined
    : open
      ? "0 0 16px 3px rgba(113,240,246,0.22), 0 0 40px 6px rgba(113,240,246,0.08)"
      : hovered
        ? "0 0 12px 2px rgba(113,240,246,0.15)"
        : "none";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          ref={ref}
          className="relative flex h-[31px] items-center rounded-full transition-all duration-200"
          style={{
            padding: "0 14px",
            gap: 8,
            background: triggerBg,
            border: triggerBorder,
            boxShadow: triggerShadow,
            animation: flash ? "surpriseGlow 1.5s ease-in-out 3" : "none",
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <SelectedIcon size={14} style={{ color: hovered || open ? "#71F0F6" : "rgba(255,255,255,0.7)", transition: "color 0.2s" }} />
          <span style={{ fontFamily: "Arial, sans-serif", fontSize: 14, lineHeight: "22px", color: "rgba(255,255,255,0.92)" }}>
            {selected?.label || "Standard"}
          </span>
          <ChevronDown size={14} style={{ color: hovered || open ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.5)", transition: "color 0.2s" }} />
        </button>
      </PopoverTrigger>
      <PopoverContent
        side="bottom"
        align="start"
        sideOffset={8}
        className="p-0 shadow-2xl overflow-hidden z-[9999]"
        style={{
          width: 320,
          background: "rgba(10,14,18,0.94)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.10)",
          borderRadius: 16,
          boxShadow: "0 16px 60px rgba(0,0,0,0.55)",
        }}
      >
        <div style={{ padding: "12px 16px 4px", fontFamily: "Arial, sans-serif", fontSize: 12, color: "rgba(255,255,255,0.45)" }}>
          Choose model
        </div>
        {MODEL_OPTIONS.map((opt) => {
          const OptIcon = MODEL_ICONS[opt.icon];
          const isSelected = value === opt.value;
          return (
            <button
              key={opt.value}
              onClick={() => { onChange(opt.value); setOpen(false); }}
              className="w-full flex items-start text-left transition-all duration-150 group"
              style={{
                padding: "12px 16px", gap: 12,
                background: isSelected ? "rgba(113,240,246,0.12)" : "transparent",
                borderLeft: isSelected ? "2px solid rgba(113,240,246,0.42)" : "2px solid transparent",
              }}
              onMouseEnter={(e) => {
                if (!isSelected) e.currentTarget.style.background = "rgba(113,240,246,0.06)";
              }}
              onMouseLeave={(e) => {
                if (!isSelected) e.currentTarget.style.background = "transparent";
              }}
            >
              <OptIcon size={18} style={{ color: isSelected ? "#71F0F6" : "rgba(255,255,255,0.5)", marginTop: 2, flexShrink: 0, transition: "color 0.15s" }} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold group-hover:text-[#71F0F6] transition-colors" style={{
                    fontFamily: "Arial, sans-serif", fontSize: 15,
                    color: isSelected ? "#71F0F6" : "rgba(255,255,255,0.92)",
                  }}>
                    {opt.label}
                  </span>
                  <span
                    className="rounded px-1.5 py-0.5"
                    style={{
                      fontSize: 11,
                      background: isSelected ? "rgba(113,240,246,0.15)" : "rgba(255,255,255,0.08)",
                      color: isSelected ? "#71F0F6" : "rgba(255,255,255,0.56)",
                    }}
                  >
                    {opt.badge}
                  </span>
                </div>
                <p style={{ fontFamily: "Arial, sans-serif", fontSize: 12, lineHeight: "18px", color: "rgba(255,255,255,0.56)", marginTop: 4 }}>
                  {opt.desc}
                </p>
              </div>
              {isSelected && (
                <Check size={16} className="flex-shrink-0 mt-1" style={{ color: "#71F0F6" }} />
              )}
            </button>
          );
        })}
      </PopoverContent>
    </Popover>
  );
});
ModelPillDropdown.displayName = "ModelPillDropdown";

/* ───── Ratio toggle ───── */
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

/* ───── Glass CTA button — artlist.io style with inner border div ───── */
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
    className={`glass-btn-v2 flex items-center justify-center focus-visible:outline-none ${className || ""}`}
    style={{
      borderRadius: 24,
      fontFamily: "Arial, sans-serif",
      fontWeight: 700,
      fontSize: 14,
      lineHeight: "20px",
      letterSpacing: "0.01em",
      color: "white",
      padding: "6px 18px",
      ...style,
    }}
  >
    <span style={{ position: "relative", zIndex: 2 }}>{children}</span>
  </button>
));
GlassButton.displayName = "GlassButton";

/* ───── Make pill button ───── */
const MakePill = ({ ctaText = "Make", onClick, showCredits }: { ctaText?: string; onClick?: () => void; showCredits?: boolean }) => (
  <button
    onClick={onClick}
    className="glass-btn-v2 ml-auto flex items-center justify-center focus-visible:outline-none"
    style={{
      borderRadius: 20.45,
      color: "white",
      padding: "8px 16px",
      gap: 6,
    }}
  >
    <span className="flex items-center gap-1" style={{ position: "relative", zIndex: 2 }}>
      <span className="font-bold" style={{ fontFamily: "Arial, sans-serif", fontSize: 10.9, lineHeight: "16px" }}>
        {ctaText}
      </span>
      <Sparkles size={10} style={{ color: "white" }} />
      {showCredits && (
        <span style={{ fontFamily: "Arial, sans-serif", fontSize: 10.9, lineHeight: "16px", fontWeight: 700 }}>
          18/s
        </span>
      )}
    </span>
  </button>
);

/* ───── Announcement Modal — Seedance 2.0 Campaign ───── */
const AnnouncementModal = ({ onClose, onTrySurprise, quotaExhausted: initialExhausted, flyOut, flyTarget }: { onClose: () => void; onTrySurprise: () => void; quotaExhausted?: boolean; flyOut?: boolean; flyTarget?: { x: number; y: number } | null }) => {
  const navigate = useNavigate();
  const [shaking, setShaking] = useState(false);
  const [localExhausted, setLocalExhausted] = useState(initialExhausted ?? false);
  const quotaExhausted = localExhausted;
  const modalRef = useRef<HTMLDivElement>(null);

  const benefits = [
    { text: "Use text, images, video, and audio together", tag: "UNLIMITED" },
    { text: "Edit, extend, or connect clips with AI", tag: "FREE" },
    { text: "Turn ideas into storyboards in seconds", tag: null },
    { text: "Subscribe to unlock Seedance 2.0 for videos up to 1 minute", tag: "PRO" },
  ];

  const handlePrimaryClick = () => {
    if (quotaExhausted) {
      navigate("/subscribe");
      onClose();
    } else {
      onTrySurprise();
    }
  };

  const getFlyOutTransform = () => {
    if (!flyTarget || !modalRef.current) return "scale(0.05) translate(-300px, 300px)";
    const modalRect = modalRef.current.getBoundingClientRect();
    const modalCenterX = modalRect.left + modalRect.width / 2;
    const modalCenterY = modalRect.top + modalRect.height / 2;
    const dx = flyTarget.x - modalCenterX;
    const dy = flyTarget.y - modalCenterY;
    return `translate(${dx}px, ${dy}px) scale(0.05)`;
  };

  const flyOutStyle: React.CSSProperties = flyOut
    ? {
        transform: getFlyOutTransform(),
        opacity: 0,
        transition: "transform 0.65s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.55s ease 0.15s",
        pointerEvents: "none",
      }
    : {
        transform: "scale(1) translate(0, 0)",
        opacity: 1,
        transition: "transform 0.35s ease, opacity 0.25s ease",
      };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: flyOut ? "rgba(0,0,0,0)" : "rgba(0, 0, 0, 0.6)", transition: "background 0.5s ease" }}
      onClick={(e) => { if (e.target === e.currentTarget && !flyOut) onClose(); }}
    >
      <div
        ref={modalRef}
        className="relative overflow-hidden"
        style={{
          width: 480,
          background: "#1a1a1a",
          borderRadius: 20,
          border: "1px solid rgba(255, 255, 255, 0.06)",
          boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
          ...flyOutStyle,
        }}
      >
        {/* Close button + Dev toggle */}
        <div className="absolute z-30 flex items-center" style={{ right: 12, top: 12, gap: 8 }}>
          <button
            onClick={() => setLocalExhausted(!localExhausted)}
            className="rounded-full px-2.5 py-1 text-[11px] font-bold transition-all hover:opacity-100"
            style={{
              background: localExhausted ? "rgba(255,100,100,0.2)" : "rgba(255,255,255,0.08)",
              color: localExhausted ? "#ff6b6b" : "rgba(255,255,255,0.4)",
              border: `1px solid ${localExhausted ? "rgba(255,100,100,0.3)" : "rgba(255,255,255,0.1)"}`,
              fontFamily: "Arial, sans-serif",
            }}
          >
            {localExhausted ? "Exhausted ✓" : "Simulate exhausted"}
          </button>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center transition-opacity hover:opacity-100"
            style={{ opacity: 0.6 }}
          >
            <X size={16} className="text-foreground" />
          </button>
        </div>

        {/* Hero image */}
        <div style={{ height: 220 }}>
          <img src={bannerBg} alt="Seedance 2.0" className="w-full h-full object-cover" />
        </div>

        {/* Content */}
        <div style={{ padding: "20px 24px 24px" }}>
          <h3
            className="font-bold text-foreground"
            style={{ fontFamily: "Arial, sans-serif", fontSize: 22, lineHeight: "28px" }}
          >
            Meet <span style={{ color: "#71F0F6" }}>Seedance 2.0</span> — The Most Powerful Video Model on MovieFlow
          </h3>

          <p style={{ marginTop: 6, fontFamily: "Arial, sans-serif", fontSize: 15, lineHeight: "22px", color: "rgba(255,255,255,0.7)" }}>
            {quotaExhausted
              ? "Today's free spots are gone. Come back tomorrow or subscribe for longer access."
              : "MovieFlow now supports Seedance 2.0, with 50,000 free daily spots for 8s clip creation."}
          </p>

          <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
            {benefits.map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Check size={16} style={{ color: "#71F0F6", flexShrink: 0 }} />
                  <span style={{ fontFamily: "Arial, sans-serif", fontSize: 16, lineHeight: "22px", color: "rgba(255,255,255,0.85)" }}>
                    {item.text}
                  </span>
                </div>
                {item.tag && (
                  <span style={{
                    fontFamily: "Arial, sans-serif", fontSize: 11, fontWeight: 700,
                    padding: "2px 8px", borderRadius: 4, flexShrink: 0, marginLeft: 8,
                    background: item.tag === "FREE" ? "rgba(113,240,246,0.15)" : "rgba(255,255,255,0.08)",
                    color: item.tag === "FREE" ? "#71F0F6" : "rgba(255,255,255,0.5)",
                  }}>
                    {item.tag}
                  </span>
                )}
              </div>
            ))}
          </div>

          <p style={{ marginTop: 14, fontFamily: "Arial, sans-serif", fontSize: 14, lineHeight: "20px", color: "rgba(255,255,255,0.4)" }}>
            Free access resets daily. First come, first served.
          </p>

          <div className="flex gap-3" style={{ marginTop: 20 }}>
            <button
              onClick={handlePrimaryClick}
              className="flex-1 flex items-center justify-center rounded-full font-bold transition-all duration-200 hover:brightness-110 active:scale-[0.97]"
              style={{
                height: 44,
                background: "linear-gradient(135deg, #71F0F6 0%, #45C4F6 50%, #3BB8E8 100%)",
                color: "#000",
                fontFamily: "Arial, sans-serif",
                fontSize: 16,
                border: "none",
                animation: shaking ? "shake 0.5s ease" : "none",
              }}
            >
              {quotaExhausted ? "Subscribe Now" : "Try Seedance 2.0"}
            </button>
            <button
              onClick={() => { onClose(); navigate("/subscribe"); }}
              className="flex-1 flex items-center justify-center rounded-full font-bold transition-all duration-200 hover:brightness-110 active:scale-[0.97]"
              style={{
                height: 44,
                background: "rgba(255, 255, 255, 0.08)",
                color: "rgba(255,255,255,0.8)",
                fontFamily: "Arial, sans-serif",
                fontSize: 16,
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              {quotaExhausted ? "Come Back Tomorrow" : "Subscribe Now"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
