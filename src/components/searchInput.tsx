import { Search } from "lucide-react";
import React from "react";

const SearchInput: React.FC = () => {
  return (
    <div className="relative w-full max-w-sm mx-auto">
      <input
        type="text"
        placeholder="Поиск..."
        className="w-full pl-4 pr-4 py-2 border border-customGray rounded-lg focus:outline-none focus:ring-1 focus:ring-customTeal focus:border-transparent"
      />

      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
        <Search size={15} className="transform -scale-x-100 opacity-40" />
      </div>
    </div>
  );
};

export default SearchInput;
