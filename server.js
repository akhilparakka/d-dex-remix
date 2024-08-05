import { createRequestHandler } from "@remix-run/express";
import express from "express";
import path from "path";

const viteDevServer =
  process.env.NODE_ENV === "production"
    ? null
    : await import("vite").then((vite) =>
        vite.createServer({
          server: { middlewareMode: true },
        })
      );

const app = express();
app.use(viteDevServer ? viteDevServer.middlewares : express.static("public"));

if (viteDevServer) {
  app.use((req, res, next) => {
    viteDevServer.middlewares.handle(req, res, next);
  });
}

const build = viteDevServer
  ? await viteDevServer.ssrLoadModule("virtual:remix/server-build")
  : await import("./build/server/index.js");

app.all(
  "*",
  viteDevServer
    ? async (req, res, next) => {
        const handleRequest = createRequestHandler({ build });
        await handleRequest(req, res, next);
      }
    : createRequestHandler({ build })
);

app.listen(3000, () => {
  console.log("App listening on http://localhost:3000");
});
