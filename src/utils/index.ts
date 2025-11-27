export const sleep = (ms = 0) => new Promise(fulfulled => setTimeout(fulfulled, ms));

export const getErrorMessage = (error: any): string => {
  if (error.response) {
    // Сервер ответил с ошибкой (4xx, 5xx)
    const status = error.response.status;
    const statusText = error.response.statusText;
    const message = error.response.data?.message || error.response.data?.error;

    if (message && message !== statusText) {
      return `${status} ${statusText}: ${message}`;
    }

    return `${status} ${statusText}`;
  }

  // Сетевая ошибка или CORS
  return error.message || 'Unknown error';
};
