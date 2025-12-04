import { onCLS, onFCP, onINP, onLCP, onTTFB, type Metric } from 'web-vitals';

type ReportHandler = (metric: Metric) => void;

const sendToAnalytics = (metric: Metric) => {
  if (import.meta.env.MODE === 'development') {
    console.log('Web Vital:', {
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
      id: metric.id,
    });
  }
};

export const reportWebVitals = (onPerfEntry?: ReportHandler) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    onCLS(onPerfEntry);
    onFCP(onPerfEntry);
    onINP(onPerfEntry);
    onLCP(onPerfEntry);
    onTTFB(onPerfEntry);
  } else {
    onCLS(sendToAnalytics);
    onFCP(sendToAnalytics);
    onINP(sendToAnalytics);
    onLCP(sendToAnalytics);
    onTTFB(sendToAnalytics);
  }
};
