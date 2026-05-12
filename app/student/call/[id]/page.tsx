import HomeCalling from "@/components/call/HomeCalling"
import { Metadata } from "next"

export const metadata:Metadata={
    title:"CallPage - Student Dashboard",
    description:"This is the CallPage of the Student Dashboard"
}

function CallPage() {
  return (
    <HomeCalling/>
  )
}

export default CallPage