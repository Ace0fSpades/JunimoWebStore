/**
 * Конфигурация API и режима работы приложения
 */

interface ApiConfig {
  // Базовый URL для API запросов
  baseUrl: string;
  
  // Флаг, определяющий, нужно ли использовать моки вместо реальных API запросов
  useMocks: boolean;
  
  // Таймаут для запросов (в миллисекундах)
  timeout: number;
  
  // Заголовки по умолчанию для запросов
  headers: Record<string, string>;
}

// Вспомогательная функция для получения переменных окружения из Vite
const getEnvVariable = (key: string, defaultValue: string): string => {
  // Сначала проверяем import.meta.env (Vite)
  // @ts-ignore
  const viteValue = import.meta?.env?.[`VITE_${key}`] || null;
  
  // Потом проверяем process.env (для совместимости)
  const processValue = process.env?.[key] || null;
  
  return viteValue || processValue || defaultValue;
};

// Определяем режим работы с API: 'mocks' или 'api'
const API_MODE = getEnvVariable('API_MODE', 'api');

// Определяем, используем ли мы моки
const USE_MOCKS = API_MODE === 'mocks';

// Базовый URL для API
const API_BASE_URL = '/api/v1'; // Используем прокси из vite.config.ts

// Логируем конфигурацию API
const logApiConfig = (config: ApiConfig) => {
  console.log('API Config:', {
    baseUrl: config.baseUrl,
    useMocks: config.useMocks,
    apiMode: API_MODE,
    env: {
      NODE_ENV: process.env.NODE_ENV,
      API_MODE: getEnvVariable('API_MODE', 'mocks'),
    }
  });
};

// Конфигурация API
const apiConfig: ApiConfig = {
  baseUrl: API_BASE_URL,
  useMocks: USE_MOCKS,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
};

// Логируем конфигурацию
logApiConfig(apiConfig);

// Экспортируем функцию для проверки использования моков
export const shouldUseMocks = (): boolean => {
  return USE_MOCKS;
};

export default apiConfig; 