interface TabBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TabBar = ({ activeTab, onTabChange }: TabBarProps) => {
  return (
    <div className="w-full">
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

      {/* Action buttons */}
      <div className="flex gap-4 mt-6">
        <button className="relative flex items-center justify-center px-8 py-4 bg-primary rounded-2xl overflow-hidden">
          <div
            className="absolute inset-0 m-auto bg-primary rounded-full"
            style={{
              width: 112,
              height: 40,
              filter: "blur(22.4px)",
            }}
          />
          <span className="relative text-primary-foreground text-[28px] leading-7 z-10" style={{ fontFamily: "'SF Pro', Arial, sans-serif" }}>
            AIdeo
          </span>
        </button>

        <button className="flex items-center px-8 py-4 bg-card-surface rounded-2xl gap-2.5">
          <span className="text-foreground/70 text-[28px] leading-7" style={{ fontFamily: "'SF Pro', Arial, sans-serif" }}>
            Toolkit
          </span>
        </button>
      </div>
    </div>
  );
};

export default TabBar;
