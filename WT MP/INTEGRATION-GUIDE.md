# PennyWise IA-3 files: integration guide

## 1. Files in this package

Required FR-02 to FR-08 pages/modules:
- `register.html` — FR-02 detailed registration form
- `signup.html` — FR-03 sign-up form
- `signin.html` — FR-04 sign-in form and show/hide password button
- `home.html` — FR-05 responsive dashboard (desktop Grid / mobile Flexbox)
- `chatbot.js` — FR-06 keyword-matching chatbot
- `theme.js` — FR-07 light/dark theme switcher
- `calculator.js` — FR-08 calculator

Shared support files:
- `styles.css` and `layout.css` — shared styling and responsive layout
- `validation.js` — validation used by registration, sign-up and sign-in

Your existing `index.html` is intentionally not included or overwritten.

## 2. Put the files together

Place every file in this package in the same folder as the existing `index.html` at the root of your GitHub/Vercel project. Do not put them in separate folders unless you also change the paths in the HTML files.

The resulting structure should look like this:

```
pennywise/
├── index.html              (your existing landing page)
├── register.html
├── signup.html
├── signin.html
├── home.html
├── styles.css
├── layout.css
├── validation.js
├── theme.js
├── chatbot.js
└── calculator.js
```

## 3. How the files connect

HTML pages connect to one another with ordinary links, for example:

```html
<a href="home.html">Dashboard</a>
```

CSS files are loaded from the page head:

```html
<link rel="stylesheet" href="styles.css">
<link rel="stylesheet" href="layout.css">
```

JavaScript files are loaded near the end of the page, before `</body>`:

```html
<script src="theme.js"></script>
```

Each HTML file only loads the scripts it needs. `register.html`, `signup.html` and `signin.html` load `validation.js`; `home.html` loads `theme.js`, `calculator.js` and `chatbot.js`.

## 4. Add navigation and theme toggle to your existing index.html

Your live `index.html` was left untouched. To connect it to the other pages, add the following header immediately after the opening `<body>` tag:

```html
<header class="site-header">
    <a class="brand" href="index.html">PennyWise</a>
    <nav class="site-links" aria-label="Main navigation">
        <a href="#top">Overview</a>
        <a href="#features">Features</a>
        <a href="#expenseTracker">Expense Tracker</a>
        <a href="home.html">Dashboard</a>
        <a href="register.html">Register</a>
        <a href="signin.html">Sign in</a>
    </nav>
    <button class="theme-toggle" id="themeToggle" type="button">Light mode</button>
</header>
```

Inside the `<head>` section of `index.html`, add these two lines after its existing `<style>` block:

```html
<link rel="stylesheet" href="styles.css">
<link rel="stylesheet" href="layout.css">
```

Immediately before the closing `</body>` tag in `index.html`, add:

```html
<script src="theme.js"></script>
```

The theme script uses CSS variables. The shared styles use dark colours by default and switch the page's shared background, cards and form controls to light colours when the toggle is pressed. If any part of your original index page has hard-coded colours in highly specific CSS selectors, those particular elements may need their colours changed to the variables in `styles.css` to respond fully to the theme.

Optional: to add the chatbot to the landing page too, add `<script src="chatbot.js"></script>` immediately before `</body>`.

### Check the existing landing page against FR-01

I inspected the currently published landing page. It shows the PennyWise tracker, but the visible page does not appear to include all FR-01 checklist items yet: a header navigation bar, hero call-to-action buttons, and feature overview cards. If these are not already present in your local `index.html`, add the following after your existing title/subtitle and before the dashboard cards:

```html
<div class="hero-actions">
    <a class="button-link" href="home.html">Open Dashboard</a>
    <a class="button-link secondary-button" href="register.html">Register</a>
</div>

<section class="feature-grid">
    <article class="feature-card">
        <h3>Budget Tracking</h3>
        <p>Set a monthly spending limit and monitor the remaining amount.</p>
    </article>
    <article class="feature-card">
        <h3>Expense History</h3>
        <p>Record expenses with a date, description and category.</p>
    </article>
    <article class="feature-card">
        <h3>Private Local Storage</h3>
        <p>Keep expense records in the browser and export them as a CSV file.</p>
    </article>
</section>
```

This supplements rather than replaces your existing expense tracker. The shared stylesheet in this package provides the styling for these cards and links.

For the section links to work, make these two small edits in your existing markup:

- Change the existing PennyWise heading to `<h1 id="top">PennyWise</h1>`.
- Add `id="features"` to the feature section above, and add `id="expenseTracker"` to your existing dashboard element (the element with the `dashboard` class).

The feature cards stack into one column on narrow screens, so the overview remains responsive.

## 5. Shared expense data

Your existing `index.html` and the new `home.html` both use the localStorage key `pennyWiseData` and the same data fields:

- `expenses`
- `income`
- `spendingLimit`

The dashboard can therefore read the expense and budget information already saved by the existing site, provided both pages are served from the same domain and browser profile.

## 6. Important prototype limitation

The registration, sign-up and sign-in pages demonstrate front-end form validation only. There is no server, account database or secure authentication service in this project. The pages do not save or transmit passwords, and a valid sign-in format is not proof that an account exists. Do not present these pages as production-ready authentication. Real accounts require a backend authentication service and secure password handling.

The chatbot uses local keyword matching and does not connect to an AI service.

## 7. Test checklist

1. Open `register.html`; enter invalid and valid values; confirm the submit button remains disabled until every field is valid.
2. Open `signup.html`; try submitting without accepting the Terms of Service.
3. Open `signin.html`; test the Show/Hide password button and invalid email/password formats.
4. Open `home.html` on a wide browser window; confirm the three-column Grid layout.
5. Narrow the browser below 768px; use the Menu button to open and close the navigation drawer.
6. Open the chatbot and ask about budgets, expenses, privacy and CSV export.
7. Toggle light/dark mode and refresh the page; confirm the chosen theme remains selected.
8. Test calculator addition, subtraction, multiplication, division and division by zero.
9. Confirm budget/expense data remains available when navigating between `index.html` and `home.html` on the same Vercel domain.

## 8. Deploy to Vercel

After placing the files in your existing project folder, commit and push them to the GitHub repository connected to Vercel. Vercel should redeploy the static site. Check the new pages using `/register.html`, `/signup.html`, `/signin.html` and `/home.html` on your live domain.
