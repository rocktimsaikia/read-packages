'use strict';
const path = require('path');
const fs = require('fs');
const util = require('util');
const parseJson = require('parse-json');
const flatifyObject = require('flatify-obj');
const cleanDeep = require('clean-deep');

const readFileAsync = util.promisify(fs.readFile);

const destructurePackages = json => {
	const {dependencies = {}, devDependencies = {}, peerDependencies = {}, optionalDependencies = {}} = json;
	return {dependencies, devDependencies, peerDependencies, optionalDependencies};
};

module.exports = async options => {
	options = {
		dir: process.cwd(),
		removePrefix: false,
		flattenPackages: false,
		...options
	};

	const filePath = path.resolve(options.dir, 'package.json');
	const json = await readFileAsync(filePath, 'utf8');

	const mergeDependencies = packages => {
		if (options.flattenPackages) {
			return cleanDeep(flatifyObject(packages, {onlyLeaves: true}));
		}

		return cleanDeep(packages);
	};

	if (options.removePrefix) {
		const packages = destructurePackages(parseJson(json.replace(/[\^~]/g, '')));

		return mergeDependencies(packages);
	}

	const packages = destructurePackages(parseJson(json));

	return mergeDependencies(packages);
};

module.exports.sync = options => {
	options = {
		dir: process.cwd(),
		removePrefix: false,
		flattenPackages: false,
		...options
	};

	const filePath = path.resolve(options.dir, 'package.json');
	const json = fs.readFileSync(filePath, 'utf8');

	if (options.removePrefix) {
		const packages = destructurePackages(parseJson(json.replace(/[\^~]/g, '')));

		if (options.flattenPackages) {
			return flatifyObject(packages, {onlyLeaves: true});
		}

		return packages;
	}

	const packages = destructurePackages(parseJson(json));

	if (options.flattenPackages) {
		return flatifyObject(packages, {onlyLeaves: true});
	}

	return cleanDeep(packages);
};
