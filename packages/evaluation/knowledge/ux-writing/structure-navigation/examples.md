---
topic: structure-navigation
status: proposal-only
implementation_authority: none
example_ownership: original-synthetic
source_lineage:
  - ux-writing-cross-book-synthesis-2026-08-26.md#contextual-heuristics
  - ux-writing-cross-book-synthesis-2026-08-26.md#competency-and-method-map
  - ux-writing-cross-book-synthesis-2026-08-26.md#evaluation-and-escalation-criteria
---

# Structure and Navigation Examples

All scenarios, labels, names, values, and structures are original synthetic material. They illustrate review reasoning and are not approved production copy.

## Predictive link destination

**Context:** A household energy account offers a page that explains the winter discount rules.

**Bad**

> To find out whether the discount applies, [click here].

**Better**

> [Check winter discount eligibility]

**Why it works:** The label names the destination's task. It remains valid only if the destination actually determines or explains eligibility rather than starting an unrelated application.

## Same label, different destinations

**Bad navigation**

- View details → invoice record
- View details → delivery tracking
- View details → cancellation policy

**Better navigation**

- View invoice
- Track delivery
- Read cancellation policy

**Why it works:** The labels distinguish destinations when read or announced outside surrounding card context.

## Material detail hidden by disclosure

**Context:** Selecting same-day payout adds a non-refundable 2.5% fee.

**Bad**

> Same-day payout
>
> Details ▸
>
> Continue

The fee appears only after opening `Details` and after the payout is confirmed.

**Better**

> Same-day payout — 2.5% non-refundable fee
>
> How the fee is calculated ▸
>
> Continue with same-day payout

**Why it works:** The commitment-changing fact remains in the decision path; secondary explanation is disclosed progressively.

## Task-first hierarchy

**Before**

```text
Account Operations
  General Information
  Service Actions
  Additional Resources
```

**After**

```text
Move your water service
  Before you start
  Choose the final service date
  Confirm the forwarding address
  What happens to your deposit
  Get help moving service
```

**Why it works:** The hierarchy follows the task and exposes prerequisite, steps, consequence, and support. User research must still establish that these labels match intended people's questions.

## Steps as an ordered list

**Bad**

> Verify your identity, choose a pickup location, and then bring the confirmation code when the order is ready.

**Better**

> 1. Verify your identity.
> 2. Choose a pickup location.
> 3. Wait for the ready notice.
> 4. Bring the confirmation code to pickup.

**Why it works:** The sequence and dependency are explicit. The fourth step does not appear before the system has established readiness.

## Comparison as a table

**Context:** People need to compare two archival plans across the same attributes.

| Plan | Retrieval time | Storage region | Early deletion fee |
|---|---|---|---|
| Standard archive | Up to 12 hours | Canada | None |
| Deep archive | Up to 48 hours | Canada | Applies before day 90 |

**Why it works:** Stable row and column relationships support comparison. The rendered implementation still requires specialist review for header association, small screens, zoom/reflow, and nonvisual reading order.

## A list is better than a table

**Context:** Three independent documents are required; there is no cross-column comparison.

**Poor fit**

| Required item |
|---|
| Current photo ID |
| Proof of address |
| Signed consent form |

**Better fit**

- Current photo ID
- Proof of address
- Signed consent form

**Why it works:** A simple set does not need tabular relationships.

## Multi-step orientation and resumption

**Bad**

> Almost done

**Better**

> Step 3 of 5: Review authorized contacts
>
> Your changes are saved. You can return before 30 September.

**Why it works:** It uses authoritative step and persistence data. “Almost done” alone gives neither scope nor a verified resumption contract.

## Option compression that removes agency

**Context:** A notification preference page supports pause, channel-specific settings, and full opt-out.

**Bad menu**

- Keep all notifications
- Choose fewer notifications

**Better structure**

- Choose notification channels
- Pause notifications
- Turn off optional notifications

**Why it works:** The route structure preserves the governed option set rather than steering the person toward continued participation.

## Localization parity failure

**Context:** The source-locale cancellation page contains `Cancel subscription` and `Appeal final charge`; the target locale includes only the cancellation route.

**Correct evaluation:** `fail`, not “translation complete.” Material remedy parity is missing. A locale specialist must resolve the expression, and the product must supply the missing route before approval.
