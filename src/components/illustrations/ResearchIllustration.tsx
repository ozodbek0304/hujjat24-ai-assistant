const ResearchIllustration = () => {
  return (
    <div className="relative w-40 h-28">
      {/* Magnifying glass */}
      <div className="absolute top-2 left-2 w-14 h-14 rounded-full border-4 border-blue-500 bg-gradient-to-br from-blue-100 to-blue-200 shadow-lg">
        <div className="absolute top-3 left-3 w-3 h-3 bg-white/60 rounded-full" />
      </div>
      <div className="absolute top-12 left-12 w-8 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transform rotate-45 shadow-md" />
      
      {/* Document behind */}
      <div className="absolute top-4 right-2 w-20 h-24 bg-white rounded-lg shadow-lg border border-blue-200">
        <div className="absolute top-3 left-3 right-3 space-y-2">
          <div className="h-2 bg-blue-400 rounded w-full" />
          <div className="h-1.5 bg-blue-200 rounded w-4/5" />
          <div className="h-1.5 bg-blue-200 rounded w-3/5" />
          <div className="h-1.5 bg-blue-200 rounded w-4/5" />
          <div className="h-1.5 bg-blue-200 rounded w-2/3" />
        </div>
        {/* Chart */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end gap-1 h-6">
          <div className="w-3 h-3 bg-blue-300 rounded-t" />
          <div className="w-3 h-5 bg-blue-400 rounded-t" />
          <div className="w-3 h-4 bg-blue-500 rounded-t" />
          <div className="w-3 h-6 bg-blue-600 rounded-t" />
        </div>
      </div>
      
      {/* Decorative dots */}
      <div className="absolute bottom-0 left-0 flex gap-1">
        <div className="w-2 h-2 bg-blue-300 rounded-full" />
        <div className="w-2 h-2 bg-blue-400 rounded-full" />
        <div className="w-2 h-2 bg-blue-500 rounded-full" />
      </div>
    </div>
  );
};

export default ResearchIllustration;
