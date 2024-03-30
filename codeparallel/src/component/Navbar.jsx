import React from 'react'
import { FaLaptopCode } from "react-icons/fa";
const Navbar = () => {
    return (
        <div>

            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <FaLaptopCode size={55} color='black' />
                <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                    <span className="ml-3 text-xl">Code Parallel</span>
                </a>
            </div>
        </div>
    )
}

export default Navbar