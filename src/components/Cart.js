const Cart = ({ items, onUpdateQuantity, onClearCart }) => {
  const cartList = Object.values(items);

  const subtotal = cartList.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const delivery = cartList.length > 0 ? 3.5 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + delivery + tax;

  return (
    <aside className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Your Cart</h2>
        <button
          type="button"
          onClick={onClearCart}
          className="text-xs uppercase tracking-[0.2em] text-amber-300/80 transition hover:text-amber-200"
        >
          Clear
        </button>
      </div>

      {cartList.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 p-6 text-center text-sm text-slate-400">
          Your cart is empty. Add a dish to get started.
        </div>
      ) : (
        <div className="space-y-4">
          {cartList.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-3 rounded-2xl border border-white/5 bg-slate-900/60 p-3"
            >
              <div className="flex items-center gap-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-14 w-14 rounded-xl object-cover"
                />
                <div>
                  <p className="text-sm font-semibold">{item.name}</p>
                  <p className="text-xs text-slate-400">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                  className="h-7 w-7 rounded-full border border-white/10 text-sm text-slate-200 hover:border-amber-300"
                >
                  -
                </button>
                <span className="text-sm font-semibold">{item.quantity}</span>
                <button
                  type="button"
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  className="h-7 w-7 rounded-full border border-white/10 text-sm text-slate-200 hover:border-amber-300"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 space-y-3 border-t border-white/10 pt-4 text-sm">
        <div className="flex items-center justify-between text-slate-400">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between text-slate-400">
          <span>Delivery</span>
          <span>${delivery.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between text-slate-400">
          <span>Tax (8%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between text-base font-semibold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <button
        type="button"
        className="mt-5 w-full rounded-full bg-amber-300 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-200"
      >
        Checkout
      </button>
    </aside>
  );
};

export default Cart;
