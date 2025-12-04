export const sleep = (ms = 0) => new Promise(fulfulled => setTimeout(fulfulled, ms));

export const getErrorMessage = (error: any): string => {
  if (error.response) {
    const status = error.response.status;
    const statusText = error.response.statusText;
    const message = error.response.data?.message || error.response.data?.error;

    if (message && message !== statusText) {
      return `${status} ${statusText}: ${message}`;
    }

    return `${status} ${statusText}`;
  }

  return error.message || 'Unknown error';
};

export const secondsToTime = (seconds: number) => {
  return new Date(seconds * 1000).toISOString().slice(11, 19);
};
