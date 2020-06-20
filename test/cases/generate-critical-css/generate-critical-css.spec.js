const assert = require('assert');
const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const path = require('path');
const webpackConfig = require('./webpack.config');
const webpack = require('webpack');

describe('HtmlCriticalWebpackPlugin Cases: Generate Critical CSS', () => {
  const buildDirectory = path.resolve(__dirname, 'build');

  describe('minimum configuration', () => {
    let document;

    before((done) => {
      webpack(webpackConfig, () => {
        const indexHtmlString = fs.readFileSync(`${buildDirectory}/index.html`, { encoding: 'utf8' });

        document = new JSDOM(indexHtmlString).window.document;

        done();
      });
    });

    it('should generate the expected critical inline <style> tag', () => {
      const inlineStyleTags = document.querySelectorAll('style');

      assert.equal(inlineStyleTags.length, 1);
      assert.equal(inlineStyleTags[0].getAttribute('type'), 'text/css');
    });

    it('should generate the expected critical <link> tag', () => {
      const linkTags = document.querySelectorAll('link');

      assert.equal(linkTags.length, 2);
      assert.equal(linkTags[0].getAttribute('rel'), 'preload');
      assert.equal(linkTags[0].getAttribute('as'), 'style');

      assert.equal(linkTags[1].getAttribute('rel'), 'preload');
      assert.equal(linkTags[1].getAttribute('as'), 'style');
    });

    it('should generate the expected critical <noscript> tag', () => {
      const noscriptTags = document.querySelectorAll('noscript');

      assert.equal(noscriptTags.length, 2);
    });

  });

  describe('public path', () => {
    let document;

    const output = Object.assign({ publicPath: '//cdn.example.com/' }, webpackConfig.output);
    const config = Object.assign({}, webpackConfig, { output: output });

    before((done) => {
      webpack(config, () => {
        const indexHtmlString = fs.readFileSync(`${buildDirectory}/index.html`, { encoding: 'utf8' });

        document = new JSDOM(indexHtmlString).window.document;

        done();
      });
    });

    it('should generate the expected critical inline <style> tag', () => {
      const inlineStyleTags = document.querySelectorAll('style');

      assert.equal(inlineStyleTags.length, 1);
      assert.equal(inlineStyleTags[0].getAttribute('type'), 'text/css');
    });

    it('should contain publicPath prefix in link[href]', () => {
      const cssAssets = [].slice.call(document.querySelectorAll('link[href]'), 0).map(link => link.getAttribute('href'));

      assert.ok(cssAssets.every(asset => new RegExp(`^${config.output.publicPath}`).test(asset)));
    });

    it('should contain publicPath prefix in script[src]', () => {
      const jsAssets = [].slice.call(document.querySelectorAll('script[src]'), 0).map(script => script.getAttribute('src'));

      assert.ok(jsAssets.every(asset => new RegExp(`^${config.output.publicPath}`).test(asset)));
    });
  });

});