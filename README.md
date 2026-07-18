# RUN READY

A static Korean-language guide for using a Star Trac treadmill safely.

## Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000/` in a browser.

## Publishing

Pushes to `master` deploy the static export to GitHub Pages:

`https://t2yijaeho.github.io/fitness-treadmill-guide/`

The deployed guide has no sign-in, database, form submission, or server API.

## Security

- Keep credentials in local `.env` files only; they are ignored by Git.
- Remove metadata such as GPS coordinates before adding photos to `public/`.
- Update packages through Dependabot pull requests and the repository security checks.
