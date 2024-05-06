# Real-time Binance Trade Viewer

This project is a React application built with TypeScript that connects to a WebSocket API and displays real-time trade data. The application displays the latest trades from the Binance trading platform, updating in real-time as new trades occur.

## Objective

- Connect to a WebSocket API and display real-time trade data.
- Use TypeScript with React for a robust and type-safe development experience.
- Create a dynamic user interface to display the latest trades with details such as Trade ID, Price, Quantity, and Time.

## Requirements

- Connect to the WebSocket API at `wss://stream.binance.com:9443/ws/bnbbtc@trade`.
- Display the latest trades with details like Trade ID, Price, Quantity, and Time.
- Implement real-time updating as new trades come in from the WebSocket.
- Write tests for the React components to ensure functionality and reliability.

## Bonus Features

- Implemented a feature to switch between different trading pairs (e.g., ETH/BTC, LTC/BTC).
- Added a chart to visualize price changes over time.

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (Node Package Manager)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/kapilgundawar/onyx-capital-test.git
   cd onyx-capital-test
   npm install
   npm start
   npm run test
   ```
