import { ICategory } from "@/types/globalTypes";
// import Image from "next/image";
import Link from "next/link";

const CategoryCard = ({ category }: { category: ICategory }) => {
  return (
    <div>
      <Link href={`/quiz/${category?.id}`}>
        <div className="max-w-sm bg-white border border-blue-200 rounded-lg dark:bg-gray-700 dark:border-blue-700 shadow-md shadow-blue-200 hover:shadow-blue-200 dark:shadow-blue-500 dark:hover:shadow-blue-500 hover:shadow-2xl transition-all p-4">
          {/* <Image
            className="rounded-t-lg w- mx-auto p-"
            src={category?.image}
            alt={category?.name}
            priority={true}
            quality={100}
            width="75"
            height="75"
          /> */}

          <h5 className="my-10 text-center text-xl font-bold text-gray-900 dark:text-gray-400 line-clamp-1">
            {category?.name}
          </h5>
        </div>
      </Link>
    </div>
  );
};

export default CategoryCard;
