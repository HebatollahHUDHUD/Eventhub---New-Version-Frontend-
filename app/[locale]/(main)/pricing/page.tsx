import { Suspense } from 'react'
import PricingPlans from '@/components/home/PricingPlans'
import { Loader2 } from 'lucide-react'

const page = () => {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center py-20">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    }>
      <PricingPlans />
    </Suspense>
  )
}

export default page