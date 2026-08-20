export function CheckoutSummary() {
  return (
    <section aria-labelledby="summary-title">
      <h2 id="summary-title">Review your order</h2>
      <p>Your bag has 2 items.</p>
      <button type="button" aria-label="Action">
        ×
      </button>
      <button type="button">Delete workspace</button>
    </section>
  );
}
