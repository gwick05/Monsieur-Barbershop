import { useSearchParams } from 'react-router-dom';
import uuid from 'react-uuid';
function Filter({ options, filterBy }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterBy);

  function onClick(id) {
    searchParams.set(filterBy, id);
    setSearchParams(searchParams);
  }

  return (
    <div className="flex h-full items-center gap-2 rounded-md border-2 border-neutral-500 border-opacity-10 bg-neutral-300  px-2 shadow-lg dark:border-opacity-20  dark:bg-neutral-700">
      {options.map((option) => (
        <button
          key={uuid()}
          onClick={() => onClick(option.filter)}
          className={`h-4/5 rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-600 ${option.filter == currentFilter ? 'bg-neutral-200 dark:bg-neutral-600' : ''}`}
        >
          <span className="px-2"> {option.option}</span>
        </button>
      ))}
      <button
        key={uuid()}
        onClick={() => onClick('')}
        className={`h-4/5 rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-600 ${!currentFilter ? 'bg-neutral-200  dark:bg-neutral-600' : ''}`}
      >
        <span className="px-2">Tutti</span>
      </button>
    </div>
  );
}

export default Filter;
