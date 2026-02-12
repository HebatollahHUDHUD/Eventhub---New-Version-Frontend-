import { cn } from "@/lib/utils"


const PageHeader = ({ title, className }: { title: string, className?: string }) => {
  return (
    <section className={cn('bg-primary py-16', className)}>
      <div className="container">
        <h1 className="title-2 text-primary-foreground text-center">{title}</h1>
      </div>
    </section>
  )
}

export default PageHeader