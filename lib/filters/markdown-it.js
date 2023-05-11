module.exports = function(eleventyConfig) { 
     const MarkdownIt = require("markdown-it");
     const mdRender = new MarkdownIt();
     eleventyConfig.addFilter("renderUsingMarkdown", function(rawString) {
       return mdRender.render(rawString);
     });
   }