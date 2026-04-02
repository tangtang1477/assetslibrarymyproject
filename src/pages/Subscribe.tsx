import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import Sidebar from "@/components/Sidebar";

const CREDIT_OPTIONS = [
  { label: "+100 ($1)", value: 100 },
  { label: "+500 ($5)", value: 500 },
  { label: "+1000 ($10)", value: 1000 },
];

const TIERS = [
  {
    name: "Starter",
    bg: "#1C2020",
    monthly: "$9.99",
    annual: "$7.99",
    features: ["100 credits/mo", "No watermark", "Standard queue", "720p export"],
  },
  {
    name: "Creator",
    bg: "#252E2F",
    monthly: "$19.99",
    annual: "$15.99",
    features: ["500 credits/mo", "No watermark", "Priority queue", "1080p export"],
  },
  {
    name: "Pro",
    bg: "#000000",
    accent: "#71F0F6",
    monthly: "$39.99",
    annual: "$29.99",
    features: ["2000 credits/mo", "No watermark", "Priority queue", "4K export"],
  },
  {
    name: "Enterprise",
    bg: "#000000",
    accent: "#BA71F6",
    monthly: "$99.99",
    annual: "$79.99",
    features: ["Unlimited credits", "No watermark", "Dedicated queue", "4K+ export"],
  },
];

const Subscribe = () => {
  const navigate = useNavigate();
  const [period, setPeriod] = useState<"monthly" | "annual">("annual");
  const [selectedCredit, setSelectedCredit] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [selectedTier, setSelectedTier] = useState<number | null>(null);
  const [hoveredTier, setHoveredTier] = useState<number | null>(null);

  return (
    <div className="h-screen bg-background flex overflow-hidden">
      <Sidebar activePage="subscribe" />

      <div className="flex-1 ml-[88px] flex items-start justify-center overflow-hidden">
        <div
          className="relative hide-scrollbar"
          style={{
            width: 1622,
            height: 914,
            overflowY: "scroll",
            marginTop: 17,
          }}
        >
          {/* Close button */}
          <button
            onClick={() => navigate(-1)}
            className="fixed z-50 flex h-10 w-10 items-center justify-center rounded-full transition-all hover:bg-[rgba(255,255,255,0.1)] active:scale-90"
            style={{ right: 32, top: 24 }}
          >
            <X size={20} className="text-foreground" />
          </button>

          {/* Banner */}
          <div
            className="relative"
            style={{
              width: 1491,
              height: 176,
              margin: "15px auto 0",
              padding: "32px 64px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 16,
              background: "rgba(113, 240, 246, 0.05)",
              boxShadow: "inset 0px 0px 80px 15px rgba(113, 240, 246, 0.2)",
              borderRadius: 32,
            }}
          >
            <span
              style={{
                fontFamily: "Arial, sans-serif",
                fontWeight: 700,
                fontSize: 24,
                lineHeight: "32px",
                color: "#71F0F6",
              }}
            >
              The Road to 1 Million: Celebration Sale!
            </span>
            <span
              style={{
                fontFamily: "Arial, sans-serif",
                fontWeight: 700,
                fontSize: 16,
                lineHeight: "24px",
                color: "#FFFFFF",
              }}
            >
              We're approaching 1,000,000 creators. Lock in our biggest annual savings before we hit the milestone.
            </span>
            <span
              style={{
                fontFamily: "Arial, sans-serif",
                fontWeight: 700,
                fontSize: 16,
                lineHeight: "24px",
                color: "#FFFFFF",
              }}
            >
              ⏳ Limited Time Offer. Deal ends when we reach 1M users.
            </span>
          </div>

          {/* Credit Purchase */}
          <div
            className="relative"
            style={{
              width: 1491,
              height: 158,
              margin: "32px auto 0",
              background: "rgba(113, 240, 246, 0.05)",
              borderRadius: 32,
            }}
          >
            <span
              style={{
                position: "absolute",
                left: 64,
                top: 16,
                fontFamily: "Arial, sans-serif",
                fontWeight: 700,
                fontSize: 20,
                lineHeight: "28px",
                color: "#FFFFFF",
              }}
            >
              Need more credits?
            </span>
            <span
              style={{
                position: "absolute",
                left: 64,
                top: 60,
                fontFamily: "Arial, sans-serif",
                fontWeight: 700,
                fontSize: 16,
                lineHeight: "24px",
                color: "rgba(255, 255, 255, 0.6)",
              }}
            >
              Top up instantly — no subscription required. Credits never expire and work across all tools.
            </span>
            <span
              style={{
                position: "absolute",
                left: 64,
                top: 100,
                fontFamily: "'SF Pro', Arial, sans-serif",
                fontWeight: 700,
                fontSize: 14,
                lineHeight: "22px",
                color: "#FFFFFF",
              }}
            >
              $0.01 per credit｜Instant delivery｜Never expires
            </span>

            {/* Credit amount buttons + Custom + Buy — aligned in one column */}
            <div
              className="absolute flex flex-col"
              style={{
                right: 64,
                top: 32,
                gap: 16,
              }}
            >
              <div className="flex items-center" style={{ gap: 16 }}>
                {CREDIT_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setSelectedCredit(selectedCredit === opt.value ? null : opt.value)}
                    className="flex items-center justify-center transition-all duration-150 hover:brightness-125 active:scale-95"
                    style={{
                      height: 38,
                      padding: "8px 16px",
                      background: selectedCredit === opt.value ? "rgba(113, 240, 246, 0.15)" : "rgba(255, 255, 255, 0.05)",
                      border: selectedCredit === opt.value ? "1px solid rgba(113, 240, 246, 0.4)" : "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: 8,
                      fontFamily: "'DIN Alternate', Arial, sans-serif",
                      fontWeight: 700,
                      fontSize: 14,
                      lineHeight: "22px",
                      color: selectedCredit === opt.value ? "#71F0F6" : "#FFFFFF",
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              <div className="flex items-center" style={{ gap: 16 }}>
                <div className="relative" style={{ width: 197, height: 38 }}>
                  <input
                    type="text"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="w-full h-full bg-transparent outline-none"
                    style={{
                      background: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: 8,
                      padding: "0 16px",
                      fontFamily: "'SF Pro', Arial, sans-serif",
                      fontWeight: 400,
                      fontSize: 14,
                      lineHeight: "22px",
                      color: "#FFFFFF",
                    }}
                    placeholder="Custom Amount"
                  />
                </div>
                <button
                  className="flex items-center justify-center transition-all duration-150 hover:brightness-110 active:scale-95"
                  style={{
                    width: 89,
                    height: 38,
                    padding: "8px 32px",
                    background: "#71F0F6",
                    border: "1px solid rgba(113, 240, 246, 0.2)",
                    borderRadius: 8,
                    fontFamily: "'SF Pro', Arial, sans-serif",
                    fontWeight: 400,
                    fontSize: 14,
                    lineHeight: "22px",
                    color: "#000000",
                    textShadow: "0px 0px 2.5px rgba(0, 0, 0, 0.15)",
                  }}
                >
                  Buy
                </button>
              </div>
            </div>
          </div>

          {/* Period toggle */}
          <div className="flex justify-center" style={{ marginTop: 48 }}>
            <div
              className="flex items-center"
              style={{
                padding: "4px 4px 4px 20px",
                gap: 16,
                background: "#000000",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: 100,
                height: 46,
              }}
            >
              <button
                onClick={() => setPeriod("monthly")}
                className="transition-all"
                style={{
                  fontFamily: "'SF Pro', Arial, sans-serif",
                  fontWeight: 400,
                  fontSize: 14,
                  lineHeight: "22px",
                  color: period === "monthly" ? "#000" : "#FFFFFF",
                  background: period === "monthly" ? "#FFFFFF" : "transparent",
                  borderRadius: 100,
                  padding: period === "monthly" ? "8px 16px" : "0",
                  height: period === "monthly" ? 38 : "auto",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Monthly
              </button>
              <button
                onClick={() => setPeriod("annual")}
                className="transition-all"
                style={{
                  fontFamily: "'SF Pro', Arial, sans-serif",
                  fontWeight: 400,
                  fontSize: 14,
                  lineHeight: "22px",
                  color: period === "annual" ? "#000" : "#FFFFFF",
                  background: period === "annual" ? "#FFFFFF" : "transparent",
                  borderRadius: 100,
                  padding: "8px 16px",
                  height: 38,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Annual
              </button>
            </div>
          </div>

          {/* Subtitle */}
          <div className="text-center" style={{ marginTop: 16 }}>
            <span
              style={{
                fontFamily: "'SF Pro', Arial, sans-serif",
                fontWeight: 700,
                fontSize: 20,
                lineHeight: "28px",
                color: "#FFFFFF",
              }}
            >
              Tailored for all. Perfect for you.
            </span>
          </div>

          {/* Premium perks */}
          <div className="text-center" style={{ marginTop: 12 }}>
            <span
              style={{
                fontFamily: "'SF Pro', Arial, sans-serif",
                fontWeight: 400,
                fontSize: 16,
                lineHeight: "24px",
                color: "rgba(255, 255, 255, 0.6)",
              }}
            >
              Premium Perks: No Watermark, Priority Queue, HD Download & More
            </span>
          </div>

          {/* Tier cards container */}
          <div
            className="relative"
            style={{
              width: 1473.05,
              height: 626,
              margin: "32px auto 64px",
              background: "#252828",
              borderRadius: 17.68,
            }}
          >
            {/* Decorative accent bars behind cards 3 & 4 */}
            <div
              className="absolute"
              style={{
                width: 292.66,
                height: 532.28,
                left: 656.06,
                top: -27.41,
                background: "#71F0F6",
                borderRadius: 13.26,
                zIndex: 0,
              }}
            />
            <div
              className="absolute"
              style={{
                width: 292.66,
                height: 532.28,
                left: 987.63,
                top: -27.41,
                background: "#BA71F6",
                borderRadius: 13.26,
                zIndex: 0,
              }}
            />

            {/* Cards row */}
            <div
              className="absolute"
              style={{
                width: 1273.22,
                height: 498.68,
                left: "50%",
                top: 73.39,
                transform: "translateX(-50%)",
              }}
            >
              {TIERS.map((tier, i) => {
                const isSelected = selectedTier === i;
                const isHovered = hoveredTier === i;
                const left = i * 331.57;

                return (
                  <div
                    key={tier.name}
                    className="absolute transition-all duration-200"
                    style={{
                      width: 278.52,
                      height: 498.68,
                      left,
                      top: 0,
                      background: tier.bg,
                      borderRadius: 13.26,
                      zIndex: 1,
                      cursor: "pointer",
                      border: isSelected ? "2px solid #71F0F6" : "2px solid transparent",
                      transform: isHovered ? "translateY(-4px)" : "none",
                      boxShadow: isHovered ? "0 8px 24px rgba(0,0,0,0.4)" : "none",
                    }}
                    onClick={() => setSelectedTier(selectedTier === i ? null : i)}
                    onMouseEnter={() => setHoveredTier(i)}
                    onMouseLeave={() => setHoveredTier(null)}
                  >
                    {/* Tier name */}
                    <div style={{ padding: "24px 25.64px 0" }}>
                      <span
                        style={{
                          fontFamily: "Arial, sans-serif",
                          fontWeight: 700,
                          fontSize: 20,
                          lineHeight: "28px",
                          color: "#FFFFFF",
                        }}
                      >
                        {tier.name}
                      </span>
                    </div>

                    {/* Price */}
                    <div style={{ padding: "8px 25.64px 0" }}>
                      <span
                        style={{
                          fontFamily: "'DIN Alternate', Arial, sans-serif",
                          fontWeight: 700,
                          fontSize: 36,
                          lineHeight: "44px",
                          color: "#FFFFFF",
                        }}
                      >
                        {period === "annual" ? tier.annual : tier.monthly}
                      </span>
                      <span
                        style={{
                          fontFamily: "Arial, sans-serif",
                          fontSize: 14,
                          color: "rgba(255,255,255,0.5)",
                          marginLeft: 4,
                        }}
                      >
                        /mo
                      </span>
                    </div>

                    {/* Subscribe button with glow */}
                    <div
                      className="relative transition-all duration-150"
                      style={{
                        width: 227.23,
                        height: 44.21,
                        margin: "24px auto 0",
                      }}
                    >
                      {/* Glow behind */}
                      <div
                        className="absolute"
                        style={{
                          inset: 0,
                          background: "rgba(69, 196, 246, 0.6)",
                          filter: "blur(13.04px)",
                          borderRadius: 31.37,
                        }}
                      />
                      <button
                        className="relative w-full h-full flex items-center justify-center transition-all duration-150 hover:brightness-125 active:scale-95"
                        style={{
                          background: "rgba(69, 196, 246, 0.05)",
                          borderRadius: 31.37,
                          fontFamily: "Arial, sans-serif",
                          fontWeight: 700,
                          fontSize: 16.73,
                          lineHeight: "25px",
                          color: "#71F0F6",
                          border: "none",
                        }}
                      >
                        Subscribe now
                      </button>
                    </div>

                    {/* Features */}
                    <div style={{ padding: "32px 25.64px 0", display: "flex", flexDirection: "column", gap: 12 }}>
                      {tier.features.map((feat, fi) => (
                        <div
                          key={fi}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                          }}
                        >
                          <div
                            style={{
                              width: 80.46,
                              height: 17.68,
                              background: "#71F0F6",
                              borderRadius: 4.42,
                              flexShrink: 0,
                            }}
                          />
                          <span
                            style={{
                              fontFamily: "Arial, sans-serif",
                              fontSize: 13,
                              color: "rgba(255,255,255,0.7)",
                            }}
                          >
                            {feat}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
