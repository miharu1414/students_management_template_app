# students_management_template_app

このアプリケーションは、学習塾・スクール向けに 生徒の出欠管理・クラス管理・生徒の緊急連絡先やメモ などを一元管理する Web アプリケーションです。

フロントエンドは React 18 + TypeScript + chakra ui、バックエンドは Flask (Python) で構築しています。

# Installation

本リポジトリからのインストールではなく，WEBアプリケーション化されているため，以下のurlからアクセスしてください． 
<https://develop.trainers1106.com/build/>

機能体験用ユーザー情報
- ユーザーID：admin
- パスワード：1234

# Features

- 振替ロジックに対応（生徒の振替授業の計算に用いられている複雑なロジックに対応）

- ワンタップ出席登録 ― 生徒の出席状況を１画面で簡単に記録

- 生徒 ― 出欠・振替情報を1画面に集約

 
# Requirement

| レイヤ           | 必須バージョン例                     | 主なライブラリ                                                  |
| ------------- | ---------------------------- | -------------------------------------------------------- |
| **Frontend**  | Node 20 / npm 10             | React 18, TypeScript, chakra ui, React Router |
| **Backend**   | Python 3.11                  | mysql-connector-python, requests, Flask, python-dotenv, flask-cors         |


# students_management_template_app　フロント部分

1. docker-compose build #最初だけ
2. docker-compose up -d
3. docker-compose ps　＃起動確認
4. docker exec -it students_management_template_app sh
5. npx create-react-app . --template @chakra-ui/typescript --use-npm #プロジェクト作成時に最初だけ
6. docker-compose down #停止
 
