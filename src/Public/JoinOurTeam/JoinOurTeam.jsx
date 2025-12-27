import React from "react";
import { Link } from "react-router";

const JoinOurTeam = () => {
  return (
    <div className="bg-gray-50 py-12">
      {/* Page Header */}
      <div className="text-center mb-16 px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Join Our Team
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Partner with EatNow and grow your business or earn by delivering happiness.
        </p>
      </div>

      {/* Section 1: Become a Partner */}
      <section className="max-w-7xl mx-auto px-4 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg-white rounded-xl shadow-lg p-8">
          
          {/* Image Section */}
          <div>
            <img
              src="https://i.ibb.co/7zYp9Zc/restaurant-partner.png"
              alt="Restaurant Partner"
              className="w-full rounded-lg"
            />
          </div>

          {/* Content Section */}
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              List Your Restaurant on EatNow
            </h2>
            <p className="text-gray-600 mb-4">
              Would you like millions of new customers to enjoy your amazing food and groceries?
            </p>
            <p className="text-gray-600 mb-6">
              Join EatNow today and grow your restaurant business with fast deliveries,
              easy order management, and increased visibility.
            </p>

            <Link to={'/BecomePartner'}><button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition">
              Become a Partner
            </button></Link>
          </div>
        </div>
      </section>

      {/* Section 2: Become a EatNow Hero */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg-white rounded-xl shadow-lg p-8">
          
          {/* Content Section */}
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Become A EatNow Hero
            </h2>
            <p className="text-gray-600 mb-4">
              Are you a man of speed and a master of navigation?
            </p>
            <p className="text-gray-600 mb-6">
              Become a EatNow Hero and earn up to
              <span className="font-semibold text-green-600"> 25,000 TK </span>
              each month while spreading joy to doorsteps.
            </p>

            <Link to={'/BecomeDeliveryHero'}><button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition">
              Join as Delivery Hero
            </button></Link>
          </div>

          {/* Image Section */}
          <div>
            <img
              src="https://i.ibb.co/9wZ6GZg/delivery-hero.png"
              alt="Delivery Hero"
              className="w-full rounded-lg"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default JoinOurTeam;
