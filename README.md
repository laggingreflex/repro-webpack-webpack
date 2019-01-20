
I have an library - **Core** that's supposed to act as a bundler for a child app - **Child**.

The Child would have typical structure of a React Webpack app:

```
app
├───app.js
```
* **`app/app.js`**

        console.log('It works!')

Except it doesn't have a `webpack.config.js` - that's provided by **Core**.

And so instead of running `webpack` directly, the user is supposed to run `core`.

```
core
├───cli.js
├───webpack.config.js
├───wrapper.js
```

* **`core/cli.js`**

        // Using Webpack Node API
        const webpack = require('webpack')
        const config = require('./webpack.config')
        const compiler = webpack(config)
        compiler.run()

* **`core/webpack.config.js`**

        module.exports = {
          entry: './wrapper.js',
          plugins: [new webpack.DefinePlugin({
            __CWD__: process.cwd()
          })]
        }

* **`core/wrapper.js`**

        require(__CWD__ + '/app.js')

1. The user runs `core` in their `app` dir.
2. **Core**'s `core/wrapper.js` is the entry point to Webpack bundle
2. Which `require`'s the user's `__CWD__/app.js`

So far so good. The users runs `app/dist/main.js` and it outputs:

    $ core && node dist/main.js
    It works!

Now, comes my main issue.

**I want to pre-package** my **Core** library using Webpack. So I introduce another `meta.webpack.config.js`

* **`core/meta.webpack.config.js`**

        module.exports = {
          entry: {
            cli: './cli.js',
            wrapper: './wrapper.js',
          },
          mode: 'node'
        }

Here I'm bundling the `cli.js` and `wrapper.js` separately.

**But** now if I use this bundled `cli.js` it doesn't work:

    $ node core/dist/cli.js && node dist/main.js
    ReferenceError: __CWD__ is not defined

I'm guessing this is because in the first bundling (of Core) the `core/wrapper.js` processes the variable `__CWD__` in such a way that it **cannot** be processed further again - the way it was *supposed* to be processed by the ***second*** round of bundling.

I've also tried the `resolve.alias` method but same issue.

Could this be solved somehow?

Basically, is there a way to have Webpack **not** process the variables (for `DefinePlugin`) in the *first* round of bundling, but instead have it process them in the second bundling?

Maybe a way to **escape** them?

Or some entirely other way to achieve what I want - to have my **Core** library work same as before but after being pre-bundled itself.

Here's a repro: https://github.com/laggingreflex/repro-webpack-webpack

Clone the repo and run

    node run
