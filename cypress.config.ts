import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: `http://localhost:5000`,
    supportFile: false,
    specPattern: "test/e2e/**/*.cy.{js,jsx,ts,tsx}"
  },
});
