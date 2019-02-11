---
title: gatsby-starter-blogで生成されるブログポストのURLを変更する
date: '2019-02-09T14:00:00.546Z'
tags: ["gatsby"]
---

## はじめに

gatsby-starter-blogで生成されるブログポストはルート直下にできます。
しかし、ブログポスト以外のページ（例えば自己紹介ページ）を作る予定がある場合、少々不便です。
また、デフォルトではすべてのマークダウンファイルをホームに表示するように書かれているため、ブログポスト以外のページをマークダウンで書くことはできません。（ブログポスト一覧に表示されてしまうから）

そこで、ブログポストは`/blog/`下に作られるようにし、ホームでは`/blog/`以下にあるページのみを表示させるようにしてみます。

## URLの変更

`content/blog`内にある場合だけURLを変更。

```diff
   const { createNodeField } = actions
 
   if (node.internal.type === `MarkdownRemark`) {
-    const value = createFilePath({ node, getNode })
+    let value = createFilePath({ node, getNode })
+    if (node.fileAbsolutePath.indexOf(`content/blog`) > -1) {
+      value = `/blog${value}`
+    }
     createNodeField({
       name: `slug`,
       node,
```

URLが変更されていることを確認しましょう。

```shell
gatsby deploy
```

## ブログポスト以外のページをマークダウンで書く

まずGatsbyに`src/pages`の中も見るように指示。

```diff
     siteUrl: `https://n.k-kachi.net/`,
   },
   plugins: [
+    {
+      resolve: `gatsby-source-filesystem`,
+      options: {
+        path: `${__dirname}/src/pages`,
+        name: `src`,
+      },
+    },
     {
       resolve: `gatsby-source-filesystem`,
       options: {
```

つづいて`src/pages`にマークダウンファイルを置く。

```markdown
---
title: About Me
---

Hello!!
```

この状態で一旦ホームにどう表示されるか見てみましょう。

```shell
gatsby deploy
```

一覧リストにAbout Meも表示されてしまっていますね。

## `/blog/`以下にあるページのみを表示

`node.fields.slug`にルート以下のパスが格納されているため、これが`/blog/`で始まる場合のみ表示されるようにします。

```diff
           keywords={[`blog`, `gatsby`, `javascript`, `react`]}
         />
         <Bio />
-        {posts.map(({ node }) => {
+        {posts
+        .filter(({ node }) => node.fields.slug.startsWith("/blog/"))
+        .map(({ node }) => {
           const title = node.frontmatter.title || node.fields.slug
           return (
             <div key={node.fields.slug}>
```

これでAbout Meのページが一覧からなくなったと思います。
一応About Meのページが存在することを`http://localhost:8000/about/`にアクセスして確認しましょう
