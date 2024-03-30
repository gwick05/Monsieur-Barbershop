import ShopItem from './ShopItem';

function ShopList({ shop }) {
  return (
    <ul className="grid w-11/12 grid-cols-4 justify-items-center gap-8">
      {shop.map((item) => (
        <ShopItem item={item} key={item.id} />
      ))}
    </ul>
  );
}

export default ShopList;
