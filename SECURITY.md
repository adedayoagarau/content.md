# Security policy

## Supported versions

Security fixes are provided for the latest released `contentmd` version. The
repository may contain unreleased development work; support begins only when a
version is published through the release workflow.

## Report a vulnerability

Use GitHub's private vulnerability reporting for this repository. Do not open a
public issue containing exploit details, credentials, private product content,
or personal data. If private reporting is unavailable, open a public issue that
contains no sensitive details and asks the maintainers to establish a private
channel.

Include the affected version, operating system, Node version, reproduction
steps, impact, and whether the report involves filesystem mutation, provider
egress, authorization, audit integrity, or research-data handling.

## Security boundary

The published CLI is local-first. Preview and inspection do not grant mutation,
model-provider, approval, release, or publication authority. Local writes require
an explicit, digest-bound confirmation and retain undo or rollback evidence.
Provider configuration and repository content must be treated as untrusted.

Do not report missing hosted-service controls as vulnerabilities: no hosted
service is currently shipped. Do report behavior that crosses a declared local,
network, filesystem, authorization, evidence, or package boundary.
