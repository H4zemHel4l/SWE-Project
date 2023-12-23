import React from "react";
import ziad from "../assets/ziad.jpeg";
import hazem from "../assets/Hazem.jpg";
import ahmed from "../assets/Ahmed.jpeg";
import yousef from "../assets/Yousef.jpeg";
import sherif from "../assets/Sherif.jpeg";
import shahd from "../assets/Shahd.png";
import book from "../assets/book.jpg"
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

const role = localStorage.getItem("role");

const teamMembers = [
    { id: 1, name: "Ziad Salah", role: ["Frontend Developer"], image: ziad },
    { id: 2, name: "Hazem Helal", role: ["Frontend Developer"], image: hazem },
    { id: 5, name: "Youssef Medhat", role: ["Backend Developer"], image: yousef },
    { id: 4, name: "Shahd Osman", role: ["Backend Developer"], image: shahd },
    { id: 6, name: "Sherif Khairy", role: ["Backend Developer"], image: sherif },
    { id: 3, name: "Ahmed Mohamed", role: ["UI/UX Designer"], image: ahmed },

];
const Mid = () => {
    return (
        <div>
            <div className="relative">
                <img src={book} alt="book" height={3000} width={5000} className="opacity-70"/>

                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                    <h1 className="text-4xl font-bold text-black">Welcome to Our BookTopia</h1>
                </div>
            </div>

            <div className="flex flex-wrap justify-center rounded overflow-hidden shadow-lg m-5 ">
                {teamMembers.map((member) => (
                    <div key={member.id}
                         className="w-60 m-2 p-2 bg-white rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl">
                        <div className="h-60 w-full relative">
                            <img src={member.image} alt={member.name}
                                   className="rounded-xl"/>
                        </div>
                        <div className="p-2">
                            <h2 className="font-bold text-lg mb-2 text-center">{member.name}</h2>

                            <div className="m-2">
                                <p role="button"
                                   className="text-white bg-gray-700 px-3 py-1 rounded-md hover:bg-black text-center">
                                    {member.role}
                                </p>
                            </div>
                            <div className="flex gap-5 pb-1 justify-center">
                                <FaLinkedin className="text-2xl cursor-pointer hover:text-blue-600"/>
                                <FaGithub className="text-2xl cursor-pointer hover:text-gray-600"/>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Mid;