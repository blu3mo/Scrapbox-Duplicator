# Scrapbox-duplicater

Scrapboxの非公開・公開プロジェクトを分けて運用する際に面倒な「ページの転送」を自動で行います。

## スタートガイド

このソースコードの実行自体は、Herokuのボタン（'Deploy to Heroku'）を押した後に求められる文字列を入力するだけです。**ここからはローカルで再現する手順を記載します。**

### 必要なもの

1. ScrapboxのSID（詳しくは [こちら](https://scrapbox.io/blu3mo-public/Scrapbox%E3%81%AESID)）
2. インポート先（本来はpublicプロジェクト）
3. インポート元（本来はprivateプロジェクト）




### インストール

nodeが動作する環境が必要です、他には「[puppeteer](https://pptr.dev/)」というライブラリーをインストールする必要があります。

まずはnodeが動作するかどうかを確認

```
node -v
```

それから

```
npm -v
npm i puppeteer
```

これでいい感じになるはず





##  デプロイ



[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://dashboard.heroku.com/new?template=https%3A%2F%2Fgithub.com%2Ftkgshn%2Fscrapbox-duplicater%2Ftree%2Fmaster)


## コントリビューション

 [CONTRIBUTING.md](https://github.com/tkgshn/scrapbox-duplicater/blob/master/CONTRIBUTING.md) 


## 著者

-   [blumo](https://twitter.com/blu3mo)
-   [tkgshn](https://twitter.com/tkgshn)

このプロジェクトへの[貢献者のリスト](https://github.com/tkgshn/scrapbox-duplicater/blob/master/CONTRIBUTING.md)もご覧ください。

## ライセンス


検討中

## 謝辞

-   blumo天才や
-   scrapbox愛してる
