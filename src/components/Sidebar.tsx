import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import logoM from "@/assets/logo-m.png";
import iconHome from "@/assets/icon-home.svg";
import iconHomeSelect from "@/assets/icon-home-select.svg";
import iconAideo from "@/assets/icon-aideo.svg";
import iconAideoSelect from "@/assets/icon-aideo-select.svg";
import iconTool from "@/assets/icon-tool.svg";
import iconToolSelect from "@/assets/icon-tool-select.svg";
import iconAssets from "@/assets/icon-assets.svg";
import iconAssetsSelect from "@/assets/icon-assets-select.svg";
import iconSubscribe from "@/assets/icon-subscribe.svg";
import iconProfile from "@/assets/icon-profile.svg";
import iconNotice from "@/assets/icon-notice.svg";
import iconMore from "@/assets/icon-more.svg";

interface SidebarProps {
  activePage?: string;
}

const NAV_ITEMS = [
  { id: "home", icon: iconHome, iconSelect: iconHomeSelect, label: "Home", path: "/home" },
  { id: "aideo", icon: iconAideo, iconSelect: iconAideoSelect, label: "AIdeo World", path: "/" },
  { id: "toolkit", icon: iconTool, iconSelect: iconToolSelect, label: "Toolkit", path: "/toolkit" },
  { id: "assets", icon: iconAssets, iconSelect: iconAssetsSelect, label: "Assets", path: "/?tab=asset-library" },
];

const Sidebar = ({ activePage }: SidebarProps) => {
  const navigate = useNavigate();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const handleNav = (item: typeof NAV_ITEMS[number]) => {
    if (item.id === "home") {
      navigate("/home");
    } else if (item.id === "assets") {
      navigate("/?tab=asset-library");
    } else {
      navigate(item.path);
    }
  };

  return (
    <div
      className="fixed left-0 top-0 h-screen flex flex-col items-center z-50"
      style={{ width: 88, paddingLeft: 20 }}
    >
      {/* Logo */}
      <div className="mt-6 mb-6 cursor-pointer" onClick={() => navigate("/home")}>
        <img src={logoM} alt="Logo" className="w-6 h-7 object-contain" />
      </div>

      {/* Plus button */}
      <button
        onClick={() => navigate("/home")}
        className="w-12 h-12 rounded-full flex items-center justify-center mb-4
          hover:brightness-90 active:brightness-75 transition-all"
        style={{ background: "rgba(255,255,255,0.4)" }}
      >
        <Plus size={18} className="text-foreground" />
      </button>

      {/* Spacer to push nav pill to vertical center */}
      <div className="flex-1" />

      {/* Nav pill - glass effect, vertically centered */}
      <div
        className="flex flex-col items-center"
        style={{
          background: "rgba(255,255,255,0.1)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          width: 48,
          borderRadius: 100,
          padding: "16px 12px",
          gap: 20,
        }}
      >
        {NAV_ITEMS.map((item) => {
          const isActive = activePage === item.id;
          const isHovered = hoveredId === item.id;
          const showIcon = isActive || isHovered ? item.iconSelect : item.icon;

          return (
            <div
              key={item.id}
              className="relative flex items-center justify-center"
              style={{ width: 24, height: 24 }}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Active/hover circle background - 40x40 centered on 24x24 icon */}
              {(isActive || isHovered) && (
                <div
                  className="absolute rounded-full"
                  style={{
                    width: 40,
                    height: 40,
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    background: "rgba(255,255,255,0.2)",
                  }}
                />
              )}
              <button
                onClick={() => handleNav(item)}
                className="relative w-6 h-6 flex items-center justify-center transition-all active:scale-90"
              >
                <img
                  src={showIcon}
                  alt={item.id}
                  className="w-6 h-6"
                />
              </button>

              {/* Hover tooltip - positioned to the right with 8px gap from pill edge */}
              {isHovered && !isActive && (
                <div
                  className="absolute flex items-center justify-center whitespace-nowrap"
                  style={{
                    left: "calc(100% + 28px)",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "rgba(255,255,255,0.4)",
                    borderRadius: 100,
                    padding: "8px 16px",
                  }}
                >
                  <span
                    className="text-foreground"
                    style={{
                      fontFamily: "Arial, sans-serif",
                      fontWeight: 400,
                      fontSize: 14,
                      lineHeight: "14px",
                    }}
                  >
                    {item.label}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Bottom icons */}
      <div className="flex flex-col items-center gap-4 mb-6">
        <button className="w-8 h-8 flex items-center justify-center hover:opacity-80 transition-opacity">
          <img src={iconSubscribe} alt="Subscribe" className="w-6 h-6" />
        </button>
        <button className="w-8 h-8 flex items-center justify-center hover:opacity-80 transition-opacity">
          <img src={iconProfile} alt="Profile" className="w-7 h-7" />
        </button>
        <button className="w-6 h-6 flex items-center justify-center hover:opacity-80 transition-opacity">
          <img src={iconNotice} alt="Notifications" className="w-5 h-5" />
        </button>
        <button className="w-6 h-6 flex items-center justify-center hover:opacity-80 transition-opacity">
          <img src={iconMore} alt="More" className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
