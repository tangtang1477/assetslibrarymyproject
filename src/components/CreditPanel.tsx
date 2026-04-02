import { Sparkles } from "lucide-react";
import iconCredit from "@/assets/icon-credit.svg";

const MOCK_HISTORY = [
  { id: 1, name: "Seedance 2.0 Fast", date: "Mar 31, 2026", amount: -75, tag: null },
  { id: 2, name: "Daily Free Credits", date: "Mar 31, 2026", amount: 68, tag: "Daily" },
  { id: 3, name: "Seedance 2.0 Standard", date: "Mar 30, 2026", amount: -120, tag: null },
  { id: 4, name: "Referral Bonus", date: "Mar 29, 2026", amount: 200, tag: "Bonus" },
  { id: 5, name: "Kling 2.0 Pro", date: "Mar 29, 2026", amount: -50, tag: null },
  { id: 6, name: "Daily Free Credits", date: "Mar 29, 2026", amount: 68, tag: "Daily" },
];

interface CreditPanelProps {
  credits: number;
  onBuyCredits: () => void;
  onClose: () => void;
}

const CreditPanel = ({ credits, onBuyCredits, onClose }: CreditPanelProps) => (
  <div
    className="absolute top-full right-0 mt-2"
    style={{
      width: 380,
      background: "rgba(28, 30, 34, 0.98)",
      borderRadius: 16,
      border: "1px solid rgba(255,255,255,0.08)",
      boxShadow: "0 12px 48px rgba(0,0,0,0.5)",
      zIndex: 200,
      animation: "assetPanelIn 0.2s ease-out",
    }}
    onClick={(e) => e.stopPropagation()}
  >
    {/* Header */}
    <div className="flex items-center justify-between" style={{ padding: "16px 20px 12px" }}>
      <div>
        <span style={{ fontFamily: "Arial, sans-serif", fontSize: 13, color: "rgba(255,255,255,0.5)" }}>
          Available Credits
        </span>
        <div className="flex items-center gap-2" style={{ marginTop: 4 }}>
          <img src={iconCredit} alt="" style={{ width: 18, height: 18 }} />
          <span style={{ fontFamily: "Arial, sans-serif", fontSize: 28, fontWeight: 700, color: "#71F0F6", lineHeight: "32px" }}>
            {credits}
          </span>
        </div>
      </div>
      <button
        onClick={onBuyCredits}
        className="flex items-center gap-1.5 rounded-full transition-all hover:brightness-110 active:scale-95"
        style={{
          padding: "8px 16px",
          background: "linear-gradient(135deg, #71F0F6 0%, #45C4F6 100%)",
          fontFamily: "Arial, sans-serif",
          fontSize: 13,
          fontWeight: 700,
          color: "#000",
        }}
      >
        <Sparkles size={14} />
        Buy Credits
      </button>
    </div>

    {/* Divider */}
    <div style={{ height: 1, background: "rgba(255,255,255,0.06)", margin: "0 20px" }} />

    {/* History */}
    <div style={{ padding: "12px 20px 8px" }}>
      <span style={{ fontFamily: "Arial, sans-serif", fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.6)" }}>
        Credit History
      </span>
    </div>

    <div className="hide-scrollbar" style={{ maxHeight: 280, overflowY: "auto" }}>
      {MOCK_HISTORY.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between transition-colors"
          style={{ padding: "10px 20px", cursor: "default" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
        >
          <div>
            <div className="flex items-center gap-2">
              <span style={{ fontFamily: "Arial, sans-serif", fontSize: 14, color: "rgba(255,255,255,0.85)" }}>
                {item.name}
              </span>
              {item.tag && (
                <span style={{
                  fontSize: 10, fontWeight: 700, padding: "2px 6px", borderRadius: 4,
                  background: "rgba(113,240,246,0.12)", color: "#71F0F6",
                }}>
                  {item.tag}
                </span>
              )}
            </div>
            <span style={{ fontFamily: "Arial, sans-serif", fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 2, display: "block" }}>
              {item.date}
            </span>
          </div>
          <span style={{
            fontFamily: "Arial, sans-serif", fontSize: 15, fontWeight: 700,
            color: item.amount > 0 ? "#4ADE80" : "#F87171",
          }}>
            {item.amount > 0 ? `+${item.amount}` : item.amount}
          </span>
        </div>
      ))}
    </div>

    <div style={{ height: 8 }} />
  </div>
);

export default CreditPanel;
