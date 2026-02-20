import GalleryThumbnail from '@/components/common/GalleryThumbnail';
import { Button } from '@/components/ui/button';
import { getData } from '@/lib/request-server';
import { CalendarIcon } from 'lucide-react';
import Link from 'next/link';

const page = async ({ params }: { params: { id: string, portfolioId: string } }) => {
  const { id, portfolioId } = await params;

  const data = await getData<any>({
    endpoint: `/users/${id}/projects/${portfolioId}`
  });

  const project = data.status === "success" ? data.result?.project : null;

  return (
    <div className='space-y-6'>
      <div className="space-y-2">
        <Button variant={"link"} asChild className='px-0 h-fit'>
          <Link href={`/talent/${id}`}>
            Back to Candidate Details
          </Link>
        </Button>

        <h2 className='title-3'>{project?.title?.en || project?.title}</h2>
        <div className='flex items-center gap-2 text-muted-foreground'>
          <CalendarIcon size={16} />

          <p className='text-sm '>{project?.date}</p>
        </div>
      </div>

      <GalleryThumbnail
        items={project?.attachments?.map((attachment: any) => ({
          id: attachment.id,
          src: attachment.file_path,
          alt: attachment.file_name,
        }))}
      />

      <div className="space-y-2">
        <h2 className='title-4'>Description</h2>
        <div className='description whitespace-pre-line'>{project?.description?.en || project?.description}</div>
      </div>

    </div>
  )
}

export default page