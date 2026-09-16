# Authored content-design scenario catalog

This catalog contains 100 original synthetic English-only scenarios. Five have an unreviewed content.md candidate; 95 are frozen before generation. The public UX Content Collective article influences only the exercise structure.

| ID | Scenario | Domain | State | Risk | Surface | Pipeline stage |
| --- | --- | --- | --- | --- | --- | --- |
| 001 | [Interrupted application upload](./001-interrupted-application-upload/) | education_applications | interrupted_upload | medium | dialog | awaiting_external_review |
| 002 | [Subscription price change email](./002-subscription-price-change-email/) | payments_billing | change_notice | high | email | awaiting_external_review |
| 003 | [Optional photo permission](./003-optional-photo-permission/) | privacy_permissions | permission_choice | high | dialog | awaiting_external_review |
| 004 | [Sign-in email change confirmation](./004-sign-in-email-change-confirmation/) | account_security | security_confirmation | high | confirmation | awaiting_external_review |
| 005 | [Flight cancellation rebooking](./005-flight-cancellation-rebooking/) | travel_mobility | service_cancellation | high | status | awaiting_external_review |
| 006 | [Passkey unavailable after phone replacement](./006-passkey-unavailable-new-phone/) | account_security | blocked_recovery | high | dialog | awaiting_contentmd |
| 007 | [Suspicious sign-in confirmation](./007-suspicious-sign-in-check/) | account_security | verification_required | critical | email | awaiting_contentmd |
| 008 | [Requested username is reserved](./008-username-reserved/) | account_security | form_error | medium | inline | awaiting_contentmd |
| 009 | [Removing the owner of a shared profile](./009-shared-profile-owner-removal/) | account_security | destructive_confirmation | critical | dialog | awaiting_contentmd |
| 010 | [Recovery code used successfully](./010-recovery-code-consumed/) | account_security | success_with_follow_up | high | confirmation | awaiting_contentmd |
| 011 | [Possible duplicate card charge](./011-duplicate-card-charge-unknown/) | payments_billing | unknown_outcome | critical | status | awaiting_contentmd |
| 012 | [Bank transfer still pending](./012-bank-transfer-pending/) | payments_billing | pending | high | status | awaiting_contentmd |
| 013 | [Invoice autopay failed](./013-invoice-autopay-failed/) | payments_billing | recoverable_error | high | email | awaiting_contentmd |
| 014 | [Tip change after delivery](./014-tip-change-after-delivery/) | payments_billing | time_bounded_choice | medium | banner | awaiting_contentmd |
| 015 | [Free trial ending reminder](./015-trial-ending-reminder/) | payments_billing | change_notice | high | push | awaiting_contentmd |
| 016 | [Grocery substitution needs approval](./016-grocery-substitution-approval/) | commerce_delivery | time_bounded_choice | medium | push | awaiting_contentmd |
| 017 | [Package delivered to a locker](./017-package-delivered-locker/) | commerce_delivery | success_with_instructions | medium | sms | awaiting_contentmd |
| 018 | [Return window ending](./018-return-window-ending/) | commerce_delivery | deadline_notice | medium | email | awaiting_contentmd |
| 019 | [Part of an order was canceled](./019-partial-order-canceled/) | commerce_delivery | partial_success | high | status | awaiting_contentmd |
| 020 | [Marketplace seller refund issued](./020-seller-refund-issued/) | commerce_delivery | refund_pending | high | confirmation | awaiting_contentmd |
| 021 | [Train platform changed](./021-train-platform-change/) | travel_mobility | service_change | high | push | awaiting_contentmd |
| 022 | [Ride pickup point moved](./022-ride-pickup-moved/) | travel_mobility | location_change | medium | banner | awaiting_contentmd |
| 023 | [Hotel overbooking alternative](./023-hotel-overbooking-alternative/) | travel_mobility | material_choice | critical | email | awaiting_contentmd |
| 024 | [Reserved rental car unavailable](./024-rental-car-unavailable/) | travel_mobility | recoverable_error | high | dialog | awaiting_contentmd |
| 025 | [Travel document upload rejected](./025-visa-document-rejected/) | travel_mobility | form_error | high | inline | awaiting_contentmd |
| 026 | [Lab result delayed](./026-lab-result-delayed/) | health_wellbeing | pending | critical | status | awaiting_contentmd |
| 027 | [Clinic appointment moved](./027-appointment-moved/) | health_wellbeing | schedule_change | high | sms | awaiting_contentmd |
| 028 | [Medication refill requested too soon](./028-refill-too-soon/) | health_wellbeing | policy_block | critical | inline | awaiting_contentmd |
| 029 | [Fitness activity still syncing](./029-fitness-sync-pending/) | health_wellbeing | pending | low | banner | awaiting_contentmd |
| 030 | [Therapy session privacy reminder](./030-therapy-session-privacy/) | health_wellbeing | privacy_notice | high | dialog | awaiting_contentmd |
| 031 | [Course waitlist seat offered](./031-course-waitlist-seat/) | education_applications | time_bounded_choice | medium | email | awaiting_contentmd |
| 032 | [Assignment upload incomplete](./032-assignment-upload-incomplete/) | education_applications | interrupted_upload | high | dialog | awaiting_contentmd |
| 033 | [Exam accommodation confirmed](./033-exam-accommodation-confirmed/) | education_applications | success_with_details | high | confirmation | awaiting_contentmd |
| 034 | [Scholarship reference still missing](./034-scholarship-reference-missing/) | education_applications | blocked_dependency | high | status | awaiting_contentmd |
| 035 | [Parental consent required for a child account](./035-child-account-consent/) | education_applications | consent_required | critical | email | awaiting_contentmd |
| 036 | [Document edit conflict](./036-document-edit-conflict/) | work_collaboration | conflict | high | dialog | awaiting_contentmd |
| 037 | [Meeting recording was not saved](./037-meeting-recording-not-saved/) | work_collaboration | irrecoverable_failure | high | status | awaiting_contentmd |
| 038 | [Workspace access request denied](./038-workspace-access-denied/) | work_collaboration | permission_denied | medium | email | awaiting_contentmd |
| 039 | [Task reassigned with unfinished work](./039-task-reassigned/) | work_collaboration | ownership_change | medium | push | awaiting_contentmd |
| 040 | [Workspace export ready](./040-workspace-export-ready/) | work_collaboration | success_with_expiry | medium | email | awaiting_contentmd |
| 041 | [Downloaded episode expired](./041-episode-download-expired/) | media_subscriptions | content_unavailable | low | empty | awaiting_contentmd |
| 042 | [Subscription pause confirmation](./042-subscription-pause-confirmed/) | media_subscriptions | success_with_consequence | high | confirmation | awaiting_contentmd |
| 043 | [Parental controls PIN temporarily locked](./043-parental-pin-locked/) | media_subscriptions | temporary_lock | medium | dialog | awaiting_contentmd |
| 044 | [Saved video no longer available](./044-saved-video-removed/) | media_subscriptions | content_removed | low | empty | awaiting_contentmd |
| 045 | [Newsletter frequency change](./045-newsletter-frequency-change/) | media_subscriptions | preference_change | low | confirmation | awaiting_contentmd |
| 046 | [Power restoration estimate changed](./046-power-restoration-estimate/) | home_utilities | service_disruption | high | sms | awaiting_contentmd |
| 047 | [Smart lock battery critically low](./047-smart-lock-battery-critical/) | home_utilities | preventive_warning | high | push | awaiting_contentmd |
| 048 | [Home internet installation delayed](./048-internet-install-delayed/) | home_utilities | schedule_change | high | email | awaiting_contentmd |
| 049 | [Unusual water usage detected](./049-water-usage-spike/) | home_utilities | anomaly_alert | high | banner | awaiting_contentmd |
| 050 | [Appliance warranty ending](./050-appliance-warranty-ending/) | home_utilities | deadline_notice | low | email | awaiting_contentmd |
| 051 | [Parking permit application returned](./051-parking-permit-returned/) | government_civic | application_returned | medium | email | awaiting_contentmd |
| 052 | [Tax payment confirmation pending](./052-tax-payment-pending/) | government_civic | unknown_outcome | critical | status | awaiting_contentmd |
| 053 | [Library hold ready for pickup](./053-library-hold-ready/) | government_civic | success_with_deadline | low | push | awaiting_contentmd |
| 054 | [Voter registration address mismatch](./054-voter-address-mismatch/) | government_civic | verification_required | critical | form | awaiting_contentmd |
| 055 | [City service request closed without a fix](./055-service-request-closed/) | government_civic | closure_without_resolution | high | status | awaiting_contentmd |
| 056 | [Savings goal paused](./056-savings-goal-paused/) | banking_savings | success_with_consequence | medium | confirmation | awaiting_contentmd |
| 057 | [ATM cash not dispensed but debit pending](./057-atm-cash-not-dispensed/) | banking_savings | unknown_outcome | critical | status | awaiting_contentmd |
| 058 | [Direct deposit account changed](./058-direct-deposit-account-changed/) | banking_savings | security_confirmation | critical | email | awaiting_contentmd |
| 059 | [Overdraft alert threshold changed](./059-overdraft-alert-threshold/) | banking_savings | preference_change | medium | confirmation | awaiting_contentmd |
| 060 | [Card freeze confirmation](./060-card-freeze-confirmed/) | banking_savings | temporary_control | high | confirmation | awaiting_contentmd |
| 061 | [Insurance claim document unreadable](./061-claim-document-unreadable/) | insurance_claims | form_error | high | inline | awaiting_contentmd |
| 062 | [Insurance renewal deductible change](./062-renewal-deductible-change/) | insurance_claims | change_notice | critical | email | awaiting_contentmd |
| 063 | [Roadside assistance arrival time unknown](./063-roadside-eta-unknown/) | insurance_claims | uncertain_wait | high | status | awaiting_contentmd |
| 064 | [Pet treatment preauthorization pending](./064-pet-preauthorization-pending/) | insurance_claims | pending | critical | status | awaiting_contentmd |
| 065 | [Home claim inspection rescheduled](./065-home-inspection-rescheduled/) | insurance_claims | schedule_change | high | sms | awaiting_contentmd |
| 066 | [Group post removed by a moderator](./066-group-post-removed/) | social_community | moderation_action | medium | email | awaiting_contentmd |
| 067 | [Event invite visibility choice](./067-event-invite-visibility/) | social_community | privacy_choice | medium | dialog | awaiting_contentmd |
| 068 | [Blocked person joined a shared group](./068-blocked-user-in-group/) | social_community | boundary_conflict | high | banner | awaiting_contentmd |
| 069 | [Fundraiser goal met but payout pending](./069-fundraiser-payout-pending/) | social_community | success_with_pending_funds | high | status | awaiting_contentmd |
| 070 | [Community report outcome unavailable](./070-community-report-outcome/) | social_community | privacy_limited_outcome | medium | confirmation | awaiting_contentmd |
| 071 | [AI draft contains an unsupported claim](./071-ai-draft-missing-source/) | ai_automation | evidence_gap | high | banner | awaiting_contentmd |
| 072 | [Automation paused after permission was revoked](./072-automation-permission-revoked/) | ai_automation | permission_loss | high | status | awaiting_contentmd |
| 073 | [AI meeting summary has uncertain speaker names](./073-ai-summary-uncertain-names/) | ai_automation | uncertainty | medium | dialog | awaiting_contentmd |
| 074 | [Scheduled assistant action failed](./074-scheduled-agent-action-failed/) | ai_automation | recoverable_error | high | push | awaiting_contentmd |
| 075 | [Generated image public-sharing warning](./075-generated-image-public-share/) | ai_automation | publication_choice | high | dialog | awaiting_contentmd |
| 076 | [Partial contacts access](./076-contacts-partial-access/) | privacy_permissions | permission_choice | high | dialog | awaiting_contentmd |
| 077 | [Microphone recording retention choice](./077-microphone-retention-consent/) | privacy_permissions | consent_required | critical | dialog | awaiting_contentmd |
| 078 | [Temporary location sharing expired](./078-location-sharing-expired/) | privacy_permissions | expiry | medium | confirmation | awaiting_contentmd |
| 079 | [Data export includes shared records](./079-data-export-shared-records/) | privacy_permissions | privacy_warning | high | banner | awaiting_contentmd |
| 080 | [Personalized ads opt-out processing](./080-ad-opt-out-processing/) | privacy_permissions | pending_preference | medium | status | awaiting_contentmd |
| 081 | [Checkout control needs an accessible label](./081-unlabeled-checkout-control/) | accessibility_assistive | accessibility_blocker | high | banner | awaiting_contentmd |
| 082 | [Captions still processing](./082-captions-processing/) | accessibility_assistive | pending | medium | status | awaiting_contentmd |
| 083 | [Chart needs a text alternative](./083-chart-text-alternative/) | accessibility_assistive | accessibility_guidance | medium | form | awaiting_contentmd |
| 084 | [Voice input needs confirmation](./084-voice-input-confirmation/) | accessibility_assistive | ambiguous_input | high | dialog | awaiting_contentmd |
| 085 | [Reduced motion preference confirmed](./085-reduced-motion-confirmed/) | accessibility_assistive | preference_change | low | confirmation | awaiting_contentmd |
| 086 | [Inventory count sync conflict](./086-inventory-sync-conflict/) | logistics_inventory | conflict | high | dialog | awaiting_contentmd |
| 087 | [Delivery route stop skipped](./087-delivery-stop-skipped/) | logistics_inventory | service_failure | high | status | awaiting_contentmd |
| 088 | [Warehouse pick item damaged](./088-warehouse-item-damaged/) | logistics_inventory | exception | medium | status | awaiting_contentmd |
| 089 | [Order courier reassigned](./089-courier-reassigned/) | logistics_inventory | service_change | low | push | awaiting_contentmd |
| 090 | [Bulk import found duplicate records](./090-bulk-import-duplicates/) | logistics_inventory | data_quality_review | high | status | awaiting_contentmd |
| 091 | [Concert rescheduled](./091-concert-rescheduled/) | events_bookings | schedule_change | high | email | awaiting_contentmd |
| 092 | [Restaurant reservation table changed](./092-reservation-table-change/) | events_bookings | material_change | medium | sms | awaiting_contentmd |
| 093 | [Sports ticket transfer pending](./093-ticket-transfer-pending/) | events_bookings | pending_recipient_action | medium | status | awaiting_contentmd |
| 094 | [Museum entry time sold out](./094-museum-entry-sold-out/) | events_bookings | availability_error | low | inline | awaiting_contentmd |
| 095 | [Canceled class offers a waitlist alternative](./095-class-cancellation-waitlist/) | events_bookings | service_cancellation | medium | push | awaiting_contentmd |
| 096 | [Donation receipt needs correction](./096-donation-receipt-correction/) | nonprofit_volunteering | record_correction | medium | form | awaiting_contentmd |
| 097 | [Volunteer shift canceled](./097-volunteer-shift-canceled/) | nonprofit_volunteering | schedule_change | medium | email | awaiting_contentmd |
| 098 | [Food pantry eligibility documents missing](./098-food-pantry-documents-missing/) | nonprofit_volunteering | blocked_dependency | high | status | awaiting_contentmd |
| 099 | [Community grant partially awarded](./099-grant-partial-award/) | nonprofit_volunteering | partial_success | high | email | awaiting_contentmd |
| 100 | [Possible duplicate relief application](./100-relief-application-duplicate/) | nonprofit_volunteering | duplicate_detected | critical | dialog | awaiting_contentmd |

Generated deterministically from the authored scenario source. Scenarios and future outputs remain proposal-only and have no retrieval, training, benchmark, approval, publication, or release authority.
