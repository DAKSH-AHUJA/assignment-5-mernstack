# Task 5: React Custom Hook

This project demonstrates a reusable `useFetch` hook for fetching API data in React.

## What Was Built

- Created a custom hook named `useFetch`.
- The hook accepts a URL and returns `data`, `loading`, and `error`.
- Added request cleanup with `AbortController` so stale fetches are cancelled safely.
- Built a simple product grid that fetches data from:

```text
https://api.escuelajs.co/api/v1/products
```

## Decisions Made

- Used `useState` to track fetched data, loading state, and errors.
- Used `useCallback` to keep the fetch function stable when the URL does not change.
- Used `useEffect` to automatically fetch data when the component mounts or the URL changes.
- Added loading skeleton cards and an error panel so the UI handles API states clearly.
- Kept the component focused on consuming the hook, while the hook owns the fetch logic.

## Run Locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```
