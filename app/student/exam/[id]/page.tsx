import Composing from "@/components/exam/Composing"

export function generateMetadata({ params }: { params: { id: string } }) {
    return {
        title: `Exam ${params.id}`
    }
}
function Examination() {
    return (
        <Composing />
    )
}

export default Examination