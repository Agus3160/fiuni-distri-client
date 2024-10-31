import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <div className='w-100 bg-dark h-full d-flex justify-content-center align-items-center'>
      <LoaderCircle size={64} className="spin-animation" />
    </div>
  )
}