"use client"

import { useParams } from "next/navigation"

function Ongoing() {
    const { id } = useParams()
    return (
        <main className="w-full h-screen flex">
            <div className="w-full h-full flex items-center justify-center">
                <div className="flex-1 bg-red-500 text-white">
                    {id ? `Ongoing Call with ID: ${id}` : "No ID provided"}
                </div>
                <div className="flex-1  text-white">
                    chat du call
                </div>
            </div>
        </main>
    )
}

export default Ongoing