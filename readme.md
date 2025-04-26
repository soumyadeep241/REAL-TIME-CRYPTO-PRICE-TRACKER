# Crypto Price Tracker

A real-time cryptocurrency price tracking dashboard built with React, Redux, and TypeScript. Features live price updates, sorting, and interactive charts.

![Demo GIF](https://youtu.be/i6f6ZFMl_bk?si=EtlGaSY-GjtlJXR7)

## Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **State Management**: Redux Toolkit
- **Styling**: TailwindCSS
- **Build Tool**: Vite
- **Real-time Updates**: Simulated WebSocket service
- **Charts**: Custom SVG-based charts
- **Icons**: Lucide React

## Architecture

The application follows a modern React architecture with the following structure:

```
src/
├── components/    # Reusable UI components
├── store/        # Redux store and slices
├── services/     # Mock WebSocket service
├── types/        # TypeScript interfaces
├── utils/        # Helper functions
└── data/         # Initial mock data
```

---

- Uses Redux for centralized state management
- Components are modular and reusable
- Real-time updates simulated with interval-based service
- Responsive design with Tailwind CSS
- Type-safe with TypeScript

## Features

- Real-time price updates every 2 seconds
- Sortable columns
- Price change indicators with animations
- 7-day mini charts
- Responsive layout
- Market cap and volume tracking
- Supply information

## Setup Instructions

1. Clone the repository:
2. Install dependencies:
   `npm install`
3. Start the development server:
   `npm run dev`
4. Build for production:
   `npm run build`
