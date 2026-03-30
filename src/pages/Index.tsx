import { useState } from "react";
import Banner from "@/components/Banner";
import TabBar from "@/components/TabBar";
import ProjectGrid from "@/components/ProjectGrid";
import AssetLibrary from "@/components/AssetLibrary";

const Index = () => {
  const [showBanner, setShowBanner] = useState(true);
  const [activeTab, setActiveTab] = useState("my-project");

  return (
    <div className="min-h-screen bg-background overflow-y-auto px-6 py-8">
      <div className="max-w-[1796px] mx-auto flex flex-col gap-8">
        {showBanner && <Banner onClose={() => setShowBanner(false)} />}
        <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
        {activeTab === "my-project" ? (
          <ProjectGrid />
        ) : (
          <AssetLibrary activeAssetButton="characters" />
        )}
      </div>
    </div>
  );
};

export default Index;
