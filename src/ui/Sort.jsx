import { useSearchParams } from 'react-router-dom';

function Sort({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get('sortBy') || '';

  function onSearchBy(by) {
    searchParams.set('sortBy', by);
    setSearchParams(searchParams);
  }

  //Recieves an array of options, each option has a label and a value.
  return (
    <select
      className="h-full rounded-md border-2 border-neutral-500 border-opacity-10 bg-neutral-300 shadow-lg dark:border-opacity-20 dark:bg-neutral-700"
      value={sortBy}
      onChange={(e) => {
        onSearchBy(e.target.value);
      }}
    >
      <option disabled value={''} className="text-center">
        Ordina
      </option>
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          className="text-center text-base"
        >
          Ordina per: ({option.label})
        </option>
      ))}
    </select>
  );
}

export default Sort;
