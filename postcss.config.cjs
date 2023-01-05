const postcssjitprops = require("postcss-jit-props");
const OpenProps = require("open-props");

module.exports = {
    plugins: [
        postcssjitprops(OpenProps),        
        require('autoprefixer'),
        require('postcss-custom-media'),
        require("postcss-nested"),
        require("postcss-preset-env"),
        require("postcss-simple-vars"),
        require("postcss-mixins"),
        require("postcss-discard-comments"),
        require("postcss-advanced-variables"),
        require("postcss-conditionals"),
        require("postcss-import"),
        require("postcss-import-url"),
    ]
};