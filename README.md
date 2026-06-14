# springboot-vercel

A Node.js/TypeScript frontend client for interacting with Spring Boot APIs, deployable on Vercel.

## Overview

This project provides a modern TypeScript-based API client for communicating with Spring Boot backends. It includes:

- **High-level API service** with typed HTTP methods
- **Configurable HTTP client** with request/response logging
- **CLI application** for testing endpoints
- **Vercel-ready deployment** with serverless functions

## Live Demo

🚀 **Deployed Application**: [https://springboot-vercel-khaki.vercel.app/](https://springboot-vercel-khaki.vercel.app/)

## Project Structure

```
springboot-vercel/
├── frontend/
│   └── src/
│       ├── client.ts      # Low-level HTTP client wrapper
│       ├── api.ts         # High-level API service methods
│       └── index.ts       # CLI entry point
├── api/
│   └── index.js          # Vercel serverless function
├── vercel.json           # Vercel deployment configuration
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 14+ 
- npm or yarn
- TypeScript knowledge (optional for CLI usage)

### Installation

```bash
# Clone the repository
git clone https://github.com/pradeepamara4u/springboot-vercel.git
cd springboot-vercel

# Install dependencies
npm install
```

### Configuration

Create a `.env` file in the project root:

```env
API_BASE_URL=http://localhost:8080
```

The default API base URL is `http://localhost:8080` if not specified.

## Usage

### Running the CLI

```bash
# Development mode
npm run dev

# Build and run
npm run build
npm start
```

The CLI will test three endpoints:
1. **GET /** - Home endpoint
2. **GET /health** - Health check (optional)
3. **POST /api/data** - Data submission example

### Using the API Service

```typescript
import ApiService from './frontend/src/api';

const api = new ApiService('http://your-api-url:8080');

// GET request
const homeData = await api.getHome();

// Health check
const health = await api.getHealth();

// POST request
const result = await api.postData({ 
  message: 'Hello from TypeScript',
  timestamp: new Date().toISOString()
});
```

## API Methods

### `getHome(): Promise<string>`
Calls the home endpoint (`GET /`) and returns the response data.

### `getHealth(): Promise<any>`
Calls the health check endpoint (`GET /health`). Returns `null` if endpoint is not found.

### `postData(payload: any): Promise<any>`
Submits data to the API (`POST /api/data`). Returns the response data or `null` on error.

### `setBaseURL(baseURL: string): void`
Updates the API base URL at runtime.

### `getBaseURL(): string`
Returns the current API base URL.

## Deployment

### Vercel Deployment

1. **Connect your repository** to Vercel via the dashboard
2. **Configure environment variables** in Vercel project settings:
   ```
   API_BASE_URL=<your-spring-boot-api-url>
   ```
3. **Deploy** - Vercel will automatically build and deploy

The `vercel.json` configuration routes all requests to the serverless function at `api/index.js`.

**Deployed URL**: https://springboot-vercel-khaki.vercel.app/

## Language Composition

- **TypeScript**: 90.9%
- **Java**: 6.9%
- **JavaScript**: 2.2%

## Scripts

```bash
npm run build      # Compile TypeScript
npm start          # Run the compiled application
npm run dev        # Run with ts-node (development)
npm test           # Run tests (if configured)
```

## Error Handling

The API client includes try-catch blocks for robust error handling:

- Failed requests log warnings to the console
- Graceful fallbacks return `null` for optional endpoints
- Detailed error messages via chalk color-coded output

## Features

✅ **Typed HTTP Methods** - Full TypeScript support  
✅ **Colored Console Output** - Using chalk for better readability  
✅ **Environment Configuration** - Flexible API URL configuration  
✅ **Vercel Ready** - Pre-configured serverless deployment  
✅ **Error Handling** - Comprehensive error handling and logging  

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT

## Author

**Pradeep Amara** - [@pradeepamara4u](https://github.com/pradeepamara4u)
