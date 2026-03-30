import { useRef, useEffect, useState } from "react";

interface TabBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  activeProjectButton: "aidea" | "toolkit";
  onProjectButtonChange: (v: "aidea" | "toolkit") => void;
  activeAssetButton: "all" | "characters" | "other";
  onAssetButtonChange: (v: "all" | "characters" | "other") => void;
}

const TabBar = ({
  activeTab,
  onTabChange,
  activeProjectButton,
  onProjectButtonChange,
  activeAssetButton,
  onAssetButtonChange,
}: TabBarProps) => {
  const myProjectRef = useRef<HTMLButtonElement>(null);
  const assetLibraryRef = useRef<HTMLButtonElement>(null);
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const ref = activeTab === "my-project" ? myProjectRef : assetLibraryRef;
    if (ref.current) {
      setUnderlineStyle({
        left: ref.current.offsetLeft,
        width: ref.current.offsetWidth,
      });
    }
  }, [activeTab]);

  return (
    <div className="w-full">
      {/* Tab headers */}
      <div className="flex gap-4 pb-4">
        <button
          ref={myProjectRef}
          onClick={() => onTabChange("my-project")}
          className={`text-[20px] font-bold leading-7 transition-colors ${
            activeTab === "my-project" ? "text-foreground" : "text-text-dim"
          }`}
        >
          My Project
        </button>
        <button
          ref={assetLibraryRef}
          onClick={() => onTabChange("asset-library")}
          className={`text-[20px] font-bold leading-7 transition-colors ${
            activeTab === "asset-library" ? "text-foreground" : "text-text-dim"
          }`}
        >
          Asset Library
        </button>
      </div>

      {/* Divider with underline */}
      <div className="relative">
        <div className="w-full h-[2px] bg-foreground/10" />
        <div
          className="absolute top-0 h-[2px] bg-primary transition-all duration-300"
          style={{ left: underlineStyle.left, width: underlineStyle.width }}
        />
      </div>

      {/* Action buttons */}
      <div className="flex gap-4 mt-6">
        {activeTab === "my-project" ? (
          <>
            <TabButton
              label="AIdeo"
              isActive={activeProjectButton === "aidea"}
              onClick={() => onProjectButtonChange("aidea")}
              glow
            />
            <TabButton
              label="Toolkit"
              isActive={activeProjectButton === "toolkit"}
              onClick={() => onProjectButtonChange("toolkit")}
            />
          </>
        ) : (
          <>
            <TabButton
              label="All"
              isActive={activeAssetButton === "all"}
              onClick={() => onAssetButtonChange("all")}
              glow
            />
            <TabButton
              label="Characters"
              isActive={activeAssetButton === "characters"}
              onClick={() => onAssetButtonChange("characters")}
              glow
            />
            <TabButton
              label="Other Assets"
              isActive={activeAssetButton === "other"}
              onClick={() => onAssetButtonChange("other")}
            />
          </>
        )}
      </div>
    </div>
  );
};

const TabButton = ({
  label,
  isActive,
  onClick,
  glow,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
  glow?: boolean;
}) => (
  <button
    onClick={onClick}
    className={`relative flex items-center justify-center px-4 py-2 rounded-2xl overflow-hidden transition-all duration-200
      ${isActive
        ? "bg-primary hover:brightness-110 active:brightness-90"
        : "bg-card-surface hover:bg-card-surface-hover active:brightness-75"
      }`}
  >
    {isActive && glow && (
      <div
        className="absolute inset-0 m-auto bg-primary rounded-full pointer-events-none"
        style={{ width: 80, height: 30, filter: "blur(22.4px)" }}
      />
    )}
    <span
      className={`relative text-[16px] leading-4 z-10 transition-colors ${
        isActive ? "text-primary-foreground" : "text-foreground/70"
      }`}
      style={{ fontFamily: "'SF Pro', Arial, sans-serif" }}
    >
      {label}
    </span>
  </button>
);

export default TabBar;
