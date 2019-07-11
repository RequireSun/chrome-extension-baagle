module.exports = {
    root: true,
    env: {
        node: true,
    },
    'extends': [
        'plugin:vue/essential',
        '@vue/standard',
        '@vue/typescript',
    ],
    rules: {
        // 'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-console': 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'semi': 0,
        'indent': [ 'error', 4, { 'SwitchCase': 1, }, ],
        'comma-dangle': ['error', {
            'arrays': 'always',
            'objects': 'always',
            'imports': 'always',
            'exports': 'always',
            'functions': 'never',
        }, ],
        'yoda': 0,
    },
    parserOptions: {
        parser: 'typescript-eslint-parser',
    },
};
