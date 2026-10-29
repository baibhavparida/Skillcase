import { useEffect, useState } from "react";
import { learnerCartUrl, phone } from "../../data/startNow.js";

// Paying for one program straight from its card (the cart and the Learner
// Stories page's programs): the Worker asks the learner API for a Razorpay
// payment link (/api/cart/checkout) and the page goes there. `paying` and
// `failed` hold the id of the program in progress, or the one that failed,
// so only that card changes.
export function useCheckout() {
  const [paying, setPaying] = useState(null);
  const [failed, setFailed] = useState(null);

  // Back from Razorpay, the page can come back from the cache mid-"Opening".
  useEffect(() => {
    const onShow = (event) => event.persisted && setPaying(null);
    window.addEventListener("pageshow", onShow);
    return () => window.removeEventListener("pageshow", onShow);
  }, []);

  const pay = async (id) => {
    if (paying) return;
    setPaying(id);
    setFailed(null);
    try {
      const response = await fetch("/api/cart/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blockIds: [id] }),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok || !data?.checkoutUrl) throw new Error(data?.error || "Checkout failed");
      window.location.href = data.checkoutUrl;
    } catch {
      setFailed(id);
      setPaying(null);
    }
  };

  return { pay, paying, failed };
}

export function PayError() {
  return (
    <p className="cx-error" role="alert">
      The payment page didn’t open. Please try again, call us on <a href={phone.href}>{phone.label}</a>, or{" "}
      <a href={learnerCartUrl}>pay on our learner site</a>.
    </p>
  );
}
