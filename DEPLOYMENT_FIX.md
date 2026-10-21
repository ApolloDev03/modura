# Hostinger deployment fix

The Hostinger failure reported a `TurbopackInternalError` while processing `ckeditor5/dist/ckeditor5.css` via PostCSS. The project keeps CKEditor and all existing styles unchanged. The **production build** now runs using Next.js's supported Webpack builder instead of Turbopack:

```sh
npm ci
npm run build
```

`npm run build` now invokes `next build --webpack`. The dev command stays `next dev`.

In Hostinger, redeploy the updated project and use `npm run build` as the build command. If Hostinger overrides the package script with `next build`, set its build command explicitly to `npm run build` or `npx next build --webpack`.

If a separate error persists, check the actual build log rather than the generated analysis summary.
