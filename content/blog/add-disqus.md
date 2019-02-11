---
title: Gatsbyにコメント機能を追加 by using Disqus
date: "2019-02-04T05:41:55.341Z"
tags: ["gatsby", "disqus"]
---

本ブログに[Disqus](https://disqus.com/)を使ってコメント機能を追加しました。

Disqusとはブログのコメントに特化したサービスで、個人レベルの利用なら無料で使えます。
静的サイトにはいわゆる「サーバ」は存在しないため、コメント機能を追加するのにDisqusは大変便利なサービスです。

詳しいやり方は[こちらの記事](https://mk.gg/add-disqus-comments-to-gatsby-blog/)を参考にしてください。
大まかな流れだけ説明すると、

1. Disqusに登録
2. `disqus-react`を追加
3. `src/templates/blog-post.js`にDisqusのReactコンポーネントを追加

となります。

便利な世の中やな〜
