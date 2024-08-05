// app/root.jsx
import { Links, Meta, Outlet, Scripts } from "@remix-run/react";
import appStylesHref from "./app.css?url";

export const links = () => [{ rel: "stylesheet", href: appStylesHref }];

export default function App() {
  return (
    <html>
      <head>
        <link rel="icon" href="data:image/x-icon;base64,AA" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <Scripts />
      </body>
    </html>
  );
}
