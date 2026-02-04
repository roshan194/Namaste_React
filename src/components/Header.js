const Header = ({ query, onQueryChange, cartCount }) => {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-5 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 via-orange-400 to-rose-500 text-slate-950">
            <span className="text-xl font-bold">FE</span>
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-amber-300/80">
              Flavor Express
            </p>
            <h1 className="text-xl font-semibold">Food Menu & Cart</h1>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-3 md:flex-row md:items-center md:justify-end">
          <div className="relative w-full md:max-w-md">
            <input
              type="text"
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              placeholder="Search dishes like ramen, taco, curry..."
              className="w-full rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-slate-100 placeholder:text-slate-400 focus:border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-300/30"
            />
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-amber-300/80">
              Enter
            </span>
          </div>
          <div className="flex items-center justify-between gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm md:w-auto">
            <span className="text-slate-300">Cart</span>
            <span className="rounded-full bg-amber-300 px-2 py-1 text-xs font-semibold text-slate-950">
              {cartCount} items
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
  
