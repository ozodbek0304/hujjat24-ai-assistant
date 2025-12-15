const TestIllustration = () => {
  return (
    <div className="relative w-36 h-32">
      {/* Test paper */}
      <div className="absolute top-0 left-0 w-28 h-28 bg-white rounded-lg shadow-lg border border-violet-200">
        {/* Header */}
        <div className="absolute top-3 left-3 right-3">
          <div className="h-2.5 bg-gradient-to-r from-violet-500 to-purple-500 rounded w-16 mb-3" />
        </div>
        
        {/* Questions */}
        <div className="absolute top-10 left-3 right-3 space-y-3">
          {/* Question 1 */}
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded border-2 border-violet-400 flex items-center justify-center bg-violet-500">
              <svg viewBox="0 0 24 24" className="w-3 h-3 text-white">
                <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </div>
            <div className="h-1.5 bg-violet-200 rounded flex-1" />
          </div>
          
          {/* Question 2 */}
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded border-2 border-violet-300" />
            <div className="h-1.5 bg-violet-200 rounded w-4/5" />
          </div>
          
          {/* Question 3 */}
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded border-2 border-violet-300" />
            <div className="h-1.5 bg-violet-200 rounded w-3/4" />
          </div>
        </div>
      </div>
      
      {/* Timer/Clock */}
      <div className="absolute top-2 right-0 w-10 h-10 bg-gradient-to-br from-violet-400 to-purple-500 rounded-full shadow-lg flex items-center justify-center">
        <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center">
          <div className="relative w-4 h-4">
            <div className="absolute top-1/2 left-1/2 w-0.5 h-2 bg-violet-600 origin-bottom -translate-x-1/2 -translate-y-full rotate-45" />
            <div className="absolute top-1/2 left-1/2 w-0.5 h-1.5 bg-violet-400 origin-bottom -translate-x-1/2 -translate-y-full -rotate-12" />
            <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-violet-600 rounded-full -translate-x-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>
      
      {/* A+ badge */}
      <div className="absolute bottom-2 right-2 bg-gradient-to-r from-violet-500 to-purple-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
        A+
      </div>
      
      {/* Decorative stars */}
      <div className="absolute bottom-0 left-0 text-violet-400 text-lg">✦</div>
      <div className="absolute bottom-4 left-6 text-purple-300 text-sm">✦</div>
    </div>
  );
};

export default TestIllustration;
