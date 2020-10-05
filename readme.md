# read-packages ![build](https://travis-ci.com/rocktimsaikia/read-packages.svg?branch=master) ![license](https://img.shields.io/github/license/rocktimsaikia/read-packages)

> Read dependencies of a package.json file.

## Install
```bash
npm install read-packages
```

## Usage

```js
const readPackages = require('read-packages');

(async()=>{
        console.log(await readPackages());
        //=> {dependencies: {foo: '^1.0.0',..}, devDependencies: {bar: '^2.0.0',...}}

        console.log(await readPackages({dir: './some/other/directory'}));
        //=> {dependencies: {...}, devDependencies: {...}}

        console.log(await readPackages({removePrefix: true}));
        //=> {dependencies: {foo: '1.0.0',..}, devDependencies: {bar: '2.0.0',...}}

        console.log(await readPackages({removePrefix: true, flattenPackages: true}));
        //=> {foo: '1.0.0',bar: '2.0.0',...}
})();
```

## Usage without `async`
The module has a `sync` property to use the lib without async. All the other options works just the same.
```js
const readPackages = require('read-packages');

console.log(readPackages.sync());
//=> {dependencies: {foo: '^1.0.0',..}, devDependencies: {bar: '^2.0.0',...}}
```
## API

### readPackages(options?)

Returns a `Promise<object>` with the parsed dependencies/devDependencies.

### readPackages.sync(options?)

Returns the parsed dependencies/devDependencies.

#### options

##### dir

Type: `string`<br>
Default: `process.cwd()`

Current working directory.

##### removePrefix

Type: `boolean`<br>
Default: `false`

Removes the dependency version prefixes (^,~,*).

##### flattenPackages

Type: `boolean`<br>
Default: `false`

Flattens all types dependencies into a single object.

## Related

- [package-outdated](https://github.com/rocktimsaikia/package-outdated) - Returns the outdated packages of a package.json file
- [flatify-obj](https://github.com/rocktimsaikia/flatify-obj) - Flatten javascript objects into a single-depth object

## Support

<a href="https://www.buymeacoffee.com/7BdaxfI"><img src="https://user-images.githubusercontent.com/33410545/91206759-48d5d180-e725-11ea-93b5-754d98c007af.png" height="60px"/></a>
