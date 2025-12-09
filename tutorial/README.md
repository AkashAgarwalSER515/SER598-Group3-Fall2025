# **README.md — For the Tutorial Website**

# Group3 — Performant & Scalable Deployment Tutorial  
### SER598 (421) — Advanced Web Project • Fall 2025  
### Arizona State University

This repository contains the **React-based tutorial website** created by **Group3** for the  
SER598/421 Advanced Topics course project.  
The tutorial teaches learners how to build, containerize, deploy, scale, and optimize  
modern web applications using **Kubernetes, CDNs, caching, edge compute, and autoscaling**.

This tutorial is packaged as a **single-page React documentation site** using TailwindCSS.  
It is fully scrollable, includes a Table of Contents, and meets the project requirement of  
at least **3000 words** of instructional content (excluding code).

---

## 📘 What This Tutorial Covers

The tutorial explains and demonstrates the following concepts:

- Core cloud-native fundamentals (indirection, virtualization, containers, orchestration, CDNs)
- History & evolution of scalable deployment technologies
- Backend & frontend patterns for cloud-native apps  
- How to containerize applications using Docker  
- Local Kubernetes deployment using Minikube  
- Kubernetes concepts: Deployments, Services, Ingress, HPA  
- Cloud scaling & autoscaling (Horizontal Pod Autoscaler)  
- CDN-based acceleration and Cloudflare Worker edge caching  
- Hands-on exercises and measurable performance improvements  
- Analytical component with evidence-backed arguments  
- References and additional academic/industry resources  

This tutorial website is **NOT** the runnable demo app.  
The runnable demo lives inside the top-level `/demo` folder (as required by SER598).  
This folder contains only the **tutorial documentation**.

---

## 📁 Project Structure (Tutorial Folder Only)

```

tutorial/
│
├─ src/
│   ├─ App.jsx          # Complete tutorial website UI & content
│   ├─ main.jsx
│   └─ index.css
│
├─ index.html
├─ package.json
├─ tailwind.config.js
└─ README.md            # This file

````

---

## 🛠️ Prerequisites

You must have the following installed to run this tutorial website:

- **Node.js ≥ 18**
- **npm** or **yarn**
- **Vite** (comes automatically when running `npm install`)
- **TailwindCSS** (already configured in this project)

To verify:

```bash
node --version
npm --version
````

---

## 🚀 Getting Started (Running the Tutorial Locally)

### 1. Navigate into the tutorial folder:

```bash
cd tutorial
```

### 2. Install dependencies:

```bash
npm install
```

### 3. Start the development server:

```bash
npm run dev
```

You will see output similar to:

```
  VITE vX.X.X  ready in X ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.1.10:5173/
```

### 4. Open your browser

Visit:

```
http://localhost:5173/
```

You will see the full React-based tutorial website with:

* Sidebar Table of Contents
* Scrollable documentation
* Tailwind-styled content
* Code snippets
* Architecture diagrams
* Analytical component
* References & sources

---

## 🧪 Running a Production Build

To build the tutorial for production:

```bash
npm run build
```
---

## 📚 Additional Resources

For the references cited in the tutorial, see the "References" and "Additional Sources" sections inside the webpage itself.

---

## 👥 Team Members (Group3)

* Akash Agarwal
* Aarti Nemade
* Rushad Wankadia
* Rushit Kothari
