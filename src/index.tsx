import { AppUiProvider } from "@canva/app-ui-kit";
import * as React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app";
import "@canva/app-ui-kit/styles.css";
import { Stats } from "./core/Stats";

const root = createRoot(document.getElementById("root")!);

function render() {
  root.render(
    <>
      <AppUiProvider>
        <App />
      </AppUiProvider>
      <Stats />
    </>
  );
}

render();

if (module.hot) {
  module.hot.accept("./app", render);
}
