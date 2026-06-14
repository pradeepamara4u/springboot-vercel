/**
 * Spring Boot API Client
 * Main client for calling backend endpoints
 */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiResponse, ApiError, RequestConfig } from './types';
import chalk from 'chalk';

export class SpringBootClient {
  private axiosInstance: AxiosInstance;
  private baseURL: string;
  private timeout: number;

  constructor(baseURL: string = process.env.API_BASE_URL || 'http://localhost:8080', timeout: number = 5000) {
    this.baseURL = baseURL;
    this.timeout = timeout;

    this.axiosInstance = axios.create({
      baseURL: this.baseURL,
      timeout: this.timeout,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add response interceptor for error handling
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error(chalk.red(`❌ API Error: ${error.message}`));
        throw error;
      }
    );
  }

  /**
   * Make a GET request
   */
  async get<T = any>(endpoint: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.axiosInstance.get<T>(endpoint, {
        ...config,
        method: 'GET',
      });

      return this.formatResponse<T>(response);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Make a POST request
   */
  async post<T = any>(endpoint: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.axiosInstance.post<T>(endpoint, data, config);
      return this.formatResponse<T>(response);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Make a PUT request
   */
  async put<T = any>(endpoint: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.axiosInstance.put<T>(endpoint, data, config);
      return this.formatResponse<T>(response);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Make a DELETE request
   */
  async delete<T = any>(endpoint: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.axiosInstance.delete<T>(endpoint, config);
      return this.formatResponse<T>(response);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Make a PATCH request
   */
  async patch<T = any>(endpoint: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.axiosInstance.patch<T>(endpoint, data, config);
      return this.formatResponse<T>(response);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Format axios response to ApiResponse
   */
  private formatResponse<T>(response: AxiosResponse<T>): ApiResponse<T> {
    return {
      status: response.status,
      statusText: response.statusText,
      data: response.data,
      headers: response.headers,
    };
  }

  /**
   * Handle errors
   */
  private handleError(error: any): ApiError {
    if (error.response) {
      // Server responded with error status
      return {
        message: `API Error: ${error.response.statusText}`,
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data,
      };
    } else if (error.request) {
      // Request made but no response
      return {
        message: 'No response received from server',
        data: error.request,
      };
    } else {
      // Error in request setup
      return {
        message: error.message || 'An unknown error occurred',
      };
    }
  }

  /**
   * Get current base URL
   */
  getBaseURL(): string {
    return this.baseURL;
  }

  /**
   * Set base URL
   */
  setBaseURL(baseURL: string): void {
    this.baseURL = baseURL;
    this.axiosInstance.defaults.baseURL = baseURL;
  }
}

export default SpringBootClient;
