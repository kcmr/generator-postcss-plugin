import path from 'path';
import assert from 'yeoman-assert';
import helpers from 'yeoman-test';
import mockery from 'mockery';
import Promise from 'pinkie-promise';
import {app as generator} from './config';

describe('generator-postcss-plugin:app', () => {
  before(() => {
    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false
    });

    mockery.registerMock('npm-name', () => {
      return Promise.resolve(true);
    });
  });

  after(() => {
    mockery.disable();
  });

  describe('defaults', () => {
    before(() => {
      return helpers.run(path.join(__dirname, generator.src))
        .withOptions(generator.options)
        .withPrompts(generator.prompts)
        .toPromise();
    });

    /* TO-DO
    it('created and CD into a folder named like the plugin', () => {
      assert.equal(path.basename(process.cwd()), 'postcss-plugin-boilerplate');
    }); */

    it('creates project files', () => {
      assert.file([
        'package.json',
        'README.md',
        '.babelrc',
        '.editorconfig',
        '.eslintrc',
        '.gitignore',
        '.jestrc',
        '.npmignore',
        '.travis.yml'
      ]);
    });

    it('creates src files', () => {
      assert.file([
        'src/index.js'
      ]);
    });

    it('creates test files', () => {
      assert.file([
        '__tests__/fixtures.js',
        '__tests__/fixtures/sample.css',
        '__tests__/fixtures/sample.expected.css'
      ]);
    });

    it('fills package.json with correct information', () => {
      // eslint-disable-next-line new-cap
      assert.JSONFileContent('package.json', {
        name: 'postcss-plugin-boilerplate',
        description: 'PostCSS plugin boilerplate generated with generator-postcss-plugin',
        author: 'Mocha'
      });
    });
  });
});
