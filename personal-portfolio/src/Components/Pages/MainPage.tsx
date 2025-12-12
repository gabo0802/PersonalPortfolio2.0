import React from "react";
function MainPage() {
    return (
        <div className="flex flex-col w-full">
            <div className="bg-[#282c34] h-[75vh] w-full flex items-center justify-center text-white">
                <p className="text-3xl underline">This is my personal portfolio website.</p>
            </div>
            <div className="bg-[#282c34] h-[75vh] w-full flex items-center justify-center text-white">
                <p className="text-3xl">Section 2</p>
            </div>
            <div className="bg-[#282c34] h-[75vh] w-full flex items-center justify-center text-white">
                <p className="text-3xl">Section 3</p>
            </div>
            <div className="bg-[#282c34] h-[75vh] w-full flex items-center justify-center text-white">
                <p className="text-3xl">Section 4</p>
            </div>
        </div>
    );
}

export default MainPage;