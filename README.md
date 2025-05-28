# MedCode-Transformer (MCT) Website

A modern, responsive website showcasing the MedCode-Transformer architecture - an asymmetric encoder-decoder Transformer model designed for medical text processing and ICD-10 code generation.

## 🚀 Features

- **Interactive Architecture Visualization**: 3D-style neural network diagram showing the complete MCT architecture
- **Responsive Design**: Fully mobile-optimized with smooth animations
- **Two Operation Modes**: 
  - ICD Classification (encoder-only)
  - Synthetic Text Generation (encoder-decoder)
- **Modern Tech Stack**: Built with React, TypeScript, Tailwind CSS, and Framer Motion

## 🛠️ Technology Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Lucide React** for icons

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR-USERNAME/MCT-WEBSITE.git
   cd MCT-WEBSITE
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

   The site will be available at `http://localhost:3000`

## 🏗️ Building for Production

```bash
npm run build
```

This will create a production-ready build in the `dist` directory.

## 🚀 Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions on deploying to GitHub Pages.

Quick deployment:
```bash
npm run deploy
```

## 🏛️ Architecture Overview

The MedCode-Transformer features:
- **358.7M total parameters**
- **20 encoder layers** with interleaved local/global attention
- **7 decoder layers** for text generation
- **Hybrid tokenization** with 100K vocabulary
- **Factorized embeddings** for parameter efficiency

## 📁 Project Structure

```
MCT-WEBSITE/
├── src/
│   ├── components/
│   │   └── NeuralNetworkVisualization.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🔗 Links

- [Live Demo](https://YOUR-USERNAME.github.io/MCT-WEBSITE/)
- [Research Paper](#) (Add your paper link here)
- [GitHub Repository](https://github.com/YOUR-USERNAME/MCT-WEBSITE) 