/**
 * API Service
 * High-level API methods for specific endpoints
 */

import SpringBootClient from './client';
import chalk from 'chalk';

class ApiService {
  private client: SpringBootClient;

  constructor(baseURL?: string) {
    this.client = new SpringBootClient(baseURL);
  }

  /**
   * Call the home endpoint
   * GET /
   */
  async getHome(): Promise<string> {
    console.log(chalk.blue('📍 Calling: GET /'));
    const response = await this.client.get<string>('/');
    console.log(chalk.green(`✅ Status: ${response.status} ${response.statusText}`));
    console.log(chalk.cyan(`Response: ${response.data}`));
    return response.data;
  }

  /**
   * Example: Call a health check endpoint
   * GET /health
   */
  async getHealth(): Promise<any> {
    console.log(chalk.blue('📍 Calling: GET /health'));
    try {
      const response = await this.client.get<any>('/health');
      console.log(chalk.green(`✅ Status: ${response.status} ${response.statusText}`));
      console.log(chalk.cyan(`Response: ${JSON.stringify(response.data, null, 2)}`));
      return response.data;
    } catch (error: any) {
      console.log(chalk.yellow(`⚠️ Endpoint not found: /health`));
      return null;
    }
  }

  /**
   * Example: POST request
   * POST /api/data
   */
  async postData(payload: any): Promise<any> {
    console.log(chalk.blue(`📍 Calling: POST /api/data`));
    console.log(chalk.gray(`Payload: ${JSON.stringify(payload, null, 2)}`));
    try {
      const response = await this.client.post<any>('/api/data', payload);
      console.log(chalk.green(`✅ Status: ${response.status} ${response.statusText}`));
      console.log(chalk.cyan(`Response: ${JSON.stringify(response.data, null, 2)}`));
      return response.data;
    } catch (error: any) {
      console.log(chalk.yellow(`⚠️ Endpoint not found: POST /api/data`));
      return null;
    }
  }

  /**
   * Set API base URL
   */
  setBaseURL(baseURL: string): void {
    this.client.setBaseURL(baseURL);
  }

  /**
   * Get current base URL
   */
  getBaseURL(): string {
    return this.client.getBaseURL();
  }
}

export default ApiService;
