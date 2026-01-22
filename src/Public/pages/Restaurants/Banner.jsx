import React from 'react';

const Banner = ({ image,logo,name}) => {
    return (
        <div
            className="w-full h-100 rounded-md px-3 py-1"
            style={{
                backgroundImage: `url('${image}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className='w-13 h-13 border-0 rounded-full p-2 bg-green-900'>
                <img src={logo} alt={name} className='w-full h-full'/>
            </div>

        </div>

    );
};

export default Banner;