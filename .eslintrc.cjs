module.exports = {
    "parserOptions": {
        "ecmaVersion": "latest"
    },
    "env": {
        "browser": true,
        "node": true,
        "commonjs": true,
        "es2022": true
    },
    "globals": {"_": true},
    "plugins": ["import"],
    "extends": ["airbnb-base", "prettier"],
    "rules": {
        "no-var": "off",
        "no-console": "warn",
        "no-plusplus": "off",
        "no-shadow": "off",
        "vars-on-top": "off",
        "no-underscore-dangle": "off",
        "comma-dangle": "off",
        "func-names": "off",
        "prefer-template": "off",
        "no-nested-ternary": "off",
        "max-classes-per-file": "off",
        "consistent-return": "off",
        "no-restricted-syntax": ["off", "ForOfStatement"],
        "prefer-arrow-callback": "error",
        "require-await": "error",
        "arrow-parens": ["error", "as-needed"],
        "no-param-reassign": ["error", {"props": false}],
        "no-unused-expressions": ["error", {
            "allowTernary": true,
            "allowShortCircuit": true,
            "allowTaggedTemplates": true
        }],
        "import/no-extraneous-dependencies": ["error", {"devDependencies": true}],
        "max-len": ["error", {
            "code": 120,
            "ignoreComments": true,
            "ignoreStrings": true,
            "ignoreTemplateLiterals": true
        }]
    }
}