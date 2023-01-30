import { createApp } from "vue";
import "./index.css";
import routes from "@/routes";
import App from "@/app.vue";

createApp(App).use(routes).mount("#root");
