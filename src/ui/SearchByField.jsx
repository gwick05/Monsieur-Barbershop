import { useSearchParams } from 'react-router-dom';

function SearchByField() {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleSearch(searchBy) {
    searchParams.set('searchBy', searchBy);
    setSearchParams(searchParams);
  }

  return (
    <div className="flex h-full items-center  px-2 py-1 ">
      <input
        placeholder="Cerca..."
        className="h-full w-56 rounded-md border-2 px-2 hover:border-neutral-700 hover:placeholder-neutral-700 focus:border-neutral-700 focus:placeholder-neutral-700 focus:outline-none"
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
}

export default SearchByField;
