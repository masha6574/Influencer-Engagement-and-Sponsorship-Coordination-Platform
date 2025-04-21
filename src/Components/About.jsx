import React from "react";
import Lottie from "lottie-react";
import aboutAnimation from "../about-animation.json"; // Replace with your actual path
import { Mail, Phone, MapPin } from "lucide-react";

const About = () => {
    return (
        <div className="min-h-screen flex flex-col md:flex-row items-center pt-10 px-6 md:px-16">
            {/* Left - Animation */}
            <div className="w-full md:w-1/2 flex justify-center items-center">
                <Lottie
                    animationData={aboutAnimation}
                    loop={true}
                    className="w-full max-w-[500px] md:max-w-[600px]"
                />
            </div>

            {/* Right - Content */}
            <div className="w-full md:w-1/2 mt-5 md:mt-0 md:pl-12 text-gray-800">
                <h2 className="text-5xl font-bold mb-6 text-indigo-700">Welcome to InSync 🚀</h2>
                <p className="text-lg leading-relaxed mb-4">
                    <strong>InSync</strong> is your gateway to seamless influencer marketing. We connect brands with content creators to build impactful and authentic digital campaigns.
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                    <li>🔗 Smart matchmaking between brands and influencers</li>
                    <li>📊 Real-time campaign analytics and ROI tracking</li>
                    <li>⚡ Secure, scalable, and easy to use for all stakeholders</li>
                </ul>
                <p className="text-lg leading-relaxed mb-8">
                    Whether you're a brand looking to reach your audience or a creator ready to monetize your influence, InSync is designed to make every collaboration meaningful and measurable.
                </p>

                {/* Contact Section */}
                <div className="bg-gray-100 border border-gray-300 rounded-2xl p-6 shadow-md">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">📬 Contact Us</h3>
                    <div className="flex items-start mb-2">
                        <Mail className="w-5 h-5 mr-3 text-blue-600" />
                        <p className="text-md">admin.chennai@vit.ac.in</p>
                    </div>
                    <div className="flex items-start mb-2">
                        <Phone className="w-5 h-5 mr-3 text-blue-600" />
                        <p className="text-md">+91 44 3993 1555</p>
                    </div>
                    <div className="flex items-start">
                        <MapPin className="w-5 h-5 mr-3 text-blue-600" />
                        <p className="text-md">
                            Vellore Institute of Technology University, <br />
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
