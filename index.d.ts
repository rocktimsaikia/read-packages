interface Options{
	/**
	Current working directory.

	@default process.cwd()
	*/
	readonly dir?: string;

	/**
	Removes the dependency version prefixes (^,~,*).

	@default false
	*/
	removePrefix?: boolean;

	/**
	Flattens all types dependencies into a single object.

	@default false
	*/
	flattenPackages?: boolean;
}

interface Dependencies {
	dependencies?: Record<string, string>;
	devDependencies?: Record<string, string>;
	peerDependencies?: Record<string, string>;
	optionalDependencies?: Record<string, string>;
}

/**
	Returns a `Promise<object>` with the parsed dependencies/devDependencies.

	@example
	```js
	const readDependencies = require('read-packages');

	(async()=>{
			console.log(await readDependencies());
			//=> {dependencies: {foo: '^1.0.0',..}, devDependencies: {bar: '^2.0.0',...}}

			console.log(await readDependencies({dir: './some/other/directory'}));
			//=> {dependencies: {...}, devDependencies: {...}}

			console.log(await readDependencies({removePrefix: true}));
			//=> {dependencies: {foo: '1.0.0',..}, devDependencies: {bar: '2.0.0',...}}
	})();
	```
*/
declare function _exports(options: Options): Promise<Dependencies>;

declare namespace _exports {
	/**
	Returns the parsed dependencies/devDependencies.

	@example
	```js
	const readPackages = require('read-packages');

	console.log(readPackages.sync());
	/=> {dependencies: {foo: '^1.0.0',..}, devDependencies: {bar: '^2.0.0',...}}
	```
	*/
	function sync(options: Options): Dependencies;
}

export = _exports;
