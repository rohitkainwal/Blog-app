import React from "react";
import Navbar from "../components/Navbar";
import { FaPenNib, FaUsers, FaLeaf } from "react-icons/fa";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <Navbar />

      {/* Hero Section */}
      <section className="text-center py-16 px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-700 mb-4">
          About Our Blog
        </h1>
        <p className="max-w-3xl mx-auto text-lg text-gray-600">
          A place where ideas, knowledge, and experiences come together.
          We believe in sharing meaningful content that inspires learning
          and growth.
        </p>
      </section>

      {/* Content Section */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Card 1 */}
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition">
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white text-2xl">
              <FaPenNib />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Quality Content
            </h3>
            <p className="text-gray-600">
              We focus on creating well-researched and easy-to-understand
              articles that add real value to readers.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition">
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white text-2xl">
              <FaUsers />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Community Driven
            </h3>
            <p className="text-gray-600">
              Our platform encourages writers and readers to connect,
              learn, and grow together as a community.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition">
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white text-2xl">
              <FaLeaf />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Simple & Clean
            </h3>
            <p className="text-gray-600">
              We believe great reading experiences come from clean,
              distraction-free design and smooth performance.
            </p>
          </div>

        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-white border-t border-green-200 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Our mission is to provide a platform where anyone can share
            knowledge, express ideas, and inspire others. Whether you are
            a beginner or an expert, your voice matters here.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
