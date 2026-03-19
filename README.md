# ☕ CafeAvailabilityApp

<div align="center">

<!-- Tech Stack Icons -->
<img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
<img src="https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white" />
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
<img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" />
<img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />

</div>

---

## 🇹🇷 Türkçe

**React Native** ve **Expo** ile geliştirilmiş, **Firebase** destekli bir kafe yönetim uygulaması. Kafe personelinin masa müsaitliğini yönetmesine, rezervasyonları takip etmesine, menüyü görüntülemesine ve müşteri yorumlarını okumasına olanak tanır — hepsi gerçek zamanlı olarak.

### 📱 Özellikler

#### 🪑 Masa Yönetimi
- Tüm masaları ızgara düzeninde görüntüleme
- Renk kodlu masa durumu:
  - 🟢 **Yeşil** — Boş (Müsait)
  - 🔴 **Kırmızı** — Dolu
  - 🟠 **Turuncu** — Rezerve
- Masaya dokunarak durum güncelleme: **Dolu**, **Rezerve** veya **Boş**
- Masa durumları **Firebase Firestore**'da anlık güncellenir

#### 📋 Menü
- Firestore'dan çekilen yemek ve içecekleri listele (isim, malzeme, fiyat)
- **Course** (Yemek) ve **Beverage** (İçecek) kategorileri

#### 📅 Rezervasyonlar
- O anda rezerve edilmiş masaların listesi, anlık olarak Firestore'dan çekilir

#### 💬 Yorumlar
- Müşteri yorumlarını okuma; kafe ID'sine göre filtrelenir

#### ℹ️ Kafe Bilgisi
- Kafe adı, fotoğrafı ve yıldız puanı
- **Menü** ve **Rezervasyonlar** ekranlarına hızlı erişim

### 🛠️ Teknoloji Yığını

| Teknoloji | Versiyon |
|---|---|
| React Native | 0.74.1 |
| Expo | ~51.0.8 |
| TypeScript | ~5.3.3 |
| Firebase (Firestore) | ^10.12.2 |
| React Navigation | ^6.x |
| NativeWind (TailwindCSS) | ^2.0.11 |

### 📁 Proje Yapısı

```
CafeAvailabilityApp/
├── App.tsx                   # Kök bileşen, navigasyon yapısı
├── firebase.ts               # Firebase başlatma ve Firestore referansları
├── screens/
│   ├── TableScreen.tsx       # Masa ızgarası ve durum yönetimi
│   ├── MenuScreen.tsx        # Menü listesi
│   ├── ReservationScreen.tsx # Rezerve masalar
│   ├── CommentScreen.tsx     # Müşteri yorumları
│   └── UpdateMenuItem.tsx    # Menü öğesi düzenleme
├── data/                     # Tip tanımlamaları
└── assets/                   # Görseller
```

### 🚀 Başlarken

```bash
git clone https://github.com/YavuzSelimMeletlioglu/CafeAvailabilityApp.git
cd CafeAvailabilityApp
npm install
npm start        # veya: npm run ios / npm run android
```

**Firebase Firestore** veritabanınızda kafe belgesi altında şu koleksiyonlar bulunmalıdır:
- **Table** — `isOccupied`, `isReserved` alanları
- **Menu** — `name`, `price`, `ingredients`, `category` alanları
- **comments** — `cafeid`, `username`, `comment` alanları

### 🧭 Navigasyon Yapısı

```
Stack Navigator
├── MainScreenTabs (Alt Sekme)
│   ├── TableScreen     → Masalar
│   ├── CafeInfoScreen  → Kafe Bilgisi
│   └── CommentScreen   → Yorumlar
├── ReservationScreen
├── MenuScreen
└── MenuItemScreen
```

---

## 🇬🇧 English

A **React Native** mobile app built with **Expo** and **Firebase** that enables cafe staff to manage table availability, track reservations, browse the menu, and read customer feedback — all in real time.

### 📱 Features

#### 🪑 Table Management
- View all tables in a grid layout with color-coded status:
  - 🟢 **Green** — Available
  - 🔴 **Red** — Occupied
  - 🟠 **Orange** — Reserved
- Tap any table to update its status: **Occupied**, **Reserved**, or **Empty**
- Table states are persisted in **Firebase Firestore** in real time

#### 📋 Menu
- Browse food & beverage items (name, ingredients, price) fetched from Firestore
- Separate **Course** and **Beverage** categories

#### 📅 Reservations
- View all currently reserved tables, fetched live from Firestore

#### 💬 Comments
- Read customer feedback filtered by cafe ID

#### ℹ️ Cafe Info
- Cafe name, photo, and star rating
- Quick-access buttons to **Menu** and **Reservations**

### 🛠️ Tech Stack

| Technology | Version |
|---|---|
| React Native | 0.74.1 |
| Expo | ~51.0.8 |
| TypeScript | ~5.3.3 |
| Firebase (Firestore) | ^10.12.2 |
| React Navigation | ^6.x |
| NativeWind (TailwindCSS) | ^2.0.11 |

### 📁 Project Structure

```
CafeAvailabilityApp/
├── App.tsx                   # Root component, navigation setup
├── firebase.ts               # Firebase init & Firestore references
├── screens/
│   ├── TableScreen.tsx       # Table grid & status management
│   ├── MenuScreen.tsx        # Menu listing
│   ├── ReservationScreen.tsx # Reserved tables list
│   ├── CommentScreen.tsx     # Customer comments
│   └── UpdateMenuItem.tsx    # Menu item edit screen
├── data/                     # Type definitions
└── assets/                   # Images & static files
```

### 🚀 Getting Started

```bash
git clone https://github.com/YavuzSelimMeletlioglu/CafeAvailabilityApp.git
cd CafeAvailabilityApp
npm install
npm start        # or: npm run ios / npm run android
```

Your **Firebase Firestore** database should have these collections under the cafe document:
- **Table** — `isOccupied`, `isReserved` fields
- **Menu** — `name`, `price`, `ingredients`, `category` fields
- **comments** — `cafeid`, `username`, `comment` fields

### 🧭 Navigation Structure

```
Stack Navigator
├── MainScreenTabs (Bottom Tabs)
│   ├── TableScreen     → Tables
│   ├── CafeInfoScreen  → Cafe Info
│   └── CommentScreen   → Comments
├── ReservationScreen
├── MenuScreen
└── MenuItemScreen
```

---

<div align="center">
Made with ❤️ using React Native & Firebase
</div>
