

const PageHeader = ({ title }: { title: string }) => {
  return (
    <section className='bg-primary py-16'>
      <div className="container">
        <h1 className="title-2 text-primary-foreground text-center">{title}</h1>
      </div>
    </section>
  )
}

export default PageHeader