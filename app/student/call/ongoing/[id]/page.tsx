import Ongoing from "@/components/call/Ongoing"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Ongoing Call - Student Dashboard",
    description: "This is the Ongoing Call page of the Student Dashboard"
}

function Calling() {
    return (
        <Ongoing/>
    )
}

export default Calling