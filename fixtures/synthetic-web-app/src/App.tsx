import { CheckoutSummary } from "./components/CheckoutSummary.js";
import { RecoveryPanel } from "./components/RecoveryPanel.js";

export function App() {
  return (
    <main>
      <header>
        <p>Unlock a seamless experience that empowers your journey.</p>
        <h1>The smartest way to buy anything.</h1>
      </header>
      <nav aria-label="Main navigation">
        <a href="/workspaces">Workspace</a>
        <a href="/checkout">Checkout</a>
      </nav>
      <CheckoutSummary />
      <RecoveryPanel />
    </main>
  );
}
