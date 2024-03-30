import { getShop } from '../services/apiShop';
import { useQuery } from '@tanstack/react-query';
import { useFilteredAndSortedData } from '../hooks/useFilterData';
import { usePagination } from '../hooks/usePagination';
import SearchByField from '../ui/SearchByField';
import PageHeader from '../ui/PageHeader';
import ShopList from '../features/shop/ShopList';
import Spinner from '../ui/Spinner';
import Error from '../ui/Error';
import Filter from '../ui/Filter';
import Sort from '../ui/Sort';
import Pagination from '../ui/Pagination';
import { filterFn, sortSwitchFn } from '../features/shop/shopFilterNSort';
import { PAGE_SIZE } from '../utils/constants';
import SearchFilterSortSection from '../ui/SearchFilterSortSection';

function Shop() {
  const {
    data: shop = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ['shop'],
    queryFn: getShop,
  });

  const filteredShop = useFilteredAndSortedData({
    data: [...shop],
    sortSwitchFn: sortSwitchFn,
    filterBy: 'offerta',
    filterFn: filterFn,
    searchByKey: 'name',
  });

  const {
    currPage,
    maxPage,
    next,
    prev,
    paginatedArray: paginatedFilteredShop,
  } = usePagination({
    length: filteredShop.length,
    nItemsOnPage: PAGE_SIZE,
    arrayToPaginate: filteredShop,
  });

  if (isLoading) {
    return <Spinner />;
  } else if (error) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center">
        <Error error={error.message} />
      </div>
    );
  } else {
    return (
      <div className="w-full">
        <PageHeader>I nostri attuali prodotti</PageHeader>
        <SearchFilterSortSection>
          <SearchByField />
          <div className="flex h-full items-center gap-8">
            <Filter
              options={[
                { filter: 'in-offerta', option: 'In offerta' },
                { filter: 'non-offerta', option: 'Non in offerta' },
              ]}
              filterBy={'offerta'}
            />
            <Sort
              options={[
                { value: 'recenti', label: 'data-piu recenti prima' },
                { value: 'meno-recenti', label: 'data-meno recenti prima' },
                { value: 'piu-costosi', label: 'prezzo-piu costosi prima' },
                { value: 'meno-costosi', label: 'prezzo-meno costosi prima' },
              ]}
            />
          </div>
        </SearchFilterSortSection>

        <div className="flex w-full flex-col items-center py-8">
          <ShopList shop={paginatedFilteredShop} />
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

export default Shop;
