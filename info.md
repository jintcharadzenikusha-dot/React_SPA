# VELA — React SPA / E-Commerce Platform

**სცენარი:** 1 — ელექტრონული კომერცია (E-Commerce Platform)

**ჯგუფი:** 3 სტუდენტი. სახელები და ჯგუფის ნომერი შეავსეთ ნამდვილი ინფორმაციით (დროებითი აღნიშვნები: სტუდენტი 1, 2 და 3).

## დავალების გადანაწილება

| სტუდენტი | შედეგი 4 (Router) | შედეგი 5 (Redux Toolkit) | შედეგი 6 (Formik + Yup) |
|---|---|---|---|
| 1 — პროდუქტების კატალოგი | `/products`, `/products/:id`, `useParams`, `useNavigate`, `Link` | `productsSlice`, `addProduct`, კატეგორიის/ფასის ფილტრები | პროდუქტის დამატება: დასახელება, ფასი ≥1, მომწოდებლის ელფოსტა |
| 2 — კალათა / შეკვეთა | `/cart`, `/checkout/:step`, `Link`, `useParams` | `cartSlice`, დამატება, შემცირება, წაშლა, შეკვეთის დამახსოვრება | შეკვეთა: მიმღების სახელი, მისამართი, რიცხვითი საფოსტო ინდექსი, ელფოსტა |
| 3 — ავტორიზაცია / პროფილი | `/user`, `/user/:userId`, `useParams`, `Link` | `authSlice`, რეგისტრაცია, შესვლა, გამოსვლა | რეგისტრაცია: სახელი, ასაკი ≥18, ელფოსტა, პაროლი ≥6 |

ყველა Formik ფორმაში გამოიყენება `useFormik` Hook, `FormikProvider` და `useField`; ვალიდაცია — `Yup.object(...)`.

## ტექნოლოგიები

React 18, Vite 6, TypeScript, React Router v6, Redux Toolkit, React-Redux, Formik, Yup, Lucide Icons, CSS.

## გაშვება

```bash
npm install
npm run dev
```

გახსენით კონსოლში მითითებული მისამართი (ჩვეულებრივ http://localhost:5173).

პროექტის საბოლოო აწყობა და შემოწმება:

```bash
npm run typecheck
npm run test
npm run build
npm run preview
```

> ბრაუზერში შენახვა: Redux state ინახება `localStorage`-ში, რადგან არ გვაქვს backend. ყველა დამატება, რეგისტრაცია და შეკვეთა სასწავლო დემოა. რეალური გადახდა არ ხდება და რეალური უსაფრთხო ავტორიზაცია არ არსებობს. საცდელად გამოიყენეთ გამოგონილი პაროლი.

## Git / GitHub

რეალური GitHub URL: **[შეავსეთ საკუთარი რეპოზიტორიის ბმული]**  
ძირითადი Branch: `main`  
ინდივიდუალური Branch-ები: `feature/products-module`, `feature/cart-checkout`, `feature/auth-profile`.

GitHub-ზე ნამდვილად შესრულებული commits, pull requests და merges უნდა გამოჩნდეს თქვენს საკუთარ რეპოზიტორიაში. პროექტის ZIP თავისთავად GitHub-ის ისტორიას ვერ ადასტურებს. ნაბიჯები იხილეთ `docs/GITHUB_WORKFLOW.md`.

## მნიშვნელოვანი ფაილები

- `src/App.tsx` — საერთო მარშრუტები;
- `src/app/store.ts` — `configureStore`, სამივე Redux Slice;
- `src/features/products/*` — სტუდენტი 1;
- `src/features/cart/*` — სტუდენტი 2;
- `src/features/auth/*` — სტუდენტი 3;
- `src/components/*` — საერთო UI;
- `public/products/*` — ლოკალური SVG ვიზუალები;
- `docs/CRITERIA_CHECKLIST.md` — რუბრიკასთან შესაბამისობის შემოწმება;
- `docs/GITHUB_WORKFLOW.md` — გუნდური მუშაობის ინსტრუქცია.

## `dist/` შენიშვნა

აქ მოსამზადებელ გარემოს npm registry-ზე წვდომა არ ჰქონდა, ამიტომ Vite production build-ის გადამოწმება ვერ შესრულდა. ZIP-ში დამატებულია *browser ESM preview* (`dist`), რომელიც საჭიროებს ინტერნეტს CDN-ებისთვის; ეს არ არის Vite-ის რეალური build. **საბოლოო ჩაბარებამდე საკუთარ კომპიუტერზე გაუშვით `npm install && npm run build`**, რათა `dist/` შეიცვალოს ნამდვილი Vite-ით აგებული ვერსიით. დატესტეთ გვერდებიც.
