import { Link, useParams } from 'react-router-dom';
import { useRawPosts } from './useRawPosts';
import PageHeader from '../../ui/PageHeader';
import Spinner from '../../ui/Spinner';
import Error from '../../ui/Error';
import Button from '../../ui/Button';

function Post() {
  const { id: selectedPost } = useParams();
  const { posts = [], isLoading, error } = useRawPosts();
  const [post] = posts.filter((post) => post.id === +selectedPost);

  if (isLoading) {
    return <Spinner />;
  } else if (error || !post) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center">
        <Error error="Impossibile caricare l'articolo, oppure l'articolo non esiste" />
      </div>
    );
  } else {
    return (
      <div className="flex w-full flex-col  gap-2  py-6">
        <PageHeader> {post.titolo}</PageHeader>
        <div className="flex w-full flex-col items-center ">
          <div className="flex w-4/5 flex-col gap-2 divide-y-2 divide-neutral-200 divide-opacity-50 dark:divide-neutral-800 dark:divide-opacity-10">
            <p className=" font-semibold">{post.introduzione}</p>
            <p className=" font-semibold">{post.content}</p>
            <p className=" font-semibold">{post.conclusioni}</p>
            <div className="flex items-center justify-between py-2">
              <Link to="/blog">
                <Button type="secondary">Indietro</Button>
              </Link>
              <h2 className="font-bold">{post.autore}</h2>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Post;
