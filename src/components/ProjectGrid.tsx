import { Plus } from "lucide-react";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";
import project5 from "@/assets/project-5.jpg";
import project6 from "@/assets/project-6.jpg";
import projectTall1 from "@/assets/project-tall-1.jpg";
import projectTall2 from "@/assets/project-tall-2.jpg";
import projectTall3 from "@/assets/project-tall-3.jpg";
import projectTall4 from "@/assets/project-tall-4.jpg";
import projectTall5 from "@/assets/project-tall-5.jpg";

const ProjectGrid = () => {
  return (
    <div className="relative w-full" style={{ columnCount: 5, columnGap: 8 }}>
      {/* New Project card */}
      <div
        className="bg-card-surface rounded-lg flex flex-col items-center justify-center mb-2 break-inside-avoid"
        style={{ height: 200 }}
      >
        <div className="w-16 h-16 rounded-full bg-card-surface-hover flex items-center justify-center mb-4">
          <Plus size={24} className="text-foreground" />
        </div>
        <span className="text-text-bright text-base">New Project</span>
      </div>

      {/* Small cards row */}
      <ProjectCard src={project5} h={200} />
      <ProjectCard src={projectTall5} h={628} />

      {/* Column 2 */}
      <ProjectCard src={project1} h={200} />
      <ProjectCard src={project6} h={200} />
      <ProjectCard src={projectTall3} h={628} />

      {/* Column 3 */}
      <ProjectCard src={project2} h={200} />
      <ProjectCard src={project3} h={200} />
      <ProjectCard src={projectTall2} h={628} />

      {/* Column 4 */}
      <ProjectCard src={projectTall1} h={628} />
      <ProjectCard src={projectTall4} h={628} />

      {/* Column 5 */}
      <ProjectCard src={project4} h={200} />
      <ProjectCard src={project5} h={628} />
    </div>
  );
};

const ProjectCard = ({ src, h }: { src: string; h: number }) => (
  <div
    className="rounded-lg overflow-hidden mb-2 break-inside-avoid"
    style={{ height: h }}
  >
    <img
      src={src}
      alt=""
      loading="lazy"
      className="w-full h-full object-cover"
    />
  </div>
);

export default ProjectGrid;
