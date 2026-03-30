import { X } from "lucide-react";
import bannerBg from "@/assets/banner-bg.jpg";

interface BannerProps {
  onClose: () => void;
}

const Banner = ({ onClose }: BannerProps) => {
  return (
    <div className="relative w-full rounded-[32px] overflow-hidden" style={{ height: 324 }}>
      {/* Background image */}
      <img
        src={bannerBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Blue gradient overlay */}
      <div
        className="absolute left-0 top-0 h-full"
        style={{
          width: 637,
          background: "rgba(20, 78, 133, 0.8)",
          filter: "blur(47.96px)",
        }}
      />

      {/* Text content */}
      <div className="absolute left-8 top-16">
        <h2
          className="text-foreground font-bold italic text-4xl leading-[44px] tracking-[0.03em]"
          style={{ fontSize: 36 }}
        >
          Your Videos Can Pay You Back.
        </h2>
      </div>

      <div className="absolute left-8 top-[124px]">
        <p className="text-text-dim italic text-xl leading-7">
          Invite new users through your content and earn:
        </p>
      </div>

      <div className="absolute left-8 top-[168px]" style={{ width: 443 }}>
        <p className="text-text-bright font-bold text-lg leading-[26px]">
          💸 Earn 20% Credits every time a referred user pays
          <br />
          💰 Unlock 10% Cash Back after $3,000 total spend
        </p>
      </div>

      <div className="absolute left-8 top-[236px]">
        <p className="text-text-dim italic text-base leading-6">
          Cash-out available 30 days after the milestone
        </p>
      </div>

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute right-8 top-8 text-foreground/60 hover:text-foreground transition-colors"
      >
        <X size={18} />
      </button>
    </div>
  );
};

export default Banner;
