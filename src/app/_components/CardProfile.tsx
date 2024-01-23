import React from 'react';

export const CardProfile = () => {
  return (
    <div className="bg-purple-600 text-white p-6 rounded-lg shadow-md overflow-hidden relative">
      <div className="absolute top-0 right-0 px-2 py-1 bg-purple-800 text-xs font-bold uppercase">
        Available Now
      </div>
      <h3 className="text-2xl font-bold">Name of function</h3>
      <p className="text-purple-300">Name @Company</p>
      <div className="my-4 border-dashed border-2 border-purple-300"></div>
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="bg-purple-700 px-3 py-1 rounded">#HARDSKILLS</span>
        <span className="bg-purple-700 px-3 py-1 rounded">#SOFTSKILLS</span>
        <span className="bg-purple-700 px-3 py-1 rounded">#HARDSKILLS</span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <button className="bg-purple-800 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
          Information
        </button>
        <button className="bg-purple-800 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
          Information
        </button>
        <button className="bg-purple-800 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded col-span-2">
          Information
        </button>
      </div>
    </div>
  );
};
