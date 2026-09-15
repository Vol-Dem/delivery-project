# UNSTO Delivery

An animation-focused landing page for a fictional courier service. The project
combines responsive layouts, scroll-triggered section animations, interactive
delivery controls, and accessible form components.

[View the live demo](https://unsto-delivery.web.app/)

## Highlights

- Animated hero, counters, service cards, slider, and section entrances
- Responsive desktop and mobile navigation
- Delivery calculator with searchable country and city selectors
- Incrementally rendered city options for smoother large dropdowns
- Accessible modal, select, combobox, and form controls
- GeoNames integration for location data
- Unit and component tests for the main interaction logic

## Built with

- React 19 and TypeScript
- Vite
- Sass modules
- Headless UI and Heroicons
- Framer Motion
- Vitest and Testing Library
- Firebase Hosting

## Getting started

Install the dependencies:

```bash
npm install
```

Create a `.env.local` file based on `.env.example` and add your
[GeoNames](https://www.geonames.org/login) username:

```dotenv
VITE_GEONAMES_USERNAME=your_username
```

Start the development server:

```bash
npm run dev
```

Vite will print the local URL in the terminal.

## Available scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run typecheck` | Check TypeScript types without emitting files |
| `npm run lint` | Run ESLint across the repository |
| `npm test` | Run the Vitest test suite once |

## Project structure

```text
src/
|-- api/          # GeoNames client and API tests
|-- assets/       # Illustrations, icons, and fonts
|-- components/   # Page sections, forms, layout, hooks, and slider
|-- ui/           # Reusable controls and presentation components
`-- variables/    # Shared Sass variables and mixins
```

## Notes

- This is a learning project and animation showcase, not a production courier
  service. Account, contact, tracking, and quote submissions are demonstrations.
- `CloudFunctions.js` is retained as reference code. The client currently calls
  GeoNames directly with `VITE_GEONAMES_USERNAME`.
