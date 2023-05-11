const Image = require("@11ty/eleventy-img");
const MarkdownIt = require("markdown-it");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy('src/assets/img/**/*');
  eleventyConfig.addPassthroughCopy({ 'src/posts/img/**/*': 'assets/img/' });

  eleventyConfig.addWatchTarget("src/assets/js/");

  eleventyConfig.addLayoutAlias('default', 'layouts/default.njk');
  eleventyConfig.addLayoutAlias('post', 'layouts/post.njk');

  eleventyConfig.addFilter('readableDate', require('./lib/filters/readableDate'));
  eleventyConfig.addFilter('minifyJs', require('./lib/filters/minifyJs'));
  eleventyConfig.addFilter('markdown-it', require('./lib/filters/markdown-it'));

  eleventyConfig.addTransform('minifyHtml', require('./lib/transforms/minifyHtml'));

  eleventyConfig.addCollection('posts', require('./lib/collections/posts'));
  eleventyConfig.addCollection('tagList', require('./lib/collections/tagList'));
  eleventyConfig.addCollection('pagedPosts', require('./lib/collections/pagedPosts'));
  eleventyConfig.addCollection('pagedPostsByTag', require('./lib/collections/pagedPostsByTag'));

  eleventyConfig.addShortcode("image", async function (src, alt, sizes) {
    let metadata = await Image(src, {
      widths: [400, 900],
      formats: ["png"],
      urlPath: "../assets/images/",
      outputDir: "./dist/assets/images/"
    });

    let imageAttributes = {
      alt,
      sizes,
      loading: "lazy",
      decoding: "async"
    };

    // You bet we throw an error on a missing alt (alt="" works okay)
    return Image.generateHTML(metadata, imageAttributes);
  });
  
  const mdRender = new MarkdownIt({
    html: true
  });
  eleventyConfig.addFilter("renderUsingMarkdown", function(rawString) {
    return mdRender.render(rawString);
  });
  
  return {
    dir: {
      input: 'src',
      output: 'dist',
    },
    // pathPrefix: "/subfolder/",
    templateFormats: ['md', 'njk', 'html'],
    dataTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
  };
};
