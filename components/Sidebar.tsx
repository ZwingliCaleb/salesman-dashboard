import React from "react";
import Link from "next/link";

const Sidebar: React.FC = () => {
    return (
        <div className="bg-gray-200 h-full w-48 p-4">
            <div className="h-screen">
                <ul>
                    <div className="">
                        <li className="mb-4">
                            <Link href="/dashboard" className="text-blue-500 hover:text-blue-700">
                                Dashboard
                            </Link>
                        </li>
                    </div>
                    < div className="">
                        <li>
                            <Link href="/schools" className="text-blue-500 hover:text-blue-700">
                                Schools
                            </Link>
                        </li>
                    </div>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar;