import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/helpers/formatDate';

function BlogPostPreview({ post }) {
  return (
    <li>
      <Link
        to={`${post.id}`}
        className="grid h-60 w-80 grid-cols-2 grid-rows-6  content-around  rounded-lg border-2  border-neutral-500 border-opacity-10 bg-neutral-300 px-1 py-1 transition-transform  duration-200 hover:scale-110 dark:border-opacity-20 dark:bg-neutral-700"
      >
        <h3 className="col-start-1 col-end-3 row-start-1 row-end-3  content-center overflow-auto text-xl font-semibold">
          {post.titolo}
        </h3>
        <p className="col-start-1 col-end-3 row-start-3 row-end-6 overflow-auto whitespace-pre-line text-pretty break-words px-1 py-1">
          {post.introduzione}
        </p>
        <span className="col-start-1 col-end-1 row-start-6 row-end-6 content-end font-semibold">
          {formatDate(new Date(post.created_at))}
        </span>
        <span className="col-start-2 col-end-2 row-start-6 row-end-6 place-self-end font-semibold">
          {post.autore}
        </span>
      </Link>
    </li>
  );
}

export default BlogPostPreview;
