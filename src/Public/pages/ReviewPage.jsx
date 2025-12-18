import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { FaStar } from 'react-icons/fa';

const reviews = [
    {
        name: "John Doe",
        review: "Amazing food! Fast delivery and fresh ingredients. Highly recommended!",
        rating: 5,
        image: "https://i.pravatar.cc/100?img=1",
    },
    {
        name: "Jane Smith",
        review: "Good taste, but delivery took a little longer than expected.",
        rating: 4,
        image: "https://i.pravatar.cc/100?img=2",
    },
    {
        name: "Ali Khan",
        review: "Excellent service and delicious food. Will order again!",
        rating: 5,
        image: "https://i.pravatar.cc/100?img=3",
    },
    {
        name: "Sara Lee",
        review: "Food was okay, but packaging could be better.",
        rating: 3,
        image: "https://i.pravatar.cc/100?img=4",
    },
];

const ReviewPage = () => {
    return (
        <div className='w-full my-10'>
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-green-800">What Our Customers Say</h2>
                <p className="text-gray-600 mt-2">We value every feedback to make your experience better.</p>
            </div>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                pagination={{ clickable: true }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                {reviews?.map((rev, index) => (
                    <SwiperSlide key={index}>
                        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center max-w-sm mx-auto">
                            <img
                                src={rev.image}
                                alt={rev.name}
                                className="w-20 h-20 rounded-full mb-4"
                            />
                            <h3 className="text-lg font-semibold mb-2">{rev.name}</h3>
                            <p className="text-gray-600 mb-3">{rev.review}</p>
                            <div className="flex space-x-1 text-yellow-400">
                                {Array(rev.rating)
                                    .fill(0)
                                    .map((_, i) => (
                                        <FaStar key={i} />
                                    ))}
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default ReviewPage;
