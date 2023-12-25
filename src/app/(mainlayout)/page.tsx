"use client";

import Loader from "@/components/common/Loader";
import CategoryCard from "@/components/ui/CategoryCard";
import { useGetCategoriesQuery } from "@/redux/features/category/categoryApi";
import { ICategory } from "@/types/globalTypes";
// import { promises as fs } from "fs";

const HomePage = () => {
  // const data = await fs.readFile(process.cwd() + "/categories.json", "utf8");
  // const categories = JSON.parse(data);

  const { data, isLoading } = useGetCategoriesQuery({});

  if (isLoading)
    return <Loader className="h-[50vh] flex items-end justify-center" />;
  return (
    <div>
      {/* Quiz Categories */}
      <div className="pt-28 pb-16 min-h-[80vh]">
        <div className="text-center dark:text-white pb-14">
          <p className="text-4xl font-bold mb-2">Quiz Categories</p>
          <p>Select & Start Your Quiz!</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-14 px-8 max-w-screen-2xl mx-auto">
          {data.data.map((category: ICategory) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
