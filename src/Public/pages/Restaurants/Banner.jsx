import React from 'react';

const Banner = ({image}) => {
    return (
        <div
            className="w-full h-100 rounded-md"
            style={{
                backgroundImage: `url('${image}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
        </div>

    );
};

export default Banner;