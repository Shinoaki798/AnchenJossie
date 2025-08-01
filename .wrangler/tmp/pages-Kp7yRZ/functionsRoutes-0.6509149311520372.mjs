import { onRequestPost as __api_contact_js_onRequestPost } from "/Users/caoyun/Documents/GitHub/AnchenJossie/functions/api/contact.js"
import { onRequest as __api_hello_js_onRequest } from "/Users/caoyun/Documents/GitHub/AnchenJossie/functions/api/hello.js"

export const routes = [
    {
      routePath: "/api/contact",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_contact_js_onRequestPost],
    },
  {
      routePath: "/api/hello",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_hello_js_onRequest],
    },
  ]