type TabsSelectorProps = {
  dates: Date[];
  activeDate: Date | null;
  onChange: (date: Date) => void;
};

export const TabsSelector = ({
  dates,
  activeDate,
  onChange,
}: TabsSelectorProps) => {
  return (
    <div className="mt-6 gap-4 max-md:gap-2 max-md:justify-center flex">
      {dates.map((date) => {
        const isActive = activeDate?.toDateString() === date.toDateString();
        return (
          <button
            key={date.toISOString()}
            onClick={() => onChange(date)}
            className={`px-4 py-2 rounded-xl border cursor-pointer max-md:p-2 ${
              isActive
                ? "bg-[#B61F1F] text-white border-[#B61F2F]"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {date.toLocaleDateString("es-AR")}
          </button>
        );
      })}
    </div>
  );
};
