# Ludo Game

This is a Ludo game built with React, initialized using Vite, and styled exclusively with Tailwind CSS. The game features a 15x15 grid board where players can move their pieces according to the rules of Ludo.

## Project Structure

```
ludo-game
├── src
│   ├── components
│   │   └── Board.tsx       # Contains the Board component rendering the game grid
│   ├── App.tsx             # Main application component
│   ├── main.tsx            # Entry point of the application
│   └── index.css           # Tailwind CSS and global styles
├── public
│   └── index.html          # Main HTML file for the React application
├── package.json            # npm configuration file
├── tsconfig.json           # TypeScript configuration file
├── vite.config.ts          # Vite configuration file
├── tailwind.config.ts      # Tailwind CSS configuration file
└── postcss.config.js       # PostCSS configuration file
```

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd ludo-game
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000` to see the game in action.

## Game Rules

- Each player has four pieces that start off the board.
- Players take turns rolling a die to move their pieces around the board.
- The objective is to move all four pieces to the home area before the other players.

Enjoy playing Ludo!