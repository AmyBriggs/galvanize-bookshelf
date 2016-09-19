module.exports = {
    "env": {
        "browser": true,
        "node": true,
        "es6": true,
        "jquery": true,
        "mocha": true,
        "qunit": true,
        "embertest": true,
    },
    "esversion":6,
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
        "linebreak-style": [
            "error",
            "unix"
        ],
        // "quotes": [
        //     "error",
        //     "single"
        // ],
        "semi": [
            "error",
            "never"
        ],
        "no-console": "off",
        "comma-dangle": [
          "error",
          "always-multiline"
        ]
    }
};
