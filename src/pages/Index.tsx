import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Banner from "@/components/Banner";
import TabBar from "@/components/TabBar";
import ProjectGrid from "@/components/ProjectGrid";
import ToolkitGrid from "@/components/ToolkitGrid";
import AssetLibrary from "@/components/AssetLibrary";
import Sidebar from "@/components/Sidebar";

const Index = () => {
  const [showBanner, setShowBanner] = useState(true);
  const [activeTab, setActiveTab] = useState("my-project");
  const [activeProjectButton, setActiveProjectButton] = useState<"aidea" | "toolkit">("aidea");
  const [activeAssetButton, setActiveAssetButton] = useState<"all" | "characters" | "other">("all");

  const renderContent = () => {
    if (activeTab === "asset-library") {
      return <AssetLibrary activeAssetButton={activeAssetButton} />;
    }
    if (activeProjectButton === "toolkit") {
      return <ToolkitGrid />;
    }
    return <ProjectGrid />;
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar activePage="home" />
      <div className="flex-1 ml-[76px] overflow-y-auto px-6 py-8">
        <div className="max-w-[1796px] mx-auto flex flex-col gap-8">
          {showBanner && <Banner onClose={() => setShowBanner(false)} />}
          <TabBar
            activeTab={activeTab}
            onTabChange={setActiveTab}
            activeProjectButton={activeProjectButton}
            onProjectButtonChange={setActiveProjectButton}
            activeAssetButton={activeAssetButton}
            onAssetButtonChange={setActiveAssetButton}
          />
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Index;
