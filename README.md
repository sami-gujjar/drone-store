# 🚁 DroneVerse — 3D Drone Store & Simulator

An interactive e-commerce web application where users can explore drones in full 3D, inspect real-time specifications, compare models side-by-side, and even take a virtual test flight before purchasing.

Built as an internship project combining **Frontend Development, JavaScript Logic, 3D Graphics, and E-commerce concepts** in a single production-quality application.

---

## 🔗 Live Demo

- **Netlify:** https://drone-verse.netlify.app/
- **GitHub Pages:** https://sami-gujjar.github.io/drone-store/

## 📂 Repository

(https://github.com/sami-gujjar/drone-store)

---

## 📸 Screenshots

<img width="960" height="439" alt="image" src="https://github.com/user-attachments/assets/795b222b-eb42-47ce-b957-0409706e789d" />

<img width="1919" height="877" alt="image" src="https://github.com/user-attachments/assets/82081a0a-1243-46e1-93a4-2a9ff3cbfec7" />

<img width="960" height="439" alt="image" src="https://github.com/user-attachments/assets/3a16e6db-e8ba-47e7-b457-f488d8cd644e" />




---

## ✨ Features

- **Real 3D Drone Models** — Every drone is rendered using actual `.glb` 3D models (not static images), viewable from any angle with orbit controls.
- **Interactive Drone Cards** — Each product card shows a live, auto-rotating 3D preview instead of a flat thumbnail.
- **Drone Detail Pages** — Full specifications, tabbed content (Specs / Features / Reviews), animated battery & range meters, and an "Add to Cart" flow.
- **Shopping Cart** — Add, remove, and update quantities with real-time total calculation, powered by React Context.
- **Compare Tool** — Select any two drones and compare specs side-by-side in a clean table.
- **Flight Simulator (Bonus Feature)** — Take any drone for a live test flight:
  - Realistic nose-first movement physics (thrust, yaw, banking, pitch)
  - Smooth takeoff animation and chase camera
  - Live HUD showing altitude and speed
  - Full **keyboard controls** (W/A/S/D, Space, Shift) on desktop
  - Full **on-screen touch controls** on mobile/tablet devices
- **Responsive Design** — Fully functional across desktop, tablet, and mobile.
- **Error Handling** — Graceful fallback UI if a 3D model fails to load, instead of crashing the app.

---

## 🛠️ Tech Stack

- **React 18** + **Vite** — frontend framework & build tool
- **React Router** — client-side routing
- **Tailwind CSS** — utility-first styling
- **Three.js** + **React Three Fiber** + **Drei** — 3D rendering, model loading, camera controls
- **React Context API** — global cart state management
- **React Icons** — icon library

---

## 🚀 How to Run Locally

1. **Clone the repository**
```bash
   git clone https://github.com/YOUR_USERNAME/drone-store.git
   cd drone-store
```

2. **Install dependencies**
```bash
   npm install
```

3. **Run the development server**
```bash
   npm run dev
```

4. Open the local URL shown in the terminal (usually `http://localhost:5173`)

### Build for production
```bash
npm run build
```

---

## 📁 Project Structure
src
├── components      # Reusable UI + 3D components
├── pages           # Route-level pages (Home, Drones, Detail, Cart, Compare, Simulator)
├── data            # Drone specification data
├── context         # Cart state (React Context)
├── hooks           # Custom hooks (keyboard controls, shared control state)
public
└── Models          # .glb 3D drone model files

---

## 🤖 How AI Was Used

This project was built with significant assistance from **Claude (Anthropic)** as a collaborative coding partner throughout development. AI was used to:

- Scaffold the initial project structure (React + Vite + Tailwind + React Router setup)
- Generate component code for the drone cards, navbar, cart system, and page layouts
- Design and implement the 3D drone viewer using React Three Fiber, including automatic model centering/scaling to handle inconsistencies between different `.glb` files
- Build the Flight Simulator's physics-based movement system (thrust, yaw, banking/pitch, chase camera)
- Implement responsive touch controls for mobile/tablet flight simulation
- Debug runtime errors (e.g., broken imports, app crashes) by analyzing error messages and stack traces
- Add error boundaries for graceful failure handling
- Write this documentation

All AI-generated code was reviewed, tested, and integrated manually, with iterative feedback given to refine behavior (e.g., correcting drone movement to be nose-first instead of strafing, fixing model scale inconsistencies, and troubleshooting deployment).

---

## 👤 Author

**Samiullah Liaqat**  
Project
https://www.linkedin.com/in/samiullahliaqat12


