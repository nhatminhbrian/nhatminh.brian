# Drop-in photo folders

Put each event in its own folder:

```
public/gallery/2026/foie-tournament/
  folder.json   (optional)
  01.jpg
  02.jpg
```

Then run `npm run gallery:optimize` (shrinks big camera files) and commit. The build
indexes it automatically under the **2026** tab and the group in `folder.json`.

`folder.json` (every field optional):

```json
{
  "title": "FOIE Tournament 2026",
  "partnerGroup": "hvng",
  "organization": "Khoa Kinh tế Quốc tế",
  "date": "2026-10-12",
  "semester": "Kì 1",
  "location": "Học viện Ngoại giao",
  "gear": "CANON 6D • EF 24-105MM F/4",
  "summary": "One line about the event.",
  "story": ["Paragraph one.", "Paragraph two."],
  "cover": "07.jpg",
  "featured": false
}
```

`partnerGroup` is one of: `hvng`, `sseayp`, `art`, `community`, `street`.
Photos are shown in file-name order. For large or frequent recaps, use `/studio` instead —
it keeps the repository small.
