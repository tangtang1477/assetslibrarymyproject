import { useState } from "react";
import { ChevronDown } from "lucide-react";

const AssetLibrary = () => {
  const [periodTab, setPeriodTab] = useState<"my" | "public">("public");

  return (
    <div className="flex flex-col gap-6">
      {/* Filters row */}
      <div className="flex items-center gap-4 flex-wrap">
        {/* Filter dropdowns */}
        <div className="flex items-center gap-4">
          <FilterDropdown label="Region" />
          <FilterDropdown label="Subject" />
          <FilterDropdown label="Style" />
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* My / Public toggle */}
        <div
          className="flex items-center rounded-full border border-foreground/20 overflow-hidden"
          style={{ padding: "4px 4px 4px 36px", gap: 32, background: "hsl(var(--background))" }}
        >
          <button
            onClick={() => setPeriodTab("my")}
            className={`text-base leading-6 transition-colors ${
              periodTab === "my" ? "text-foreground" : "text-foreground/70"
            }`}
            style={{ fontFamily: "'SF Pro', Arial, sans-serif" }}
          >
            My
          </button>
          <button
            onClick={() => setPeriodTab("public")}
            className={`flex items-center justify-center px-8 py-2 rounded-full text-base leading-6 transition-all ${
              periodTab === "public"
                ? "bg-primary text-primary-foreground"
                : "text-foreground/70 hover:text-foreground"
            }`}
            style={{ fontFamily: "'SF Pro', Arial, sans-serif" }}
          >
            Public
          </button>
        </div>
      </div>

      {/* Asset image placeholder */}
      <div className="w-full rounded-lg overflow-hidden bg-card-surface" style={{ aspectRatio: "1795/871", minHeight: 400 }}>
        <div className="w-full h-full flex items-center justify-center text-text-dim text-lg">
          Asset content will appear here
        </div>
      </div>
    </div>
  );
};

const FilterDropdown = ({ label }: { label: string }) => (
  <button className="flex items-center gap-2 px-8 py-4 rounded-2xl border-[1.5px] border-foreground/20 transition-colors hover:border-foreground/40 active:border-foreground/60">
    <span
      className="text-[28px] leading-7 text-foreground/70"
      style={{ fontFamily: "'SF Pro', Arial, sans-serif" }}
    >
      {label}
    </span>
    <ChevronDown size={24} className="text-foreground/50" />
  </button>
);

export default AssetLibrary;
