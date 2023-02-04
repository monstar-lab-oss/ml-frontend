import { createApp } from "vue";
import App from "@/app.vue";
import routes from "@/routes";
import "@/index.css";

createApp(App).use(routes).mount("#root");
