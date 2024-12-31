interface Skill {
  id: number;
  documentId: string;
  name: string;
  category: {
    id: number;
    documentId: string;
    name: string;
  }
}

interface SkillsProps {
  skills: Skill[];
}

function groupSkillsByCategory(skills: Skill[]): Record<string, Skill[]> {
  return skills.reduce<Record<string, Skill[]>>((acc, skill) => {
    const categoryName = skill.category.name;
    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }
    acc[categoryName].push(skill);
    return acc;
  }, {});
}


export function Skills({ skills }: Readonly<SkillsProps>) {
  const groupedSkills = groupSkillsByCategory(skills);
  
  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto font-energetic">
      <div className="relative max-w-screen-2xl m-auto">
        <div className="relative flex flex-col">
          <div className="mb-10 lg:mb-0 lg:col-span-6 lg:col-start-8 w-full lg:w-1/2 ">
            <h2 className="text-2xl font-bold sm:text-3xl">Skills</h2>
              <nav className="grid lg:gap-10 mt-5 md:mt-10 gap-5" aria-label="Tabs" role="tablist">
              {Object.entries(groupedSkills).map(([categoryName, skills]) => (
                <h3 key={categoryName}>{categoryName}: {skills.map((skill) => skill.name).join(" / ")}</h3>
                ))}
              </nav>
            </div>
        </div>
      </div>
    </div>
  );
}