# Firebase 部署設定

## 1. 建立 Firebase 專案

在 Firebase Console 建立專案，啟用：

- Authentication：Google 登入
- Firestore Database：Production mode
- Functions
- Hosting

## 2. 設定專案 ID

複製 `.firebaserc.example` 成 `.firebaserc`，把 `your-firebase-project-id` 改成實際 Firebase 專案 ID。

## 3. 設定第一位管理員

複製 `functions/.env.example` 成 `functions/.env`，設定：

```env
FIRST_ADMIN_EMAIL=your-admin@gmail.com
```

這個 Google 帳號第一次登入後會自動建立為管理員。

## 4. 安裝與部署

```bash
npm install
npm --prefix functions install
npm run deploy
```

部署完成後，請使用 Firebase Hosting 網址開啟系統。第一位管理員登入後，可到「後台」建立其他使用者帳號與角色。
