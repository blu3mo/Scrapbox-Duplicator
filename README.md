# Scrapbox-Duplicator

Scrapboxの非公開・公開プロジェクトを分けて運用する際に面倒な「ページの転送」を自動で行います。

以下の処理の定期実行によって、公開したいページのみ転送されたミラープロジェクトが作成可能です。
- 転送元プロジェクトの内容をエクスポート
- エクスポートされたjsonファイルから`[public.icon]`が含まれているページのみを抽出
- 抽出されたページを転送先プロジェクトへインポート

## スタートガイド

このソースコードの実行自体は、Herokuのボタン（'Deploy to Heroku'）を押した後に求められる文字列を入力するだけです。

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://dashboard.heroku.com/new?template=https%3A%2F%2Fgithub.com%2Ftkgshn%2Fscrapbox-duplicater%2Ftree%2Fmaster)

### 必要なもの
1. ScrapboxのSID（詳しくは [こちら](https://scrapbox.io/nishio/Scrapbox%E3%81%AEprivate%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88%E3%81%AEAPI%E3%82%92%E5%8F%A9%E3%81%8F) ）
2. 転送元のプロジェクト名
3. 転送先のプロジェクト名

### 注意事項

- まともにテストしていないので、**自己責任で使用してください**。使用前にプロジェクトのバックアップ取得をお勧めします。
- SIDは漏れた場合にリセットする手段が無さそうなので、気をつけて扱ってください。サブアカウントのSID等を使用する事をお勧めします。




## 著者

-   [bluemo](https://twitter.com/blu3mo)
-   [tkgshn](https://twitter.com/tkgshn)

このプロジェクトへの[貢献者のリスト](https://github.com/tkgshn/scrapbox-duplicater/graphs/contributors)もご覧ください。

## ライセンス


検討中

## 謝辞

-   Scrapboxを開発しているNota, Inc.の皆さんに感謝します
