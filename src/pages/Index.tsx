import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Banner from "@/components/Banner";
import TabBar from "@/components/TabBar";
import ProjectGrid from "@/components/ProjectGrid";
import ToolkitGrid from "@/components/ToolkitGrid";
import AssetLibrary, { AssetFilterBar } from "@/components/AssetLibrary";
import Sidebar from "@/components/Sidebar";

const Index = () => {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get("tab") === "asset-library" ? "asset-library" : "my-project";

  const [showBanner, setShowBanner] = useState(true);
  const [activeTab, setActiveTab] = useState(initialTab);
  const [activeProjectButton, setActiveProjectButton] = useState<"aidea" | "toolkit">("aidea");
  const [activeAssetButton, setActiveAssetButton] = useState<string>("All");

  // Asset library filter state
  const [periodTab, setPeriodTab] = useState<"my" | "public">("public");
  const [assetType, setAssetType] = useState("All");
  const [region, setRegion] = useState("All");
  const [subject, setSubject] = useState("All");
  const [style, setStyle] = useState("All");
  const showFilters = assetType === "Characters";

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

  const activePage = activeTab === "asset-library" ? "assets" : "assets";

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar activePage={activePage} />
      <div className="flex-1 ml-[88px] overflow-y-auto px-6 py-8">
        <div className="max-w-[1796px] mx-auto flex flex-col">
          {showBanner && <Banner onClose={() => setShowBanner(false)} />}
          <div style={{ marginTop: showBanner ? 32 : 0 }}>
            <TabBar
              activeTab={activeTab}
              onTabChange={setActiveTab}
              activeProjectButton={activeProjectButton}
              onProjectButtonChange={setActiveProjectButton}
              activeAssetButton={activeAssetButton}
              onAssetButtonChange={setActiveAssetButton}
            >
              <AssetFilterBar
                periodTab={periodTab}
                setPeriodTab={setPeriodTab}
                assetType={assetType}
                setAssetType={setAssetType}
                region={region}
                setRegion={setRegion}
                subject={subject}
                setSubject={setSubject}
                style={style}
                setStyle={setStyle}
                showFilters={showFilters}
              />
            </TabBar>
          </div>
          {/* 32px gap between filters and content */}
          <div style={{ marginTop: 32 }}>
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
