---
title: Planckキーボードの無線化計画
date: '2019-02-28T06:23:28.011Z'
tags: ["keyboard"]
---

前回の記事でPlanckキーボードを紹介しました。
現在Planckキーボードを使っていて概ね満足しているのですが、一点だけ不満がある点があります。
それは有線接続であることです。

身の回りのデバイスがどんどん無線化していく中で、いつの間にか有線接続の面倒くささに耐えられない体になってしまったようです。
そのため、Planckキーボードを無線化できないか調査してみました。

手始めにQMKのドキュメントを見てみると、[Bluetoothの項目](https://docs.qmk.fm/#/feature_bluetooth)があります。
（QMKとはキーボードのファームウェアです。）

Bluetoothの項目を読んでみると、どうやら大きく分けて3通りの方法があるようです。
その3つの方法のうち、最後に紹介されているBluefruit LE SPI Friendは、BLEとよばれる最近のプロトコルを使用できるようです。
BLEは消費電力に優れているため、キーボード用途にはうってつけそうです。

Bluefruit LE SPI FriendはSPIプロトコルでやり取りすることができるようになっているBluetoothのモジュールです。
これだけ聞くとマイコンにこのモジュールを接続し頑張る必要があるように思えますが、もっとお手軽な方法が紹介されています。
つまり、Feather 32u4 Bluefruit LE を用いる方法です。

Feather 32u4 Bluefruit LE は簡単に言うとマイコンとBluetoothモジュールが一体となったものです。
これ1つで簡単にBluetooth対応のキーボードが作れそうです。

ただ、QMKでサポートされているとはいえ、設定ファイルはある程度カスタマイズする必要があるようです。
[wanleg](https://github.com/qmk/qmk_firmware/blob/master/users/wanleg/rules.mk)さんのコードが参考になりそうですが、実機で試したわけではないので今後詳しく調査しようと思います。

以上、PlanckキーボードのBluetooth化計画（妄想）でした！
