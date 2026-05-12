"use client"

import Link from "next/link"
import { useParams } from "next/navigation"

function HomeCalling() {
    const { id } = useParams()
    return (
        <div className="flex flex-col space-y-6">
            <span>Call not exist </span>
            <span>Call denied</span>
            <span>Call ended</span>
            <span>Call Pending</span>
            <span>Call Ongoing <Link className="text-green-500" href={`/student/call/ongoing/${id}`}>Join the call</Link> </span>
        </div>
    )
}
export default HomeCalling