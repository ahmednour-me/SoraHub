# 🖼️ SoraHub — Professional Batch Image Ecosystem

[![Deploy with Vercel](https://vercel.com/button)](https://sorahub.vercel.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-Latest-646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

**SoraHub** is a high-performance, privacy-centric web workstation engineered for seamless batch image conversion, surgical compression, and advanced transformations. By leveraging client-side processing, SoraHub ensures your creative assets never leave your local environment.

[**🚀 Explore Live Demo**](https://sorahub.vercel.app/) • [**📂 Report Bug**](https://github.com/ahmednour-me/sorahub/issues) • [**💡 Request Feature**](https://github.com/ahmednour-me/sorahub/issues)

---

## 💎 Core Value Propositions

* **Zero-Server Latency:** 100% Client-side processing using modern browser APIs.
* **Privacy by Design:** No tracking, no uploads, no data retention. Your privacy is a feature, not an afterthought.
* **Industrial Throughput:** Optimized for processing hundreds of images in parallel without UI freezing.
* **Universal Compatibility:** Seamlessly bridge the gap between legacy and modern image formats.

---

## 🛠️ Feature Deep Dive

### 1. Advanced Conversion Engine
* **Multi-Format Support:** Convert between **PNG, JPG, WebP, GIF, BMP, SVG, TIFF, ICO, AVIF, and HEIC**.
* **Intelligent Compression:** Granular control over quality-to-size ratios with real-time byte-size estimation.
* **Bulk Operations:** Unified settings applied across entire image batches.

### 2. Surgical Editing Suite
* **Dynamic Resizing:** Precision scaling with intelligent aspect-ratio locking.
* **Geometric Transforms:** 90°/180°/270° rotations and bi-directional flipping.
* **Visual Filters:** Professional-grade Grayscale, Brightness, and Contrast normalization.

### 3. Productivity Tools
* **PDF Compiler:** Instant conversion of image sequences into professional-grade PDF documents.
* **PWA Ready:** Installable on Desktop and Mobile with full offline capabilities.
* **Bi-Lingual Mastery:** Native, high-fidelity support for **Arabic (RTL)** and **English (LTR)**.

---

## 🏗️ The Tech Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | **React 18** | UI component architecture & state sync. |
| **Logic** | **TypeScript** | Type-safety and enterprise-grade reliability. |
| **Styling** | **Tailwind CSS + Shadcn/UI** | Responsive, accessible, and modern design system. |
| **Data Flow** | **TanStack Query** | Efficient client-side state management. |
| **Processing** | **jsPDF / Canvas API** | Localized image manipulation and document generation. |
| **Workflow** | **@dnd-kit** | Intuitive drag-and-drop file orchestration. |

---

## 🚀 Quick Start for Developers

```bash
# Clone the professional repository
git clone [https://github.com/ahmednour-me/sorahub.git](https://github.com/ahmednour-me/sorahub.git)

# Navigate to the project directory
cd sorahub

# Install dependencies
npm install

# Launch the optimized development server
npm run dev

# Build for production-ready deployment
npm run build
