import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/Layout";
import SEO from "../components/seo";
import PostPreview from "../components/PostPreview";

const Tags = ({ pageContext, data, location }) => {
  const { tag } = pageContext;
  const { edges } = data.allMarkdownRemark;
  const siteTitle = data.site.siteMetadata.title;
  const title = `「${tag}」とタグ付けされた投稿`;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={title} description={title} />
      <h1>{title}</h1>
      <ul>
        {edges.map(({ node }) => {
          return (
            <PostPreview node={node} />
          );
        })}
      </ul>
    </Layout>
  );
};

export default Tags;

export const pageQuery = graphql`
  query($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          excerpt(truncate: true)
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "YYYY年MM月DD日")
          }
        }
      }
    }
  }
`;
