import { createProxyMiddleware } from "http-proxy-middleware";

export const addProxyMiddleware = (app) => {
  app.use(
    createProxyMiddleware("/recommendation", {
      target: "https://dialogflow-webhook-kbh8.onrender.com",
      changeOrigin: true,
    })
  );
};
