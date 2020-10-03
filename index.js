'use strict';
const path = require('path');
const fs = require('fs');
const util = require('util');
const parseJson = require('parse-json');
const cleanDeap = require('clean-deep');
const flattenObject = require('flatten-obj')({onlyLeaves: true});

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

	if (options.removePrefix) {
		const packages = destructurePackages(parseJson(json.replace(/[\^~]/g, '')));
		const updatedPackages = cleanDeap({...packages}, {emptyObjects: true});

		if (options.flattenPackages) {
			return flattenObject(updatedPackages);
		}

		return updatedPackages;
	}

	const packages = destructurePackages(parseJson(json));
	const updatedPackages = cleanDeap({...packages}, {emptyObjects: true});

	if (options.flattenPackages) {
		return flattenObject(updatedPackages);
	}

	return updatedPackages;
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
		const updatedPackages = cleanDeap({...packages}, {emptyObjects: true});

		if (options.flattenPackages) {
			return flattenObject(updatedPackages);
		}

		return updatedPackages;
	}

	const packages = destructurePackages(parseJson(json));
	const updatedPackages = cleanDeap({...packages}, {emptyObjects: true});

	if (options.flattenPackages) {
		return flattenObject(updatedPackages);
	}

	return updatedPackages;
};
