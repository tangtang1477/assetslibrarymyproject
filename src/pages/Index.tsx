import { useState } from "react";
import Banner from "@/components/Banner";
import TabBar from "@/components/TabBar";
import ProjectGrid from "@/components/ProjectGrid";
import AssetLibrary from "@/components/AssetLibrary";

const Index = () => {
  const [showBanner, setShowBanner] = useState(true);
  const [activeTab, setActiveTab] = useState("my-project");
  const [activeProjectButton, setActiveProjectButton] = useState<"aidea" | "toolkit">("aidea");
  const [activeAssetButton, setActiveAssetButton] = useState<"all" | "characters" | "other">("characters");

  return (
    <div className="min-h-screen bg-background overflow-y-auto px-6 py-8">
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
        {activeTab === "my-project" ? (
          <ProjectGrid />
        ) : (
          <AssetLibrary activeAssetButton={activeAssetButton} />
        )}
      </div>
    </div>
  );
};

export default Index;
