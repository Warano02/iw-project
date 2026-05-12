"use client"
import { useParams } from "next/navigation"

function Composing() {
    const {id}=useParams()
  return (
    <div>Composing exam with id : {id}</div>
  )
}

export default Composing