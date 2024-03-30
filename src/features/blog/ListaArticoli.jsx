import BlogPostPreview from './BlogPostPreview';

function ListaArticoli({ paginatedFilteredPosts }) {
  return (
    <ul className="grid w-11/12 grid-cols-3 justify-items-center gap-6">
      {paginatedFilteredPosts.map((post) => (
        <BlogPostPreview post={post} key={post.id} />
      ))}
    </ul>
  );
}

export default ListaArticoli;
