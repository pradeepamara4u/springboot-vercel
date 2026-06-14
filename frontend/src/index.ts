/**
 * Main Entry Point - Frontend CLI Application
 */

import ApiService from './api';
import chalk from 'chalk';
import dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const apiBaseURL = process.env.API_BASE_URL || 'http://localhost:8080';

async function main() {
  console.log(chalk.bold.cyan('\n🚀 Spring Boot API Client (Node.js/TypeScript)\n'));
  console.log(chalk.gray(`API Base URL: ${apiBaseURL}\n`));

  const api = new ApiService(apiBaseURL);

  try {
    // Test home endpoint
    console.log(chalk.bold.yellow('--- Testing Home Endpoint ---\n'));
    await api.getHome();

    console.log('\n');

    // Test health endpoint (may not exist)
    console.log(chalk.bold.yellow('--- Testing Health Endpoint ---\n'));
    await api.getHealth();

    console.log('\n');

    // Test POST endpoint (example)
    console.log(chalk.bold.yellow('--- Testing POST Endpoint ---\n'));
    await api.postData({ message: 'Hello from TypeScript', timestamp: new Date().toISOString() });

    console.log('\n' + chalk.bold.green('✅ All tests completed!\n'));
  } catch (error: any) {
    console.error(chalk.red('\n❌ Error during execution:'));
    console.error(chalk.red(error.message));
    process.exit(1);
  }
}

main();
