# Staff Portal UI

A modern React + TypeScript staff management application with GraphQL integration.

## Features

- 🔐 JWT-based authentication
- 📊 Grid and Tile view for employee data
- 🎨 Material-UI design system
- 🔄 Apollo Client for GraphQL
- 🗂️ State management with Zustand
- 📱 Responsive layout with hamburger and horizontal menus
- ✏️ CRUD operations for employee management
- 📈 Analytics and reports views

## Tech Stack

- **React 18** with TypeScript
- **Apollo Client** for GraphQL
- **Material-UI (MUI)** for UI components
- **React Router** for navigation
- **Zustand** for state management
- **Vite** for build tooling

## Prerequisites

- Node.js 16+ and npm/yarn
- Backend server running on `http://localhost:8080`

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd staff-portal-ui

# Install dependencies
npm install
```

## Environment Variables

Create a `.env` file:

```env
VITE_API_URL=http://localhost:8080
VITE_GRAPHQL_URL=http://localhost:8080/graphql
```

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Build

```bash
npm run build
```

The production-ready files will be in the `dist/` directory.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── apollo/          # Apollo Client configuration
├── components/      # React components
├── graphql/         # GraphQL queries and mutations
├── models/          # TypeScript interfaces
├── services/        # API services
├── store/           # Zustand state management
├── views/           # Page views
├── App.tsx          # Main app component
└── main.tsx         # Entry point
```

## Default Login Credentials

- **Username:** admin
- **Password:** adminpass

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## Features

### Views
- **Dashboard**: Overview with employee statistics and quick actions
- **Grid View**: Table with all employee data (ID, Name, Age, Class, Subjects, Attendance)
- **Tile View**: Card-based layout with 3-dot action menu (Edit, Flag, Details, Delete)
- **Details View**: Full employee information display
- **Analytics**: Data visualizations and insights
- **Reports**: Reporting functionality
- **Settings**: Application settings

### Navigation
- Hamburger menu with sub-menus (collapsible drawer)
- Horizontal top navigation bar
- Protected routes requiring authentication
- Persistent view state using Zustand

### Employee Management
- View employees in grid or tile format
- Add new employees via dialog form
- Edit employee information
- Delete employees with confirmation
- Color-coded attendance indicators (Present/Absent/Leave)
- Full CRUD operations via GraphQL mutations

## License

MIT