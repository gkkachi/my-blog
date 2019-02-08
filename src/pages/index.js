import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/Bio"
import Layout from "../components/Layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allSitePage.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="All posts"
          keywords={[`blog`, `gatsby`, `javascript`, `react`]}
        />
        <Bio />
        {posts.map(({ node }) => {
          const c = node.context
          const title = c.title || c.slug
          return (
            <div key={c.slug}>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{ boxShadow: `none` }} to={c.slug}>
                  {title}
                </Link>
              </h3>
              <small>{c.date}</small>
              <p dangerouslySetInnerHTML={{ __html: c.excerpt }} />
            </div>
          )
        })}
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allSitePage(sort: {fields: [context___date], order: DESC}, filter: {path: {regex: "/^\/blog\/.*\/$/"}}) {
      edges {
        node {
          context {
            slug
            excerpt
            title
            date(formatString: "YYYY年MM月DD日")
          }
        }
      }
    }
  }
`
