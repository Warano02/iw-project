"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

function TestPage() {
  const [n, setN] = useState(1);
  return (
    <div className="w-screen h-screen bg-black flex items-center justify-center flex-col text-white space-y-4">
      <span className="text-4xl font-bold">{n} </span>
      <Button
        onClick={() => setN((prev) => prev + 1)}
        className="cursor-pointer"
      >
        Increment +1
      </Button>
    </div>
  );
}

export default TestPage;
