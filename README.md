# Interactive To-Do List

An animated, modern, and fully interactive to-do list built with
**HTML**, **CSS**, and **Vanilla JavaScript**.\
This project focuses on smooth micro-interactions, local storage
persistence, and a clean UI with aesthetic motion.

## Features

-   Add, edit, complete, and delete tasks.
-   Real-time task statistics: total, completed, and pending.
-   Smooth animations for adding, completing, and removing tasks.
-   LocalStorage support so tasks stay even after refreshing.
-   Custom checkbox animation.
-   Ripple effect on buttons.
-   Floating particle background for a dynamic aesthetic.
-   Empty state placeholders.

## Tech Stack

-   **HTML5**
-   **CSS3** (animations, glassmorphism, gradients)
-   **JavaScript (ES6+)**
-   **Font Awesome** for icons

## Project Structure

    /
    │── index.html
    │── assets/
    │   ├── css/
    │   │   └── style.css
    │   └── js/
    │       └── index.js

## How It Works

### 1. Task Management

All tasks are stored in `localStorage` and updated using an array of
task objects:

``` js
{
  id: 123456789,
  text: "My task",
  completed: false,
  createdAt: "2025-01-01T10:00:00.000Z"
}
```

### 2. Rendering

Each task is inserted dynamically into the DOM with status-based styles
and interactions.

### 3. Stats Update

The app calculates: - Total tasks\
- Completed tasks\
- Pending tasks

...and updates them instantly.

### 4. Animations

The project includes: - Slide in/out on add or delete - Checkbox pulse
animation - Button ripple effect - Success pop-up feedback - Floating
particles using JS-generated DOM nodes

## How to Run the Project

1.  Download or clone the repository.
2.  Open **index.html** in your browser.\
    No build step needed.

## Future Improvements

-   Dark/light mode toggle
-   Category or priority tags
-   Search and filter system
-   Drag-and-drop task sorting

## License

This project is open for personal and educational use.

------------------------------------------------------------------------

Built with focus, snacks, and good vibes. ✨
