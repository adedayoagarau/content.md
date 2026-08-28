# Actions, Consequences, Agency, and Consent Examples

All examples are original synthetic scenarios. They demonstrate evaluation patterns, not approved product copy or universal legal requirements.

## 1. Recurring Contribution

**Supplied facts:** The action starts a $12 monthly contribution today; cancellation is available in settings; no refund after each charge.

### Failing candidate

```text
Support the project
[Continue]
```

**Findings:** AC-02 and AC-03 fail. The recurring charge, timing, and non-refund consequence are absent; the control does not name the commitment.

### Structurally sufficient candidate

```text
Contribute $12 each month
Your first contribution is charged today. Cancel future contributions in Settings. Charges already made are not refunded.
[Start monthly contribution]
```

**Why:** It preserves amount, recurrence, timing, cancellation scope, and control effect. A specialist must still approve any required financial disclosure.

## 2. Optional Usage Data

**Supplied facts:** Product analytics and personalized recommendations are separate optional purposes; core service works without either.

### Failing candidate

```text
Help us improve your experience
[Accept all] [Maybe later]
```

**Findings:** AC-05 and AC-06 fail. Purposes are bundled, refusal is ambiguous, and the effect of declining is hidden.

### Structurally sufficient candidate

```text
Choose optional data uses
[ ] Share usage events to help us find product problems
[ ] Use activity history to personalize recommendations
You can use the core service without either option and change these choices in Privacy settings.
[Save choices] [Decline optional uses]
```

**Why:** Purposes and choices remain separate, refusal is explicit, and ongoing control is identified. Privacy and legal specialists determine whether the content and mechanism are valid.

## 3. Deleting a Shared Workspace

**Supplied facts:** Only an owner may delete; deletion removes access for 18 members after 7 days; owner can undo during that period.

### Failing candidate

```text
Delete this workspace?
This cannot be undone.
[Delete] [Cancel]
```

**Findings:** It contradicts reversibility, omits affected parties and timing, and does not identify the object precisely.

### Structurally sufficient candidate

```text
Schedule “Northwind planning” for deletion?
Its 18 members will lose access in 7 days. Until then, a workspace owner can cancel deletion.
[Schedule workspace deletion] [Keep workspace]
```

**Why:** Actor authority, named object, affected parties, delay, and recovery match the supplied state.

## 4. Transaction Outcome Unknown

**Supplied facts:** The payment provider timed out after submission; the system cannot yet determine whether the bank accepted the charge; status normally resolves within 10 minutes.

### Failing candidate

```text
Payment failed. Try again.
[Pay again]
```

**Findings:** AC-10 fails. It invents failure and creates duplicate-charge risk.

### Safe abstaining response

```text
We don't know yet whether your payment went through.
Check this order again in 10 minutes. Don't submit another payment while the status is pending.
[Check payment status]
```

**Why:** It states the uncertainty, avoids unsafe retry, and provides the evidenced next action.

## 5. Notification Permission

**Supplied facts:** Alerts are optional; quiet hours and per-category controls exist; denial does not block account access.

### Failing candidate

```text
Stay in the loop!
Don't miss what everyone else knows.
[Turn on alerts] [Not now]
```

**Findings:** The text uses social pressure, does not explain alert purpose, and obscures durable refusal and control.

### Better contextual candidate

```text
Choose which account alerts you receive

You can turn categories on or off, set quiet hours, or continue without alerts.

[Choose alerts] [Continue without alerts]
```

**Why:** It presents a truthful choice and ongoing control without making enablement the assumed benefit.

## 6. Delegate Submits for Another Person

**Supplied facts:** A registered delegate may submit an address change for the account holder; submission is reviewed rather than immediately applied.

### Failing candidate

```text
Your address has been updated.
```

**Findings:** AC-09 and AC-10 fail. “Your” collapses delegate and subject; submitted is not approved or applied.

### Structurally sufficient candidate

```text
Address change submitted for Mina Okafor

We’ll notify you when the account review is complete. The current address remains active until approval.
```

**Why:** It distinguishes the subject and preserves the actual transition state.

## 7. Cancellation With a Retention Offer

**Supplied facts:** Cancellation is available immediately; pausing is optional and does not change the right to cancel.

### Failing candidate

```text
Are you sure you want to lose everything?
[Pause instead] [I don't care, cancel]
```

**Findings:** Refusal is shaming, cancellation is visually and linguistically obstructed, and “lose everything” is an unsupported consequence.

### Structurally sufficient candidate

```text
Choose what happens to your subscription

[Cancel subscription] [Pause for one month] [Keep subscription]
```

**Why:** Distinct options remain direct. Any consequences of cancellation must be added from authoritative account and retention evidence.

## 8. Material Unknown Requires No Draft

**Request:** Write a confirmation for sharing a medical record with “the care team.”

**Missing facts:** Recipients, record scope, duration, revocation behavior, delegate authority, and governing consent requirements.

### Required evaluator result

```yaml
status: unknown
reason_codes: [AC-01, AC-03, AC-05, AC-09, AC-12]
disposition: abstain_and_escalate
needed_evidence:
  - named recipients and roles
  - exact records and time range
  - sharing duration and revocation effect
  - subject and acting authority
  - approved clinical, privacy, accessibility, and locale requirements
```

**Why:** Plausible copy would conceal missing decisions. The correct output is an evidence request, not a polished candidate.

## Lineage

Patterns were synthesized from **Preserve real agency**, **Make claims, actors, and responsibility explicit**, **Design the whole temporal interaction**, **Treat error and recovery as product behavior**, the contradiction rows on persuasion and choice reduction, and **Mandatory abstention or escalation**. No book examples or prose were copied.
