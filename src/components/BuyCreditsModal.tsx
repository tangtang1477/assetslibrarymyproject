import { useState } from "react";
import { X, Sparkles } from "lucide-react";
import iconCredit from "@/assets/icon-credit.svg";

const CREDIT_OPTIONS = [
  { credits: 100, price: "$1" },
  { credits: 500, price: "$5" },
  { credits: 1000, price: "$10" },
  { credits: 2000, price: "$20" },
  { credits: 5000, price: "$50" },
  { credits: 10000, price: "$100" },
];

interface BuyCreditsModalProps {
  onClose: () => void;
}

const BuyCreditsModal = ({ onClose }: BuyCreditsModalProps) => {
  const [selected, setSelected] = useState(0);
  const [customAmount, setCustomAmount] = useState("");
  const isCustom = selected === -1;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.6)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        style={{
          width: 520,
          background: "rgba(28, 30, 34, 0.98)",
          borderRadius: 20,
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
          animation: "assetPanelIn 0.2s ease-out",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between" style={{ padding: "20px 24px 16px" }}>
          <h3 style={{ fontFamily: "Arial, sans-serif", fontSize: 20, fontWeight: 700, color: "rgba(255,255,255,0.95)" }}>
            Buy Credits
          </h3>
          <button
            onClick={onClose}
            className="flex items-center justify-center rounded-full transition-opacity hover:opacity-100"
            style={{ width: 32, height: 32, background: "rgba(255,255,255,0.08)", opacity: 0.7 }}
          >
            <X size={16} style={{ color: "#fff" }} />
          </button>
        </div>

        {/* Grid */}
        <div style={{ padding: "0 24px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
          {CREDIT_OPTIONS.map((opt, i) => {
            const isSelected = selected === i && !isCustom;
            return (
              <button
                key={i}
                onClick={() => { setSelected(i); setCustomAmount(""); }}
                className="flex flex-col items-center justify-center rounded-2xl transition-all duration-200"
                style={{
                  height: 100,
                  background: isSelected ? "rgba(113,240,246,0.1)" : "rgba(255,255,255,0.04)",
                  border: isSelected ? "2px solid #71F0F6" : "2px solid rgba(255,255,255,0.06)",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) e.currentTarget.style.background = "rgba(255,255,255,0.07)";
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                }}
              >
                <div className="flex items-center gap-1.5">
                  <img src={iconCredit} alt="" style={{ width: 16, height: 16 }} />
                  <span style={{ fontFamily: "Arial, sans-serif", fontSize: 22, fontWeight: 700, color: isSelected ? "#71F0F6" : "rgba(255,255,255,0.9)" }}>
                    {opt.credits.toLocaleString()}
                  </span>
                </div>
                <span style={{ fontFamily: "Arial, sans-serif", fontSize: 14, color: "rgba(255,255,255,0.45)", marginTop: 4 }}>
                  {opt.price}
                </span>
              </button>
            );
          })}
        </div>

        {/* Custom row */}
        <div style={{ padding: "12px 24px 0" }}>
          <div
            className="flex items-center rounded-2xl transition-all duration-200"
            style={{
              height: 56,
              padding: "0 16px",
              background: isCustom ? "rgba(113,240,246,0.1)" : "rgba(255,255,255,0.04)",
              border: isCustom ? "2px solid #71F0F6" : "2px solid rgba(255,255,255,0.06)",
              cursor: "pointer",
              gap: 10,
            }}
            onClick={() => setSelected(-1)}
          >
            <img src={iconCredit} alt="" style={{ width: 16, height: 16 }} />
            <span style={{ fontFamily: "Arial, sans-serif", fontSize: 14, color: "rgba(255,255,255,0.5)", flexShrink: 0 }}>
              Custom
            </span>
            <input
              type="number"
              value={customAmount}
              onChange={(e) => { setCustomAmount(e.target.value); setSelected(-1); }}
              placeholder="Enter amount"
              className="flex-1 bg-transparent border-none outline-none text-right"
              style={{
                fontFamily: "Arial, sans-serif", fontSize: 18, fontWeight: 700,
                color: isCustom ? "#71F0F6" : "rgba(255,255,255,0.7)",
              }}
            />
          </div>
        </div>

        {/* Buy Now button */}
        <div style={{ padding: "20px 24px 24px" }}>
          <button
            className="w-full flex items-center justify-center rounded-full font-bold transition-all duration-200"
            style={{
              height: 48,
              background: "#71F0F6",
              border: "none",
              fontFamily: "Arial, sans-serif",
              fontSize: 16,
              color: "#000",
              gap: 8,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#8df4f9"; e.currentTarget.style.boxShadow = "0 0 20px rgba(113,240,246,0.4)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#71F0F6"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "scale(1)"; }}
            onMouseDown={(e) => { e.currentTarget.style.transform = "scale(0.97)"; }}
            onMouseUp={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
          >
            <Sparkles size={16} style={{ color: "#000" }} />
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyCreditsModal;
