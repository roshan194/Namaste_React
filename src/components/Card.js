const Card = ({ image, name, description, price, area, category, onAdd }) => {
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 transition hover:-translate-y-1 hover:border-amber-300/60">
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="h-48 w-full object-cover"
        />
        <div className="absolute left-4 top-4 rounded-full bg-slate-950/80 px-3 py-1 text-xs font-semibold text-amber-200">
          ${price.toFixed(2)}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
            {category || "Chef Special"} · {area || "Global"}
          </p>
        </div>
        <p className="text-sm text-slate-300">
          {description || "Freshly prepared with signature house flavors."}
        </p>
        <button
          type="button"
          onClick={onAdd}
          className="mt-auto rounded-full bg-amber-300 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-amber-200"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default Card;
