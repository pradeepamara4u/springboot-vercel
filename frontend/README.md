# Spring Boot API Client (Node.js/TypeScript)

A modern Node.js/TypeScript client for calling your Spring Boot API endpoints.

## Features

✨ **TypeScript Support** - Full type safety and intellisense
🔧 **Axios-based** - Reliable HTTP client with interceptors
🎨 **Colored Output** - Beautiful console output with chalk
📝 **Environment Config** - Easy configuration with dotenv
🚀 **Simple API** - Easy-to-use API service layer

## Installation

```bash
cd frontend
npm install
```

## Configuration

1. Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

2. Update `.env` with your API URL:

```env
API_BASE_URL=https://springboot-vercel-ten.vercel.app
API_TIMEOUT=5000
```

For local development:

```env
API_BASE_URL=http://localhost:8080
API_TIMEOUT=5000
```

## Usage

### Run Development (TypeScript)

```bash
npm run dev
```

### Build TypeScript to JavaScript

```bash
npm run build
```

### Run Compiled JavaScript

```bash
npm start
```

### Run Client Only

```bash
npm run client
```

## Project Structure

```
frontend/
├── src/
│   ├── index.ts          # Main entry point
│   ├── client.ts         # Core API client (SpringBootClient)
│   ├── api.ts            # High-level API service
│   └── types/
│       └── index.ts      # TypeScript type definitions
├── dist/                 # Compiled JavaScript (after build)
├── package.json
├── tsconfig.json
├── .env.example
└── README.md
```

## Using the API Client

### Basic Usage

```typescript
import ApiService from './api';

const api = new ApiService('http://localhost:8080');

// Call home endpoint
const response = await api.getHome();
console.log(response);
```

### Using SpringBootClient Directly

```typescript
import SpringBootClient from './client';

const client = new SpringBootClient('http://localhost:8080');

// GET request
const response = await client.get('/api/users');
console.log(response.data);

// POST request
const postResponse = await client.post('/api/users', {
  name: 'John',
  email: 'john@example.com'
});
console.log(postResponse.data);

// PUT request
const updateResponse = await client.put('/api/users/1', {
  name: 'Jane'
});

// DELETE request
const deleteResponse = await client.delete('/api/users/1');
```

### Adding New Endpoints

Edit `src/api.ts` to add new API methods:

```typescript
/**
 * Get users list
 * GET /api/users
 */
async getUsers(): Promise<any[]> {
  console.log(chalk.blue('📍 Calling: GET /api/users'));
  const response = await this.client.get<any[]>('/api/users');
  console.log(chalk.green(`✅ Status: ${response.status}`));
  return response.data;
}
```

## Response Format

All API methods return an `ApiResponse` object:

```typescript
interface ApiResponse<T> {
  status: number;
  statusText: string;
  data: T;
  headers: Record<string, any>;
}
```

## Error Handling

```typescript
try {
  const response = await api.getHome();
  console.log(response);
} catch (error: any) {
  console.error('Error:', error.message);
  console.error('Status:', error.status);
  console.error('Data:', error.data);
}
```

## Adding to Your Backend

To add new endpoints to your Spring Boot application:

1. Add a controller method:

```java
@GetMapping("/api/users")
public ResponseEntity<List<String>> getUsers() {
    return ResponseEntity.ok(List.of("User1", "User2"));
}
```

2. Add corresponding API method in `src/api.ts`:

```typescript
async getUsers(): Promise<string[]> {
  const response = await this.client.get<string[]>('/api/users');
  return response.data;
}
```

3. Use in `src/index.ts`:

```typescript
const users = await api.getUsers();
console.log(users);
```

## Dependencies

- **axios** - Promise-based HTTP client
- **chalk** - Colorized terminal output
- **dotenv** - Environment variable management
- **typescript** - TypeScript compiler
- **ts-node** - Run TypeScript directly

## Environment Variables

```env
# API Configuration
API_BASE_URL=https://springboot-vercel-ten.vercel.app
API_TIMEOUT=5000
```

## License

MIT
