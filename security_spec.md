# Security Specification - MTRL Website

## Data Invariants
- A course must have a unique code and valid credit (1-10).
- Faculty members must have a valid institutional email.
- News items must have a published date and status.
- Chatbot knowledge chunks must be verified before being used for RAG.
- Only authenticated admins can perform write operations.

## The "Dirty Dozen" Payloads (Red Team Tests)
1.  **Identity Spoofing**: Attempting to create a faculty member with an admin UID.
2.  **Shadow Update**: Adding a field `isAdmin: true` to a course document.
3.  **PII Blanket Test**: Attempting to read a private faculty document as a signed-in student.
4.  **Terminal State Locking**: Attempting to edit a news item that is marked as "Archived".
5.  **ID Poisoning**: Creating a document with a 2KB string as its ID.
6.  **Unbounded Array Attack**: Adding 1000 items to a list field.
7.  **Email Spoofing**: Signed-in but non-verified email attempting to edit FAQ.
8.  **Atomic Sync Bypass**: Incrementing `newsCount` without adding a news item in the same batch.
9.  **O(n) Query Scraping**: Listing all `chatbotKnowledge` without filtering by `isPublished`.
10. **System Field Injection**: Editing a system-calculated field like `relevanceScore`.
11. **Negative Credit Attack**: Setting course credits to -1.
12. **Future Date Injection**: Setting `publishedAt` to a future timestamp from the client.

## Test Runner (Logic)
- All write operations check `request.auth.uid`.
- All list operations filter by `isPublished == true`.
- All field updates use `affectedKeys().hasOnly()`.
