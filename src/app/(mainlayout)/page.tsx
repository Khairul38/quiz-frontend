import CategoryCard from "@/components/ui/CategoryCard";
import { ICategory } from "@/types/globalTypes";
import { promises as fs } from "fs";

const HomePage = async () => {
  const data = await fs.readFile(process.cwd() + "/categories.json", "utf8");
  const categories = JSON.parse(data);

  return (
    <div>
      {/* Quiz Categories */}
      <div className="pt-28 pb-16 min-h-[80vh]">
        <div className="text-center dark:text-white pb-14">
          <p className="text-4xl font-bold mb-2">Quiz Categories</p>
          <p>Select & Start Your Quiz!</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-14 px-8 max-w-screen-2xl mx-auto">
          {categories.map((category: ICategory) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
