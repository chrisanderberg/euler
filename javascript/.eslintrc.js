module.exports = {
  "env": {
    "node": true,
    "es6": true
  },
  "extends": [
    "eslint:recommended"
  ],
  "rules": {
    "indent": ["error", 2, {"SwitchCase": 1}],
    "quotes": ["error", "double"],
    "linebreak-style": ["error", "unix"],
    "semi": ["error", "always"],
    "keyword-spacing": ["error", {"before": true, "after": true}],
    "space-infix-ops": ["error", {"int32Hint": false}],
    "comma-spacing": ["error", {"before": false, "after": true}],
    "space-before-blocks": ["error", "always"],
    "object-curly-spacing": "error",
    "space-in-parens": "error",
    "no-empty": "warn",
    "no-unused-vars": "warn",
    "no-console": "off"
  }
};
