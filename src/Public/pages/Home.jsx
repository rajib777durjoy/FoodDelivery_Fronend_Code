
import React from 'react';
import Banner from './Banner';
import CounterPage from './CounterPage';
import Services from './Services';
import RestaurentFeature from './RestaurentFeature';
import DeliveryManFeature from './DeliveryManFeature';
import ReviewPage from './ReviewPage';

const Home = () => {
    return (
        <div className='w-full min-h-screen '>
                <Banner></Banner>
                <CounterPage></CounterPage>
                <Services></Services>
                <RestaurentFeature></RestaurentFeature>
                <DeliveryManFeature></DeliveryManFeature>
                <ReviewPage></ReviewPage>
        </div>
    );
};

export default Home;