import { useNavigate } from "react-router-dom";
import { Home, Clapperboard, Wrench, Images, Plus, Diamond, User, Bell, MoreHorizontal } from "lucide-react";

interface SidebarProps {
  activePage?: string;
}

const Sidebar = ({ activePage }: SidebarProps) => {
  const navigate = useNavigate();

  return (
    <div className="fixed left-0 top-0 w-[76px] h-screen flex flex-col items-center z-50">
      {/* Logo */}
      <div className="mt-8 mb-8 text-lg font-bold text-primary cursor-pointer" onClick={() => navigate("/")}>
        M
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
        <NavIcon
          icon={<Home size={18} />}
          isActive={activePage === "home"}
          onClick={() => navigate("/")}
          hasHighlight
        />
        <NavIcon
          icon={<Clapperboard size={18} />}
          isActive={activePage === "aideo"}
          onClick={() => navigate("/")}
        />
        <NavIcon
          icon={<Wrench size={18} />}
          isActive={activePage === "toolkit"}
          onClick={() => navigate("/toolkit")}
        />
        <NavIcon
          icon={<Images size={18} />}
          isActive={activePage === "assets"}
          onClick={() => navigate("/")}
        />
        {/* Active indicator circle at top */}
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center -order-1"
          style={{ background: "rgba(255,255,255,0.2)" }}
        >
          <Home size={18} className="text-foreground/70" />
        </div>
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

const NavIcon = ({
  icon,
  isActive,
  onClick,
  hasHighlight,
}: {
  icon: React.ReactNode;
  isActive?: boolean;
  onClick: () => void;
  hasHighlight?: boolean;
}) => (
  <button
    onClick={onClick}
    className={`w-6 h-6 flex items-center justify-center transition-all
      hover:text-foreground active:scale-90
      ${isActive ? "text-primary" : "text-foreground/70"}`}
  >
    {icon}
  </button>
);

export default Sidebar;
