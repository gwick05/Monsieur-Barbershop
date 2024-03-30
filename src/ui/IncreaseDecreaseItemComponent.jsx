function IncreaseDecreaseItemComponent({
  onIncrease,
  onDecrease,
  quantity,
  shop = true,
  additionalCss,
}) {
  return (
    <div
      className={`flex items-center ${shop ? 'gap-2' : 'justify-center gap-4'} text-xl ${additionalCss}`}
    >
      <button
        className="hover:scale-125 hover:text-orange-400"
        onClick={onDecrease}
      >
        -
      </button>
      <span>{quantity}</span>
      <button
        className="hover:scale-125 hover:text-orange-400"
        onClick={onIncrease}
      >
        +
      </button>
    </div>
  );
}

export default IncreaseDecreaseItemComponent;
