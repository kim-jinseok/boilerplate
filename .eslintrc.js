module.exports = {
    root: true,
    extends: [
        'standard',
        'plugin:vue/essential'
    ],
    parserOptions: {
        parser: 'babel-eslint',
        ecmaVersion: 2017,
        sourceType: 'module'
    },
    plugins: [
        'html',
        'standard',
        'vue'
    ],
    env: {
        browser: true
    },
    rules: {
        'generator-star-spacing': 'off',
        'indent': 'off',
        "vue/script-indent": 'off', ///["error", 2, { "baseIndent": 1 }],
        'brace-style': ['error', '1tbs'],
        'no-console': 'error',
        'comma-dangle': ['error', {
            'arrays': 'never',
            'objects': 'never',
            'imports': 'never',
            'exports': 'never',
            'functions': 'never'
        }],
        'eol-last': 'off',
        'no-multiple-empty-lines': ['error', { 'max': 4, 'maxBOF': 1 }],
        'no-undef': 'error',
        'space-in-parens': ['error', 'never'],
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        'space-before-function-paren': [
            'error',
            {
                "anonymous": "never",
                "named": "never",
                "asyncArrow": "always"
            }
        ],
        'quotes': ['error', 'single'],
        'space-before-blocks': [
            'error',
            'always'
        ],
        'no-empty': 'error',
        'no-duplicate-imports': 'error'
    }
}