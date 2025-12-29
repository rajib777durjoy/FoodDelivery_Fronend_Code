import React from 'react';

const Loading = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
            {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">

                    {/* Thumbnail */}
                    <div className="h-40 bg-gray-300 rounded-lg"></div>

                    {/* Text */}
                    <div className="flex gap-3 mt-4">
                        <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
                        <div className="flex-1 space-y-2">
                            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                            <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                        </div>
                    </div>

                </div>
            ))}
        </div>
    );
};

export default Loading;