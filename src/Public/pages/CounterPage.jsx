import React from 'react';
import CountUp from 'react-countup';

const CounterPage = () => {
    return (
        <div className="w-full grid md:grid-cols-3 gap-6 text-black py-20">
            <div className="flex justify-center">
                <div className="text-center">
                    <p className="text-lg font-medium">Total Users</p>
                    <h2 className="text-4xl font-bold text-green-500">
                        <CountUp end={5000} duration={2.5} separator="," />
                    </h2>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="text-center">
                    <p className="text-lg font-medium">Delivery Partners</p>
                    <h2 className="text-4xl font-bold text-green-500">
                        <CountUp end={300} duration={2.5} separator="," />
                    </h2>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="text-center">
                    <p className="text-lg font-medium">Orders Delivered</p>
                    <h2 className="text-4xl font-bold text-green-500">
                        <CountUp end={12000} duration={2.5} separator="," />
                    </h2>
                </div>
            </div>

        </div>
    );
};

export default CounterPage;