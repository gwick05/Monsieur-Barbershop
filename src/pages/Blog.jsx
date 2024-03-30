import { usePosts } from '../features/blog/usePosts';
import { usePagination } from '../hooks/usePagination';
import Sort from '../ui/Sort';
import Spinner from '../ui/Spinner';
import Error from '../ui/Error';
import Filter from '../ui/Filter';
import SearchByField from '../ui/SearchByField';
import Pagination from '../ui/Pagination';
import ListaArticoli from '../features/blog/ListaArticoli';
import PageHeader from '../ui/PageHeader';
import SearchFilterSortSection from '../ui/SearchFilterSortSection';

function Blog() {
  const {
    posts,
    isLoading: postsLoading,
    error: errorPosts,
    autori,
  } = usePosts();

  const {
    currPage,
    maxPage,
    next,
    prev,
    paginatedArray: paginatedFilteredPosts,
  } = usePagination({
    length: posts.length,
    nItemsOnPage: 6,
    arrayToPaginate: posts,
  });

  if (postsLoading) {
    return <Spinner />;
  } else if (errorPosts) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center">
        <Error error={errorPosts.message} />
      </div>
    );
  } else {
    return (
      <div className="w-full">
        <PageHeader>BLOG</PageHeader>

        <SearchFilterSortSection>
          <SearchByField />
          <div className="flex h-full items-center gap-4">
            <>
              <span>Filtra in base all autore</span>
              <Filter
                options={autori?.map((autore) => {
                  return {
                    filter: autore.id,
                    option: autore.nome + ' ' + autore.cognome,
                  };
                })}
                filterBy={'filterAuthors'}
              />
            </>

            <Sort
              options={[
                { value: 'recenti', label: "articoli piu' recenti" },
                { value: 'meno-recenti', label: 'articoli meno recenti' },
              ]}
            />
          </div>
        </SearchFilterSortSection>

        <div className="flex w-full flex-col items-center py-8">
          <ListaArticoli paginatedFilteredPosts={paginatedFilteredPosts} />
        </div>

        <Pagination
          maxPage={maxPage}
          currPage={currPage}
          onNext={next}
          onPrev={prev}
        />
      </div>
    );
  }
}

export default Blog;
