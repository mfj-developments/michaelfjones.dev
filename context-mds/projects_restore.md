# Projects Data Restore Guide

This site currently hides the projects section because `src/data/projects.ts` exports an empty list. The prior showcase cards are preserved under `web/src/data/projects-archive.json`.

## Restoring the archived cards

1. Open `web/src/data/projects-archive.json`. Each object matches the `Project` type used by the UI.
2. Copy the array contents into `web/src/data/projects.ts` and export them:
   ```ts
   import type { Project } from "@/types/project";
   export const projects: Project[] = [/* paste archived objects here */];
   ```
   Alternatively, import the JSON file directly and re-export it if you prefer.
3. Confirm `projects.length > 0`. When the array is non-empty:
   - The Projects navigation link will automatically appear in the header and mobile menu.
   - The homepage projects section will render again.
   - The hero call-to-action restores the “See projects” button.
   - `/projects` will list the restored cards with filtering enabled.
4. Deploy or restart the dev server if it is running so the changes are picked up.

## Updating the archive

If you add new cards later but still want to keep an offline snapshot, update both:

- `projects.ts` – the data actively rendered on the site.
- `projects-archive.json` – the backup copy for safekeeping.

Keeping both files aligned makes it easy to toggle the section on or off without losing metadata.
