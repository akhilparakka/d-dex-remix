// app/root.jsx
import { Links, Meta, Outlet, Scripts } from "@remix-run/react";
import appStylesHref from "./app.css?url";
import Welcome from "./routes/welcome/welcome";

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
        <Welcome />
        <Outlet />
        <Scripts />
      </body>
    </html>
  );
}
