import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-green-800 text-white py-10">
      <div className="w-[90%] mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* About Section */}
        <div>
          <h1 className="text-2xl font-bold mb-3">EatNow</h1>
          <p className="text-gray-300">
            Fast and reliable food delivery service. Bringing your favorite meals to your doorstep.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Quick Links</h2>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-amber-400">Home</a></li>
            <li><a href="/menu" className="hover:text-amber-400">Menu</a></li>
            <li><a href="/about" className="hover:text-amber-400">About</a></li>
            <li><a href="/contact" className="hover:text-amber-400">Contact</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Contact Us</h2>
          <p className="text-gray-300">123 Food Street, Dhaka, Bangladesh</p>
          <p className="text-gray-300">Phone: +880 123 456 789</p>
          <p className="text-gray-300">Email: support@foodie.com</p>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Follow Us</h2>
          <div className="flex gap-4 text-white text-2xl">
            <a href="#"><FaFacebook className="hover:text-amber-400" /></a>
            <a href="#"><FaTwitter className="hover:text-amber-400" /></a>
            <a href="#"><FaInstagram className="hover:text-amber-400" /></a>
            <a href="#"><FaLinkedin className="hover:text-amber-400" /></a>
          </div>
        </div>
      </div>

      <div className="text-center text-gray-400 mt-10 border-t border-gray-700 pt-4">
        &copy; {new Date().getFullYear()} EatNow. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
