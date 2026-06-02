# Junior Developer Project Showcase

## Chosen scenario
Junior Developer Project Showcase.

## Student
Necsoiu David Carlos  
Email: david.necsoiu06@e-uvt.ro

## Short description
This is a simple first-year computer science portfolio website. It continues the HW1 project and adds the HW2 requirements: improved CSS, a responsive overview page, a business card page, a Figma authentication design export and a small JavaScript chatbot.

## HW2 implemented requirements
- Copied and continued the HW1 idea instead of restarting from zero.
- Kept the minimum HW1 pages: `index.html`, `about.html`, `data.html`, `contact.html`.
- Added semantic structure on all main pages: `header`, `nav`, `main`, `footer`.
- Added the same navigation menu on all pages.
- Added a real data table with caption, table headers and scoped headers.
- Added an accessible contact form with labels, fieldsets and required fields.
- Used one main external stylesheet: `styles.css`.
- Added `style.css` for the Lab 4 specificity h1 test.
- Demonstrated CSS placement:
  - external CSS through `styles.css`,
  - internal CSS in `index.html` and `specificity.html`,
  - inline CSS in `index.html`.
- Added `:nth-child` styling for tables and cards.
- Added `specificity.html` and `specificity.txt` using the Lab 4 CSS Specificity Game code, plus `style.css` for the h1 test from the same exercise.
- Added `card.html` and `card.css` for the business card page.
- Added `overview.html` with CSS Grid, Flexbox, a media query and four project cards.
- Added `chatbot.html`, `chatbot.css` and `chatbot.js`.
- The chatbot uses an array of objects, DOM updates, `createElement`, `appendChild` and form submit handling.
- Added `figma-auth.css` as exported CSS evidence from the Figma authentication frame.
- Added `assets/figma-auth-screenshot.png` as the authentication frame screenshot.

## Known limitations
- The contact form is static and does not send real messages.
- The chatbot only answers a few predefined topics.
- The Figma screenshot is a simple exported image for repository evidence.

## Figma authentication interface

For the Figma part, I created a simple authentication interface with a main frame and a two-panel layout. The left panel introduces the project, and the right panel contains a sign in form with email and password fields.

I used a small set of reusable design tokens:
- Colors: blue (#1F5590), white (#FFFFFF), light background (#F5F5F5)
- Typography: bold heading text and regular body text
- Spacing: simple spacing based around 16px and 24px

The Sign In and Register buttons were created as reusable button components. I exported the CSS from Figma into `figma-auth.css` and saved a screenshot in the `assets` folder.