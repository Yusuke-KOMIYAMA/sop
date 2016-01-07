# 事前準備

以下のファイルをサーバにコピー。

* SenchaCmd-4.0.0.203-linux-x64.run.zip

## Sencha Cmdのインストール

```
cd
unzip SenchaCmd-4.0.0.203-linux-x64.run.zip
chmod 700 SenchaCmd-4.0.0.203-linux-x64.run
./SenchaCmd-4.0.0.203-linux-x64.run
rm SenchaCmd-4.0.0.203-linux-x64.run
```

.bashrcを再読み込みさせる。（再ログインなど。）

------------------------------------------------------------

# 開発の進め方



------------------------------------------------------------

# 既存システムの成果物からworkspace_sopを再現する方法

## ファイルの準備

以下のファイルをサーバにコピー。

* ext-4.2.1-commercial.zip
* sencha-touch-2.3.1-gpl.zip

## Ext JSを展開

```
cd
mkdir -p extjs-sdk
cd extjs-sdk
unzip ext-4.2.1-commercial.zip
```

## workspaceの作成

```
sencha -sdk ~/extjs-sdk/ext-4.2.1.883 generate workspace workspace_sop
sencha -sdk ~/extjs-sdk/touch-2.3.1   generate workspace workspace_sop
```

## ext-theme-sopのコピー

`ext-theme-sop`を`SOP_src_20141126/packages`から`workspace_sop/packages`にコピー。

## themeのビルド

```
cd workspace_sop/packages/ext-theme-sop
sencha package build
```

## sopのコピー

`sop`を`SOP_src_20141126/sop`から`workspace_sop/sop`にコピー。

## app.jsのビルド

最適化をかけていない素のjsを出力する。

```
cd workspace_sop/sop
sencha app build testing
```

## tablet/app.jsのビルド

```
cd workspace_sop/sop/tablet
sencha app build testing
```

## 成果物の確認

`workspace_sop/build/testing`以下に`app.js`などが作成されるので確認する。
