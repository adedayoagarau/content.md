# Context, Actors, Evidence, and Product-State Examples

Original synthetic examples for UX-content review. They illustrate reasoning patterns, not production-approved copy.

## 1. Unknown Payment Outcome

**Known context**: The payment provider timed out after submission. The product has no final transaction state and cannot prove retry safety.

### Bad

> Payment failed. Try again.

**Problems**:
- Invents a terminal failure state.
- Recommends an action that could duplicate a charge.

### Grounded repair

> We can’t confirm whether your payment went through. Check your payment history before trying again.

**Why it is better**:
- Preserves `outcome_unknown`.
- Gives only a next step supported by the stated context.

**Review boundary**: Product authority must verify that payment history is current and that this route is actually available.

## 2. Delegated Account Change

**Known context**: A benefits caseworker is signed in as a delegate. Only the account holder can change the mailing address.

### Bad

> Update your address

**Problems**:
- “Your” can refer to the caseworker or account holder.
- Implies the current actor has permission.

### Grounded repair

> Ask the account holder to update their mailing address.

**Why it is better**:
- Names the authorized actor and object.
- Does not imply an unavailable transition.

**Review boundary**: Policy authority must confirm the permission model and whether an alternate delegated process exists.

## 3. Scheduled Deletion

**Known context**: Selecting the control schedules one workspace for deletion in 30 days. An owner can cancel during that period. Members lose access immediately.

### Bad

> Delete it

**Problems**:
- Object and actor are unresolved.
- Hides immediate access loss and delayed deletion.

### Grounded repair

> Schedule workspace deletion

Supporting content:

> Members will lose access now. A workspace owner can cancel deletion for 30 days.

**Why it is better**:
- Separates the immediate and terminal states.
- Identifies the recovery actor and window.

**Review boundary**: Product tests must verify timing, access behavior, and cancellation authority.

## 4. Generated Eligibility Summary

**Known context**: A model summarizes uploaded documents but does not decide eligibility. A program reviewer makes the decision.

### Bad

> We approved your application.

**Problems**:
- Misidentifies the decision maker.
- Converts a generated summary into authoritative state.

### Grounded repair

> Draft summary ready for program review

Supporting content:

> A program reviewer will use your documents and the application record to make the eligibility decision.

**Why it is better**:
- States the actual generated artifact and next actor.
- Avoids laundering model output into a decision.

**Review boundary**: Domain authority must validate the decision process and disclosure requirements.

## 5. Shared Household Device

**Known context**: A speaker recognizes the device, not the individual asking. Two household members have saved medication reminders.

### Bad

> Your medication is ready, Amina.

**Problems**:
- Infers identity from a shared device.
- Exposes sensitive information without verified recipient evidence.

### Grounded repair

> I can’t tell who is asking. Open your private reminders to continue.

**Why it is better**:
- Preserves the identity uncertainty.
- Avoids selecting a subject or revealing the reminder.

**Review boundary**: Privacy, accessibility, and product specialists must approve the identity and private-access flow.

## 6. Evidence-Laundered Delivery Claim

**Known context**: An old interface string says “Delivered,” but the current event source records only `handed_to_carrier`.

### Bad

> Delivered today

**Problems**:
- Treats previous copy as proof.
- Contradicts the current event source.

### Grounded repair

> Handed to the carrier today

**Why it is better**:
- Expresses the supported event without inventing final delivery.

**Review boundary**: Product authority must approve the event-to-language mapping and timestamp semantics.

## Repair Walkthrough

### Before

> We’ve taken care of it. You’re all set.

### Evidence questions

1. Who does “we” identify: platform operator, service provider, or human reviewer?
2. What object or request is “it”?
3. Which authoritative state supports completion?
4. Did the action affect another party or create a commitment?
5. Is there a receipt, correction route, or recovery owner?

### After, if evidence proves submission but not completion

> Your request was submitted to North County Services. They’ll review it by 4 September. You can correct the request before review begins.

### Changes made

- Replaced unresolved actors and objects with named entities.
- Changed completion to the supported submitted state.
- Added evidence-backed timing and correction path.

## Internal Lineage

- Cross-book synthesis: temporal interaction; claims, actors, and responsibility; evidence-strength hard constraints.
- Competency map: Semantic modeling and Interaction writing.
- All scenarios and wording above are newly authored synthetic material.
