# scrapbox-duplicator

Scrapboxの非公開・公開プロジェクトを分けて運用する際に面倒な「ページの転送」を自動で行います。

## 仕組み

以下の処理の定期実行によって、公開したいページのみ転送されたミラープロジェクトが作られます。

- 転送元プロジェクトの内容をエクスポート
- エクスポートされたjsonファイルから`[public.icon]`が含まれているページのみを抽出
- 抽出されたページを転送先プロジェクトへインポート

## スタートガイド

以下の2ステップで実行可能です。

1. 下のボタン（'Deploy to Heroku'）を押し、必要な情報を入力。

[![Run on Google Cloud](https://deploy.cloud.run/button.svg)](https://deploy.cloud.run)

### 必要なもの

1. `SID` ScrapboxのSID（詳しくは
   [こちら](https://scrapbox.io/nishio/Scrapbox%E3%81%AEprivate%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88%E3%81%AEAPI%E3%82%92%E5%8F%A9%E3%81%8F)
   ）
2. `SOURCE_PROJECT_NAME` 転送元のプロジェクト名
3. `DESTINATION_PROJECT_NAME` 転送先のプロジェクト名

### 注意事項

- まともにテストしていないので、**自己責任で使用してください**。使用前にプロジェクトのバックアップ取得をお勧めします。
- SIDは漏れた場合にリセットする手段が無さそうなので、気をつけて扱ってください。サブアカウントのSID等を使用する事をお勧めします。（詳しくは
  [こちら](https://scrapbox.io/nishio/Scrapbox%E3%81%AEprivate%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88%E3%81%AEAPI%E3%82%92%E5%8F%A9%E3%81%8F)
  ）
- export APIは使用回数に制限があるので、定期実行は一日2~3回程度が良いと思います。

## その他

- Scrapbox
  Duplicatorは定期実行のタイミングまで待たないと転送されません。好きなタイミングで公開したい場合は、[このUserScript](https://scrapbox.io/blu3mo-public/%E3%83%9A%E3%83%BC%E3%82%B8%E8%BB%A2%E9%80%81%E3%81%99%E3%82%8B%E6%8B%A1%E5%BC%B5script)を一緒に使う事をお勧めします。

## 謝辞

- Scrapboxを開発しているNota, Inc.の皆さんに感謝します