import React from 'react';
import { User, Wrench, MessageSquareQuote, Mail } from 'lucide-react';

// Animated Skill Bar Component - Adapted for static display
const Skill = ({ name, level }) => {
    return (
        <div>
            <div className="flex justify-between mb-1">
                <span className="font-medium text-gray-700">{name}</span>
                <span className="text-sm text-gray-500">{level}%</span>
            </div>
            <div className="h-2.5 w-full bg-gray-200 rounded-full overflow-hidden">
                <div
                    className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                    style={{ width: `${level}%` }} // Use inline style for width
                />
            </div>
        </div>
    );
};

// Main AboutMe Component
// In a real project, this would be the default export.
export default function MobileAboutMe () {
    const aboutMeText = "Hey, I'm Dolev. As a Freelance Mobile and Web Developer, I am passionate about turning ideas into functional, scalable, and user-friendly applications. With expertise in full-stack development, I specialize in creating responsive websites and mobile apps that provide seamless experiences across devices.";

    const skills = [
        { name: "React & Next.js", level: 90 },
        { name: "UI/UX Design (Figma)", level: 85 },
        { name: "JavaScript & TypeScript", level: 85 },
        { name: "Node.js & Express", level: 80 },
        { name: "Flutter & Dart", level: 80 },
        { name: "React Native", level: 75 },
    ];

    return (
        <div className="flex w-full h-full bg-gray-100/50">
            <div className="flex-grow p-4 md:p-8 overflow-y-auto">
                <div className="max-w-5xl mx-auto">
                    {/* --- Header Section --- */}
                    <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 p-8 bg-white rounded-2xl shadow-sm mb-8">
                        <div className="relative w-32 h-32 md:w-40 md:h-40 flex-shrink-0">
                            <img
                                src="https://placehold.co/160x160/E0E7FF/4F46E5?text=DC"
                                alt="Dolev Cohen"
                                className="w-full h-full object-cover rounded-full"
                            />
                            <div className="absolute inset-0 rounded-full border-4 border-blue-500/50 shadow-lg"></div>
                        </div>

                        <div className="text-center md:text-left">
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                                Dolev <span className="text-blue-500">Cohen</span>
                            </h1>
                            <p className="text-xl text-gray-500 mt-1">
                                Freelance Mobile & Web Developer
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* --- Left Column (About & Testimonial) --- */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* About Me Section */}
                            <div className="p-8 bg-white rounded-2xl shadow-sm">
                                <h2 className="flex items-center text-2xl font-bold text-blue-500 mb-4">
                                    <User className="mr-3" /> About Me
                                </h2>
                                <p className="text-gray-700 leading-relaxed">
                                    {aboutMeText}
                                </p>
                                <p className="text-gray-700 leading-relaxed mt-4">
                                    I pride myself on writing clean, maintainable code and staying up-to-date with the latest technologies. My goal is to deliver solutions that not only meet client requirements but exceed expectations.
                                </p>
                            </div>

                            {/* Testimonial Section */}
                            <div className="p-8 bg-white rounded-2xl shadow-sm">
                                <h2 className="flex items-center text-2xl font-bold text-blue-500 mb-4">
                                    <MessageSquareQuote className="mr-3" /> Testimonial
                                </h2>
                                <blockquote className="border-l-4 border-blue-200 pl-6 text-gray-600 italic">
                                    "Dolev delivered an exceptional website that perfectly captured our brand's essence. His technical expertise and eye for design resulted in a platform that not only looks fantastic but also performs flawlessly."
                                </blockquote>
                                <p className="text-right mt-4 text-gray-800 font-medium">
                                    — Jane Smith, CEO at TechCorp
                                </p>
                            </div>
                        </div>

                        {/* --- Right Column (Skills & CTA) --- */}
                        <div className="lg:col-span-1 space-y-8">
                            {/* Skills Section */}
                            <div className="p-8 bg-white rounded-2xl shadow-sm">
                                <h2 className="flex items-center text-2xl font-bold text-blue-500 mb-6">
                                    <Wrench className="mr-3" /> My Skills
                                </h2>
                                <div className="space-y-5">
                                    {skills.map((skill) => (
                                        <Skill key={skill.name} name={skill.name} level={skill.level} />
                                    ))}
                                </div>
                            </div>

                            {/* Call to Action */}
                            <div className="p-8 bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-2xl shadow-lg text-center">
                                <h3 className="text-2xl font-bold mb-2">
                                    Ready to build?
                                </h3>
                                <p className="opacity-90 mb-6">
                                    Let's collaborate on your next project.
                                </p>
                                <button
                                    className="bg-white text-blue-500 px-6 py-2.5 rounded-lg font-bold shadow-md hover:bg-gray-100 transition-colors flex items-center justify-center w-full"
                                >
                                    <Mail className="mr-2" size={20}/> Get In Touch
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
