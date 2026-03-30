import { useNavigate, useLocation } from "react-router-dom";
import { Plus } from "lucide-react";
import { Diamond, User, Bell, MoreHorizontal } from "lucide-react";
import logoM from "@/assets/logo-m.png";
import iconHome from "@/assets/icon-home.svg";
import iconAideo from "@/assets/icon-aideo.svg";
import iconTool from "@/assets/icon-tool.svg";
import iconAssets from "@/assets/icon-assets.svg";

interface SidebarProps {
  activePage?: string;
}

const NAV_ITEMS = [
  { id: "home", icon: iconHome, path: "/" },
  { id: "aideo", icon: iconAideo, path: "/" },
  { id: "toolkit", icon: iconTool, path: "/toolkit" },
  { id: "assets", icon: iconAssets, path: "/?tab=asset-library" },
];

const Sidebar = ({ activePage }: SidebarProps) => {
  const navigate = useNavigate();

  const handleNav = (item: typeof NAV_ITEMS[number]) => {
    if (item.id === "assets") {
      navigate("/?tab=asset-library");
    } else {
      navigate(item.path);
    }
  };

  return (
    <div className="fixed left-0 top-0 w-[76px] h-screen flex flex-col items-center z-50">
      {/* Logo */}
      <div className="mt-6 mb-6 cursor-pointer" onClick={() => navigate("/")}>
        <img src={logoM} alt="Logo" className="w-6 h-7 object-contain" />
      </div>

      {/* Plus button */}
      <button
        className="w-12 h-12 rounded-full bg-foreground flex items-center justify-center mb-4
          hover:brightness-90 active:brightness-75 transition-all"
      >
        <Plus size={18} className="text-background" />
      </button>

      {/* Nav pill */}
      <div
        className="flex flex-col items-center gap-5 py-4 px-3 rounded-full"
        style={{ background: "rgba(255,255,255,0.1)", width: 48 }}
      >
        {NAV_ITEMS.map((item) => {
          const isActive = activePage === item.id;
          return (
            <div key={item.id} className="relative flex items-center justify-center">
              {/* Active circle background — 40px, 8px from container edge (container is 48px, so centered) */}
              {isActive && (
                <div
                  className="absolute w-10 h-10 rounded-full"
                  style={{ background: "rgba(255,255,255,0.2)" }}
                />
              )}
              <button
                onClick={() => handleNav(item)}
                className={`relative w-6 h-6 flex items-center justify-center transition-all
                  ${isActive ? "" : "hover:opacity-100 opacity-70 hover:scale-110"} active:scale-90`}
              >
                <img
                  src={item.icon}
                  alt={item.id}
                  className="w-[18px] h-[18px]"
                  style={{
                    filter: isActive
                      ? "brightness(0) saturate(100%) invert(85%) sepia(30%) saturate(1000%) hue-rotate(140deg) brightness(1.1)"
                      : "none",
                  }}
                />
              </button>
            </div>
          );
        })}
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Bottom icons */}
      <div className="flex flex-col items-center gap-4 mb-8">
        <button className="hover:opacity-80 transition-opacity">
          <Diamond size={24} className="text-primary" />
        </button>
        <button className="hover:opacity-80 transition-opacity">
          <User size={28} className="text-foreground/30" />
        </button>
        <button className="hover:opacity-80 transition-opacity">
          <Bell size={20} className="text-foreground/70" />
        </button>
        <button className="hover:opacity-80 transition-opacity">
          <MoreHorizontal size={20} className="text-foreground/70" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
