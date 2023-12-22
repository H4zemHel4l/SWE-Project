import React from "react";

function Footer() {
    return (
        <>
            <div className="bg-gray-50 h-1/2 w-full flex md:flex-row flex-col justify-around items-start p-3">
                <div className="p-5 ">
                    <ul>
                        <p className="text-gray-800 font-bold text-3xl pb-6">
                            Book<span className="text-orange-600">Topia</span>
                        </p>
                    </ul>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center text-center  p-5 bg-gray-50">
                <h1 className=" text-gray-800 font-semibold">
                    © 2023-2024 All rights reserved
                </h1>
            </div>
        </>
    );
}

export default Footer;