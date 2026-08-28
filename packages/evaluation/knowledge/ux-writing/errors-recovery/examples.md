---
topic: errors-uncertainty-recovery-remedy
status: proposal-only
implementation_authority: none
example_ownership: original-synthetic
source_lineage:
  - ux-writing-cross-book-synthesis-2026-08-26.md#convergent-competency-map-6
  - ux-writing-cross-book-synthesis-2026-08-26.md#mandatory-abstention-or-escalation
---

# Errors, Uncertainty, Recovery, and Remedy Examples

All names, scenarios, values, and interface text below are original synthetic material. They illustrate reasoning patterns, not approved production copy.

## Unknown transaction outcome: unsafe retry

**Context:** A bank transfer request timed out after submission. The ledger has not confirmed whether the transfer posted, and another submission could send money twice.

**Bad**

> Transfer failed. Try again.

**Why it fails**

- “Failed” invents a state.
- Retry could duplicate the transfer.
- There is no reconciliation path or timing.

**Safer candidate**

> We can’t confirm this transfer yet. Don’t send it again while we check, or you could send the money twice.
>
> Check transfer status

**Required product contract:** `Check transfer status` must query an authoritative status source. The experience still needs verified timing and a support route if the result remains unknown.

## Known failed payment: safe retry

**Context:** The payment processor authoritatively rejected the attempt before creating a charge. A new attempt cannot duplicate the rejected charge.

**Bad**

> Something went wrong.

**Why it fails:** The state and available action are hidden even though both are known.

**Better candidate**

> Your card wasn’t charged. The payment was declined before it completed.
>
> Try another payment method

**Why it works:** It distinguishes the non-charge from the declined attempt and offers an action whose effect is predictable.

## Partial document submission

**Context:** Three files were uploaded; the form record was not submitted. The uploaded files remain attached for 24 hours.

**Bad**

> Submission unsuccessful. Start over.

**Better candidate**

> Your form wasn’t submitted. Your three files are saved here until 3:40 PM tomorrow.
>
> Review and submit form

**Why it works:** It separates completed and incomplete effects, preserves prior effort, gives a verified expiry, and directs recovery.

## Permission changed during editing

**Context:** A collaborator removed edit permission while another person was drafting. The draft is retained locally and can be copied.

**Bad**

> You don’t have permission. Contact your admin.

**Better candidate**

> Your access changed, so you can’t save edits to this project. Your draft is still on this device.
>
> Copy draft
>
> Request edit access

**Why it works:** It avoids blame, names the consequence, confirms preserved work, and offers two distinct recovery routes.

## Eligibility denial with remedy

**Context:** An approved policy source provides the deciding criterion and an appeal route. A specialist has reviewed the language.

**Bad**

> Unfortunately, you don’t qualify. We know this is disappointing.

**Better candidate**

> Your application was denied because the verified residency date is after the program cutoff.
>
> Review the residency date
>
> Appeal this decision

**Why it works:** Evidence and options replace emotional inference. The message is usable only while the policy, record, and appeal route remain authoritative.

## Service outage with bounded timing

**Context:** The service owner has confirmed an outage and the next status-update time, but not a restoration time.

**Bad**

> We’ll be back soon. Thanks for your patience!

**Better candidate**

> Export is unavailable during a service outage. Your saved reports are not affected. We’ll post another update by 18:00 UTC.
>
> View service status

**Why it works:** It avoids false restoration certainty, distinguishes affected from preserved data, and gives a concrete status route.

## Generated result with insufficient evidence

**Context:** A generated answer cites two records that disagree, and no source has precedence.

**Bad**

> The request was approved on 12 May.

**Safer candidate**

> I can’t determine the approval date because the two records disagree.
>
> Compare source records
>
> Send to a reviewer

**Why it works:** It preserves uncertainty, identifies the conflict, and offers inspection and human resolution rather than fabricating certainty.

## Tone cannot replace remedy

**Context:** A delivery was damaged, but the interface offers no replacement, refund, claim, or support action.

**Polished but incomplete**

> We’re truly sorry your delivery arrived damaged. This isn’t the experience we wanted for you.

**Correct evaluation:** `fail`. Rewrite cannot fix the missing product remedy. Escalate to the accountable service owner to define the available correction path before drafting decision-ready content.
