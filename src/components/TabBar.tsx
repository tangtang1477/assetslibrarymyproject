import { useState } from "react";

interface TabBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TabBar = ({ activeTab, onTabChange }: TabBarProps) => {
  // Sub-buttons for My Project tab
  const [activeProjectButton, setActiveProjectButton] = useState<"aidea" | "toolkit">("aidea");
  // Sub-buttons for Asset Library tab
  const [activeAssetButton, setActiveAssetButton] = useState<"characters" | "scenes" | "props">("characters");

  return (
    <div className="w-full">
      {/* Tab headers */}
      <div className="flex gap-4 pb-4">
        <button
          onClick={() => onTabChange("my-project")}
          className={`text-[32px] font-bold leading-10 transition-colors ${
            activeTab === "my-project" ? "text-foreground" : "text-text-dim"
          }`}
        >
          My project
        </button>
        <button
          onClick={() => onTabChange("asset-library")}
          className={`text-[32px] font-bold leading-10 transition-colors ${
            activeTab === "asset-library" ? "text-foreground" : "text-text-dim"
          }`}
        >
          Asset Library
        </button>
      </div>

      {/* Divider */}
      <div className="relative">
        <div className="w-full h-[2px] bg-foreground/10" />
        <div
          className={`absolute top-0 h-[2px] bg-primary transition-all duration-300 ${
            activeTab === "my-project"
              ? "left-0 w-[161px]"
              : "left-[199px] w-[205px]"
          }`}
        />
      </div>

      {/* Action buttons — different per tab */}
      <div className="flex gap-4 mt-6">
        {activeTab === "my-project" ? (
          <>
            <GlowButton
              label="AIdeo"
              isActive={activeProjectButton === "aidea"}
              onClick={() => setActiveProjectButton("aidea")}
              glowWidth={112}
            />
            <PlainButton
              label="Toolkit"
              isActive={activeProjectButton === "toolkit"}
              onClick={() => setActiveProjectButton("toolkit")}
            />
          </>
        ) : (
          <>
            <GlowButton
              label="Characters"
              isActive={activeAssetButton === "characters"}
              onClick={() => setActiveAssetButton("characters")}
              glowWidth={168}
            />
            <PlainButton
              label="Scenes"
              isActive={activeAssetButton === "scenes"}
              onClick={() => setActiveAssetButton("scenes")}
            />
            <PlainButton
              label="Props"
              isActive={activeAssetButton === "props"}
              onClick={() => setActiveAssetButton("props")}
            />
          </>
        )}
      </div>
    </div>
  );
};

/** Primary glowing button (active state uses primary color, inactive uses card-surface) */
const GlowButton = ({
  label,
  isActive,
  onClick,
  glowWidth,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
  glowWidth: number;
}) => (
  <button
    onClick={onClick}
    className={`relative flex items-center justify-center px-8 py-4 rounded-2xl overflow-hidden transition-all duration-200
      ${isActive
        ? "bg-primary hover:brightness-110 active:brightness-90"
        : "bg-card-surface hover:bg-card-surface-hover active:brightness-75"
      }`}
  >
    {isActive && (
      <div
        className="absolute inset-0 m-auto bg-primary rounded-full pointer-events-none"
        style={{
          width: glowWidth,
          height: 40,
          filter: "blur(22.4px)",
        }}
      />
    )}
    <span
      className={`relative text-[28px] leading-7 z-10 transition-colors ${
        isActive ? "text-primary-foreground" : "text-foreground/70"
      }`}
      style={{ fontFamily: "'SF Pro', Arial, sans-serif" }}
    >
      {label}
    </span>
  </button>
);

/** Secondary plain button (active state uses primary, inactive uses card-surface) */
const PlainButton = ({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`relative flex items-center justify-center px-8 py-4 rounded-2xl overflow-hidden transition-all duration-200
      ${isActive
        ? "bg-primary hover:brightness-110 active:brightness-90"
        : "bg-card-surface hover:bg-card-surface-hover active:brightness-75"
      }`}
  >
    {isActive && (
      <div
        className="absolute inset-0 m-auto bg-primary rounded-full pointer-events-none"
        style={{
          width: 112,
          height: 40,
          filter: "blur(22.4px)",
        }}
      />
    )}
    <span
      className={`relative text-[28px] leading-7 z-10 transition-colors ${
        isActive ? "text-primary-foreground" : "text-foreground/70"
      }`}
      style={{ fontFamily: "'SF Pro', Arial, sans-serif" }}
    >
      {label}
    </span>
  </button>
);

export default TabBar;
