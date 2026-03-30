import { useRef, useEffect, useState, ReactNode } from "react";

interface TabBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  activeProjectButton: "aidea" | "toolkit";
  onProjectButtonChange: (v: "aidea" | "toolkit") => void;
  activeAssetButton: string;
  onAssetButtonChange: (v: string) => void;
  children?: ReactNode;
}

const TabBar = ({
  activeTab,
  onTabChange,
  activeProjectButton,
  onProjectButtonChange,
  children,
}: TabBarProps) => {
  const myProjectRef = useRef<HTMLButtonElement>(null);
  const assetLibraryRef = useRef<HTMLButtonElement>(null);
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const updateUnderline = () => {
      const ref = activeTab === "my-project" ? myProjectRef : assetLibraryRef;
      if (ref.current) {
        const parentLeft = ref.current.parentElement?.getBoundingClientRect().left || 0;
        const rect = ref.current.getBoundingClientRect();
        setUnderlineStyle({
          left: rect.left - parentLeft,
          width: rect.width,
        });
      }
    };
    updateUnderline();
    window.addEventListener("resize", updateUnderline);
    return () => window.removeEventListener("resize", updateUnderline);
  }, [activeTab]);

  return (
    <div className="w-full">
      {/* Tab headers */}
      <div className="flex gap-4 pb-4">
        <button
          ref={myProjectRef}
          onClick={() => onTabChange("my-project")}
          className={`text-[20px] font-bold leading-7 transition-colors ${
            activeTab === "my-project" ? "text-foreground" : "text-foreground/50"
          }`}
        >
          My Project
        </button>
        <button
          ref={assetLibraryRef}
          onClick={() => onTabChange("asset-library")}
          className={`text-[20px] font-bold leading-7 transition-colors ${
            activeTab === "asset-library" ? "text-foreground" : "text-foreground/50"
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

      {/* Action buttons — 32px below underline */}
      <div className="mt-8">
        {activeTab === "my-project" ? (
          <div className="flex gap-4">
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
          </div>
        ) : (
          children
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
    className={`relative flex items-center justify-center px-4 py-2 rounded-lg overflow-hidden transition-all duration-200
      ${isActive
        ? "bg-primary hover:brightness-110 active:brightness-90"
        : "bg-foreground/10 hover:bg-foreground/15 active:brightness-75"
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
