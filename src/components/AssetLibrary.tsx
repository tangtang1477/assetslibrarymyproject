import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import assetChar1 from "@/assets/asset-char-1.jpg";
import assetChar2 from "@/assets/asset-char-2.jpg";
import assetChar3 from "@/assets/asset-char-3.jpg";
import assetChar4 from "@/assets/asset-char-4.jpg";
import assetChar5 from "@/assets/asset-char-5.jpg";
import assetChar6 from "@/assets/asset-char-6.jpg";
import assetChar7 from "@/assets/asset-char-7.jpg";
import assetChar8 from "@/assets/asset-char-8.jpg";
import assetChar9 from "@/assets/asset-char-9.jpg";
import assetChar10 from "@/assets/asset-char-10.jpg";

const TYPE_OPTIONS = ["All", "Characters", "Other Assets"];

const REGION_OPTIONS = [
  "All", "Western & Oceania", "Latin America & Caribbean",
  "East & Southeast Asian", "Middle East & North Africa",
  "South Asian Subcontinent", "African",
];

const SUBJECT_OPTIONS = [
  "All", "Animals", "Monsters", "Imaginary Human", "Anthropomorphic Creatures",
];

const STYLE_OPTIONS = ["All", "2D Human Characters", "3D Human Characters"];

interface AssetItem {
  id: number;
  src: string;
  title: string;
  tags: string[];
}

const ASSETS: AssetItem[] = [
  { id: 1, src: assetChar1, title: "Young Woman in Traditional…", tags: ["woman", "Chinese garden", "bomber jacket"] },
  { id: 2, src: assetChar2, title: "Happy Stitch on a Tropical…", tags: ["Stitch", "alien character", "beach sunset"] },
  { id: 3, src: assetChar3, title: "Anime Warrior Powering Up…", tags: ["anime", "warrior", "energy blast"] },
  { id: 4, src: assetChar4, title: "Stylish Asian Man in City", tags: ["Asian man", "urban style", "casual smart"] },
  { id: 5, src: assetChar5, title: "Smiling Young Man in Navy…", tags: ["young man", "male", "smiling"] },
  { id: 6, src: assetChar6, title: "Close-Up Portrait of Young…", tags: ["portrait", "male", "studio"] },
  { id: 7, src: assetChar7, title: "Elegant Woman Portrait", tags: ["woman", "elegant", "beauty"] },
  { id: 8, src: assetChar8, title: "Dark Fantasy Dragon Monster", tags: ["dragon", "monster", "fantasy"] },
  { id: 9, src: assetChar9, title: "Treasure Chests in Dungeon", tags: ["treasure", "3D", "game asset"] },
  { id: 10, src: assetChar10, title: "Mystical Water Dragon Spirit", tags: ["dragon", "water", "mystical"] },
];

/** Exported filter bar to be rendered inside TabBar's slot */
export const AssetFilters = () => {
  // We need to lift state — but since AssetLibrary also needs these, 
  // we'll keep them here with a shared approach via context or props.
  // For simplicity, AssetFilters is self-contained and AssetLibrary reads from it.
  return null; // Handled via AssetLibraryWithFilters
};

const AssetLibrary = () => {
  const [periodTab, setPeriodTab] = useState<"my" | "public">("public");
  const [assetType, setAssetType] = useState("All");
  const [region, setRegion] = useState("All");
  const [subject, setSubject] = useState("All");
  const [style, setStyle] = useState("All");
  const [selectedAssetId, setSelectedAssetId] = useState<number | null>(null);

  const showFilters = assetType === "Characters";

  return (
    <AssetLibraryContext.Provider value={{ periodTab, setPeriodTab, assetType, setAssetType, region, setRegion, subject, setSubject, style, setStyle, showFilters }}>
      <div className="flex flex-col gap-8">
        {/* Asset grid */}
        <div className="grid grid-cols-5 gap-4">
          {ASSETS.map((asset) => (
            <AssetCard
              key={asset.id}
              asset={asset}
              isSelected={selectedAssetId === asset.id}
              onClick={() => setSelectedAssetId(selectedAssetId === asset.id ? null : asset.id)}
            />
          ))}
        </div>
      </div>
    </AssetLibraryContext.Provider>
  );
};

// Context to share filter state between AssetFilterBar (in TabBar) and AssetLibrary grid
import { createContext, useContext } from "react";

interface AssetLibraryContextType {
  periodTab: "my" | "public";
  setPeriodTab: (v: "my" | "public") => void;
  assetType: string;
  setAssetType: (v: string) => void;
  region: string;
  setRegion: (v: string) => void;
  subject: string;
  setSubject: (v: string) => void;
  style: string;
  setStyle: (v: string) => void;
  showFilters: boolean;
}

const AssetLibraryContext = createContext<AssetLibraryContextType | null>(null);

export const useAssetLibrary = () => useContext(AssetLibraryContext);

/** Filter bar rendered inside TabBar slot */
export const AssetFilterBar = ({
  periodTab, setPeriodTab, assetType, setAssetType,
  region, setRegion, subject, setSubject, style, setStyle, showFilters,
}: AssetLibraryContextType) => (
  <div className="flex items-center gap-4 flex-wrap">
    <FilterDropdown label="Type" options={TYPE_OPTIONS} value={assetType} onChange={setAssetType} />
    {showFilters && (
      <>
        <FilterDropdown label="Region" options={REGION_OPTIONS} value={region} onChange={setRegion} />
        <FilterDropdown label="Subject" options={SUBJECT_OPTIONS} value={subject} onChange={setSubject} />
        <FilterDropdown label="Style" options={STYLE_OPTIONS} value={style} onChange={setStyle} />
      </>
    )}
    <div className="flex-1" />
    <div
      className="relative flex items-center rounded-full border border-foreground/20"
      style={{ padding: "4px", gap: 0, background: "hsl(var(--background))" }}
    >
      <div
        className="absolute h-10 rounded-full bg-primary transition-all duration-300 ease-in-out"
        style={{
          width: "calc(50% - 4px)",
          left: periodTab === "my" ? 4 : "calc(50% + 4px)",
          top: 4,
        }}
      />
      <button
        onClick={() => setPeriodTab("my")}
        className={`relative z-10 flex items-center justify-center px-8 py-2 rounded-full text-[16px] leading-6 transition-colors ${
          periodTab === "my" ? "text-primary-foreground" : "text-foreground/70 hover:text-foreground/90"
        }`}
        style={{ fontFamily: "'SF Pro', Arial, sans-serif" }}
      >
        My
      </button>
      <button
        onClick={() => setPeriodTab("public")}
        className={`relative z-10 flex items-center justify-center px-8 py-2 rounded-full text-[16px] leading-6 transition-colors ${
          periodTab === "public" ? "text-primary-foreground" : "text-foreground/70 hover:text-foreground/90"
        }`}
        style={{ fontFamily: "'SF Pro', Arial, sans-serif" }}
      >
        Public
      </button>
    </div>
  </div>
);

const AssetCard = ({
  asset, isSelected, onClick,
}: { asset: AssetItem; isSelected: boolean; onClick: () => void }) => {
  const visibleTags = asset.tags.slice(0, 2);
  const extraCount = asset.tags.length - 2;

  return (
    <div
      onClick={onClick}
      className={`group rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 hover:ring-2 hover:ring-primary/40 ${
        isSelected ? "ring-2 ring-primary" : ""
      }`}
      style={{ background: "#141414" }}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={asset.src} alt={asset.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
        {isSelected && (
          <div className="absolute inset-0 bg-background/30 flex items-center justify-center">
            <span className="px-4 py-1.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium">Select</span>
          </div>
        )}
      </div>
      <div className="p-3 flex flex-col gap-2">
        <p className="text-sm text-foreground truncate">{asset.title}</p>
        <div className="flex flex-wrap gap-1.5">
          {visibleTags.map((tag) => (
            <span key={tag} className="px-2 py-0.5 rounded-md bg-foreground/10 text-foreground/60 text-xs">{tag}</span>
          ))}
          {extraCount > 0 && (
            <span className="px-2 py-0.5 rounded-md bg-foreground/10 text-foreground/60 text-xs">+{extraCount}</span>
          )}
        </div>
      </div>
    </div>
  );
};

const FilterDropdown = ({
  label, options, value, onChange,
}: { label: string; options: string[]; value: string; onChange: (v: string) => void }) => {
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
        className={`flex items-center gap-2 px-4 py-2 rounded-lg border-[1.5px] transition-colors
          hover:border-foreground/40 active:border-foreground/60
          ${value !== "All" ? "border-primary text-foreground" : "border-foreground/20"}`}
      >
        <span className="text-[16px] leading-4 text-foreground/70" style={{ fontFamily: "'SF Pro', Arial, sans-serif" }}>
          {value === "All" ? label : value}
        </span>
        <ChevronDown size={20} className={`text-foreground/50 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-2 min-w-[220px] rounded-xl bg-popover border border-foreground/10 shadow-lg z-50 py-1" style={{ scrollbarWidth: "none" }}>
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => { onChange(opt); setOpen(false); }}
              className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-foreground/10 ${
                value === opt ? "text-primary font-medium" : "text-foreground/70"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AssetLibrary;
