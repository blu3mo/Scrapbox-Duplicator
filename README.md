# Scrapbox Duplicator

Scrapboxの非公開・公開プロジェクトを分けて運用する際に面倒な「ページの転送」を自動で行います。

## 目次

- [仕組み](#仕組み)
- [スタートガイド](#スタートガイド)
- [必要なもの](#必要なもの)
- [注意事項](#注意事項)
- [その他](#その他)
- [謝辞](#謝辞)

## 仕組み

以下の処理の定期実行によって、公開したいページのみ転送されたミラープロジェクトが作られます。

1. 転送元プロジェクトの内容をエクスポート
2. エクスポートされたjsonファイルから`[public.icon]`が含まれているページのみを抽出
3. 抽出されたページを転送先プロジェクトへインポート

## スタートガイド

以下のステップで実行可能です。

1. このリポジトリをForkする
2. Forkしたリポジトリに環境変数を設定する

<!-- 環境変数の設定イメージ -->

以下の画像は環境変数の設定方法を示しています。
[![Image from Gyazo](https://i.gyazo.com/cd8630a6fb125c6d7e627b290fbe79ce.png)](https://gyazo.com/cd8630a6fb125c6d7e627b290fbe79ce)

<!-- すぐに動作確認がしたい時は手動で起動できる -->

動作確認をすぐに行いたい場合は、以下の画像のように手動で起動することが可能です。
[![Image from Gyazo](https://i.gyazo.com/e4762cda8e8566bb75d20a429c2f1cb1.png)](https://gyazo.com/e4762cda8e8566bb75d20a429c2f1cb1)

## 必要なもの

1. `SID`
   ScrapboxのSID（詳しくは[こちら](https://scrapbox.io/nishio/Scrapbox%E3%81%AEprivate%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88%E3%81%AEAPI%E3%82%92%E5%8F%A9%E3%81%8F)）
2. `SOURCE_PROJECT_NAME` 転送元のプロジェクト名
3. `DESTINATION_PROJECT_NAME` 転送先のプロジェクト名

## 注意事項

- まともにテストしていないので、**自己責任で使用してください**。使用前にプロジェクトのバックアップ取得をオススメします。
- SIDは漏れた場合にリセットする手段が無さそうなので、気をつけて扱ってください。サブアカウントのSID等を使用する事をオススメします。（詳しくは[こちら](https://scrapbox.io/nishio/Scrapbox%E3%81%AEprivate%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88%E3%81%AEAPI%E3%82%92%E5%8F%A9%E3%81%8F)）
- export
  APIは使用回数に制限があるので、定期実行は一日2~3回程度が良いと思います。

## その他

Scrapbox
Duplicatorは定期実行のタイミングまで待たないと転送されません。好きなタイミングで公開したい場合は、[このUserScript](https://scrapbox.io/blu3mo-public/%E3%83%9A%E3%83%BC%E3%82%B8%E8%BB%A2%E9%80%81%E3%81%99%E3%82%8B%E6%8B%A1%E5%BC%B5script)を一緒に使う事をオススメします。

## 謝辞

Scrapboxを開発しているNota, Inc. の皆さんに感謝します。
