/**
 * Disclaimer: modules in _shims aren't intended to be imported by SDK users.
 */
const shims = require('./registry');
const auto = require('spec-payments-stainless-demo/_shims/auto/runtime');
if (!shims.kind) shims.setShims(auto.getRuntime(), { auto: true });
for (const property of Object.keys(shims)) {
  Object.defineProperty(exports, property, {
    get() {
      return shims[property];
    },
  });
}
