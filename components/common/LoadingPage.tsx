import { LoaderIcon } from 'lucide-react'

const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <LoaderIcon size={24} className="animate-spin" />
    </div>
  )
}

export default LoadingPage