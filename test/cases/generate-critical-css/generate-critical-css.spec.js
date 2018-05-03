const assert = require('assert');
const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const path = require('path');
const rimraf = require('rimraf');
const webpackConfig = require('./webpack.config');
const webpack = require('webpack');

describe('HtmlCriticalWebpackPlugin Cases: Generate Critical CSS', () => {
  const buildDirectory = path.resolve(__dirname, 'build');

  describe('minimum configuration', () => {

    it('should generate the expected critical inline <style> tag', (done) => {
      webpack(webpackConfig, () => {
        const indexHtmlString = fs.readFileSync(`${buildDirectory}/index.html`, {encoding: 'utf8'});
        const indexHtmlDom = new JSDOM(indexHtmlString);
        const inlineStyleTags = indexHtmlDom.window.document.querySelectorAll('style');
        
        assert.equal(inlineStyleTags.length, 1);
        assert.equal(inlineStyleTags[0].getAttribute('type'), 'text/css');

        done();
      });
    });

    it('should generate the expected critical <link> tag', (done) => {
      webpack(webpackConfig, () => {
        const indexHtmlString = fs.readFileSync(`${buildDirectory}/index.html`, {encoding: 'utf8'});
        const indexHtmlDom = new JSDOM(indexHtmlString);
        const linkTags = indexHtmlDom.window.document.querySelectorAll('link');
        
        assert.equal(linkTags.length, 2);
        assert.equal(linkTags[0].getAttribute('rel'), 'preload');
        assert.equal(linkTags[0].getAttribute('as'), 'style');

        done();
      })
    });

    it('should generate the expected critical <noscript> tag', (done) => {
      webpack(webpackConfig, () => {
        const indexHtmlString = fs.readFileSync(`${buildDirectory}/index.html`, {encoding: 'utf8'});
        const indexHtmlDom = new JSDOM(indexHtmlString);
        const noscriptTags = indexHtmlDom.window.document.querySelectorAll('noscript');
        
        assert.equal(noscriptTags.length, 2);

        done();
      });
    });

  });

});