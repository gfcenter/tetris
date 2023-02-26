module.exports = {
    "extends": "airbnb",
    "installedESLint": true,
    "plugins": [
        "react"
    ],
    "rules": {
        "react/jsx-filename-extension": [2, { extensions: ['.js', '.jsx'] }],
        "func-names": [0],
        "new-cap": [2, { newIsCap: true, capIsNew: true, capIsNewExceptions: ['List', 'Map'] }],
        "linebreak-style": [0],
        "react/prop-types": 0,
        "max-len": ["error",{"code":300}],
        'react/self-closing-comp': ['error', {'component': true}],
    },
    "env": {
        "browser": true
    }
};