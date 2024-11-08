import Link from 'next/link'
import { notFound } from 'next/navigation';
import { db } from '@/db';

interface SnippetShowPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function SnippetShowPage(props: SnippetShowPageProps) {
  // await new Promise((r) => setTimeout(r, 2000))

  const { id } = await props.params;
  const snippet = await db.snippet.findFirst({
    where: { id: parseInt(id) },
  });

  if (!snippet) {
    return notFound();
  }

  return <div>
    <div className='flex m-4 justify-between items-center'>
      <h1 className='text-xl font-bold'>{snippet.title}</h1>
      <div className='flex gap-1'>
        <Link href={`/snippets/${snippet.id}/edit`} className='p-2 border rounded bg-blue-500 text-white'>Edit</Link>
        <Link href={`/snippets/${snippet.id}/delete`}className='p-2 border rounded bg-red-500 text-white'>Delete</Link>
      </div>
    </div>
    <pre className='p-3 border rounded bg-gray-200 border-gray-200'>
      <code>{snippet.code}</code>
    </pre>
    </div>
}



