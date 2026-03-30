import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Banner from "@/components/Banner";
import TabBar from "@/components/TabBar";
import ProjectGrid from "@/components/ProjectGrid";
import ToolkitGrid from "@/components/ToolkitGrid";
import AssetLibrary from "@/components/AssetLibrary";
import Sidebar from "@/components/Sidebar";

const Index = () => {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get("tab") === "asset-library" ? "asset-library" : "my-project";

  const [showBanner, setShowBanner] = useState(true);
  const [activeTab, setActiveTab] = useState(initialTab);
  const [activeProjectButton, setActiveProjectButton] = useState<"aidea" | "toolkit">("aidea");
  const [activeAssetButton, setActiveAssetButton] = useState<string>("All");

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab === "asset-library") setActiveTab("asset-library");
  }, [searchParams]);

  const renderContent = () => {
    if (activeTab === "asset-library") {
      return <AssetLibrary />;
    }
    if (activeProjectButton === "toolkit") {
      return <ToolkitGrid />;
    }
    return <ProjectGrid />;
  };

  const activePage = activeTab === "asset-library" ? "assets" : "home";

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar activePage={activePage} />
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
