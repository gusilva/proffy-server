module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    env: {
        browser: true,
        node: true,
    },
    extends: [
        "eslint:recommended",
        'prettier',
        'plugin:prettier/recommended',
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/eslint-recommended"
    ],
    plugins: ['prettier', "@typescript-eslint"],
    // add your custom rules here
    rules: {},
}
