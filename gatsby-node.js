const path = require(`path`)
const _ = require("lodash")
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const markdownPage = path.resolve(`./src/templates/markdown-page.js`)
  const tagTemplate = path.resolve(`./src/templates/tags.js`)
  return graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                tags
              }
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create blog posts pages.
    const posts = result.data.allMarkdownRemark.edges
    const [blog_posts, other_posts] = _.partition(posts, post => post.node.fields.slug.indexOf("/blog/") > -1)

    blog_posts.forEach((post, index) => {
      const previous = index === blog_posts.length - 1 ? null : blog_posts[index + 1].node
      const next = index === 0 ? null : blog_posts[index - 1].node

      createPage({
        path: post.node.fields.slug,
        component: blogPost,
        context: {
          slug: post.node.fields.slug,
          previous,
          next,
        },
      })
    })

    // Tag pages:
    let tags = []
    // Iterate through each post, putting all found tags into `tags`
    _.each(blog_posts, edge => {
      if (_.get(edge, "node.frontmatter.tags")) {
        tags = tags.concat(edge.node.frontmatter.tags)
      }
    })
    // Eliminate duplicate tags
    tags = _.uniq(tags)

    // Make tag pages
    tags.forEach(tag => {
      createPage({
        path: `/tags/${_.kebabCase(tag)}/`,
        component: tagTemplate,
        context: {
          tag,
        },
      })
    })
    console.log(tags)

    other_posts.forEach((post, index) => {
      createPage({
        path: post.node.fields.slug,
        component: markdownPage,
        context: {
          slug: post.node.fields.slug,
          excerpt: post.node.excerpt,
          title: post.node.frontmatter.title,
        },
      })
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    let value = createFilePath({ node, getNode })
    if (node.fileAbsolutePath.indexOf(`content/blog`) > -1) {
      value = `/blog${value}`
    }
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
