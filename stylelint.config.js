/** @type {import('stylelint').Config} */
export default {
  extends: [
    "stylelint-config-standard",
    "stylelint-config-clean-order",
    "stylelint-config-standard-scss",
  ],
  rules: {
    "value-keyword-case": "lower",
    "scss/at-rule-conditional-no-parentheses": null,
    "no-descending-specificity": null,
    "no-duplicate-selectors": null,
    "selector-class-pattern": null,
    "selector-id-pattern": null,
    "scss/dollar-variable-pattern": null,
    "scss/at-mixin-pattern": null,
    "scss/at-function-pattern": null,
  },
  ignoreFiles: [
    "dist/**/*",
    ".vite/**/*",
    "node_modules/**/*",
    "public/assets/**/*",
  ],
};
