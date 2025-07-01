# 🛰️ IP Address Tracker

IP Address Tracker is a responsive web application built with **React**, **TypeScript**, and **Context API**. It integrates the **IPify Geolocation API** to fetch IP address details and displays them dynamically on an interactive **Leaflet map**.  Designed for modern devices with smooth animations via **Framer Motion**.

![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-EF4F5F?style=for-the-badge&logo=framer&logoColor=white)
![Leaflet](https://img.shields.io/badge/Leaflet-199900?style=for-the-badge&logo=leaflet&logoColor=white)

---

## 🚀 Features

- 🌐 **IP Geolocation Lookup**: Fetches IP address data and displays location, ISP, timezone, and IP.
- 🗺 **Interactive Map**: Uses Leaflet to pinpoint the IP location on a dynamic map.
- 🔎 **Search Functionality**: Look up any IP address or domain to see live results.
- 🎨 **Fully Responsive**: Adapts gracefully across desktops, tablets, and mobile.
- ✨ **Animated UI**: Smooth transitions and micro-interactions with Framer Motion.
- ♿ **Accessible**: Follows best practices for keyboard and screen reader navigation.

---

## 🚢 Live Deployment
Coming soon..

## 🚀 Local Setup & Tailwind CSS Installation

To set up and run this project locally with Tailwind CSS and Vite:

1. **Clone the repository**

```bash
git clone https://github.com/YusufBolden/ip-address-tracker.git
cd ip-address-tracker
```

2. **Install project dependencies**

```
npm install
```

3. **Install Tailwind CSS (with Vite)**

```
npm install tailwindcss @tailwindcss/vite
```

4. **Configure the Vite plugin**

```
// vite.config.ts
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
})
```

5. **Import Tailwind in your CSS file**

```
/* src/index.css */
@import "tailwindcss";
```

6. **Start the dev server**

```
npm run dev
```

---

## 🗄️ File Structure
```
ip-address-tracker/
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── tailwind.config.ts
├── vite.config.ts
├── README.md
├── index.css
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── pages/
    │   └── HomePage.tsx
    ├── components/
    │   ├── IPForm.tsx
    │   ├── IPDetails.tsx
    │   └── IPMap.tsx
    ├── context/
    │   ├── IPContext.tsx
    │   └── useIP.ts
    └── types/
        └── index.ts
```
---

## 📸 Previews

<!-- ### Home Page
![Home Page](public/assets/login.png)

### Blog Index
![Blog List](public/assets/blogIndex.png)

### Admin Dashboard - upper
![Admin - upper](public/assets/adminUpper.png)

### Admin Dashboard - lower
![Admin - lower](public/assets/adminLower.png) -->

---

## 🧑🏿‍💻 Author

Created by [Yusuf Bolden](https://github.com/YusufBolden). Feedback and suggestions are welcome!

---

## 📄 License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
