import React from "react";
import Link from "next/link";

const Sidebar: React.FC = () => {
    return (
        <div className="bg-teal-800 h-full w-48 p-4 fixed left-0 top-0 bottom-0 overflow-y-auto">
            <div>
                <ul>
                    <li className="mb-4">
                        <Link href="/dashboard" className="text-white font-bold hover:bg-teal-900 py-2 px-4 rounded-lg block">
                                Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link href="/schools" className="text-white font-bold hover:bg-teal-900 py-2 px-4 rounded-lg block">
                                Schools
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar;
