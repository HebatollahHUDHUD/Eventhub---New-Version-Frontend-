import { Suspense } from 'react'
import TalentContent from './components/TalentContent'

const page = () => {
  return (
    <div>
      <div className=""></div>
      <Suspense fallback={<div>Loading...</div>}>
        <TalentContent />
      </Suspense>
    </div>
  )
}

export default page