'use strict';
const path = require('path');
const test = require('ava');
const readDep = require('..');

process.chdir(__dirname);

const rootDir = path.join(__dirname, '..');

test('async', async t => {
	const dependencies_ = await readDep();
	t.truthy(dependencies_.hasOwnProperty('dependencies'));
	t.false(dependencies_.hasOwnProperty('peerDependencies'));
	t.false(dependencies_.hasOwnProperty('optionalDependencies'));
});

test('async - dir option', async t => {
	const dependencies_ = await readDep({dir: rootDir});
	t.truthy(dependencies_.hasOwnProperty('dependencies'));
	t.false(dependencies_.hasOwnProperty('peerDependencies'));
	t.false(dependencies_.hasOwnProperty('optionalDependencies'));
});

test('async - removePrefix option', async t => {
	const dependencies_ = await readDep({removePrefix: true});
	t.is(dependencies_.devDependencies.ava, '3.13.0');
	t.is(dependencies_.devDependencies.xo, '0.33.1');
});

test('async - flattenPackages option', async t => {
	const dependencies_ = await readDep({flattenPackages: true});
	t.deepEqual(dependencies_, {foo: '~1.0.0', ava: '^3.13.0', xo: '^0.33.1'});
});

test('async - with removePrefix and flattenPackages option', async t => {
	const dependencies_ = await readDep({removePrefix: true, flattenPackages: true});
	t.deepEqual(dependencies_, {foo: '1.0.0', ava: '3.13.0', xo: '0.33.1'});
});

test('sync', t => {
	const dependencies_ = readDep.sync();
	t.truthy(dependencies_.hasOwnProperty('dependencies'));
});

test('sync - dir option', t => {
	const dependencies_ = readDep.sync({dir: rootDir});
	t.truthy(dependencies_.hasOwnProperty('dependencies'));
});

test('sync - removePrefix option', t => {
	const dependencies_ = readDep.sync({removePrefix: true});
	t.is(dependencies_.devDependencies.ava, '3.13.0');
	t.is(dependencies_.devDependencies.xo, '0.33.1');
});

test('sync - flattenPackages option', t => {
	const dependencies_ = readDep.sync({flattenPackages: true});
	t.deepEqual(dependencies_, {foo: '~1.0.0', ava: '^3.13.0', xo: '^0.33.1'});
});

test('sync - with removePrefix and flattenPackages option', t => {
	const dependencies_ = readDep.sync({removePrefix: true, flattenPackages: true});
	t.deepEqual(dependencies_, {foo: '1.0.0', ava: '3.13.0', xo: '0.33.1'});
});