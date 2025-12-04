# Варианты хранения токенов без localStorage

## Проблема
- `localStorage` уязвим к XSS-атакам
- Cookies с `httpOnly` не работают при разных хостах (CORS) без правильной настройки
- Нужно найти баланс между безопасностью и удобством использования

## Варианты решения

### 1. ✅ **SessionStorage (рекомендуется для начала)**
**Безопасность:** Средняя (лучше, чем localStorage)
**Удобство:** Высокое
**CORS:** Работает везде

**Преимущества:**
- Автоматически очищается при закрытии вкладки
- Меньше риск утечки при XSS (данные не сохраняются между сессиями)
- Работает при разных хостах без настройки
- Простая миграция с localStorage

**Недостатки:**
- Все еще уязвим к XSS (но меньше риск)
- Токены теряются при закрытии вкладки

**Реализация:**
```typescript
// Просто заменить localStorage на sessionStorage
sessionStorage.setItem('accessToken', token);
sessionStorage.getItem('accessToken');
```

---

### 2. ✅ **In-Memory Storage (Redux State) - самый безопасный**
**Безопасность:** Высокая
**Удобство:** Среднее (требует повторной авторизации при перезагрузке)
**CORS:** Работает везде

**Преимущества:**
- Токены не сохраняются на диске
- Недоступны для XSS-скриптов
- Автоматически очищаются при закрытии вкладки

**Недостатки:**
- Токены теряются при перезагрузке страницы
- Требует повторной авторизации после refresh
- Нужно хранить refresh token отдельно (в sessionStorage или cookie)

**Реализация:**
```typescript
// Хранить access token только в Redux
// Refresh token в sessionStorage для восстановления сессии
```

---

### 3. ✅ **Гибридный подход (лучший баланс)**
**Безопасность:** Высокая
**Удобство:** Высокое
**CORS:** Работает везде

**Стратегия:**
- **Access Token** → в памяти (Redux state) или sessionStorage
- **Refresh Token** → в httpOnly cookie (если бэкенд поддерживает) или sessionStorage
- При перезагрузке страницы использовать refresh token для получения нового access token

**Преимущества:**
- Access token не сохраняется на диске
- Refresh token можно безопасно хранить
- Автоматическое восстановление сессии

---

### 4. ⚠️ **HttpOnly Cookies (требует настройки бэкенда)**
**Безопасность:** Очень высокая
**Удобство:** Высокое
**CORS:** Требует правильной настройки

**Важно:** Cookies **МОГУТ** работать при разных хостах, если правильно настроить CORS!

**Требования на бэкенде:**
```javascript
// Пример для Express.js
app.use(cors({
  origin: 'https://your-frontend-domain.com',
  credentials: true, // ВАЖНО!
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// При установке cookie
res.cookie('refreshToken', token, {
  httpOnly: true,
  secure: true, // только HTTPS
  sameSite: 'none', // для cross-origin
  domain: '.your-domain.com' // если нужно
});
```

**На фронтенде:**
```typescript
// axios должен отправлять credentials
axios.defaults.withCredentials = true;
```

**Преимущества:**
- HttpOnly cookies недоступны для JavaScript (защита от XSS)
- Автоматически отправляются с запросами
- Работает при правильной настройке CORS

**Недостатки:**
- Требует изменений на бэкенде
- Нужна правильная настройка CORS
- Может быть сложнее для отладки

---

## 🎯 Рекомендации по реализации

### Вариант A: Быстрая миграция (SessionStorage)
1. Заменить `localStorage` на `sessionStorage`
2. Минимальные изменения кода
3. Улучшение безопасности без больших изменений

### Вариант B: Оптимальный (Гибридный)
1. Access token в Redux state (память)
2. Refresh token в sessionStorage
3. При перезагрузке страницы автоматически обновлять access token через refresh token
4. Лучший баланс безопасности и UX

### Вариант C: Максимальная безопасность (HttpOnly Cookies)
1. Настроить CORS на бэкенде с `credentials: true`
2. Использовать httpOnly cookies для refresh token
3. Access token в памяти (Redux)
4. Требует координации с бэкенд-командой

---

## 📝 Пример реализации гибридного подхода

```typescript
// api/tokenStorage.ts
class TokenStorage {
  private accessToken: string | null = null;
  
  setAccessToken(token: string) {
    this.accessToken = token;
    // НЕ сохраняем в localStorage/sessionStorage
  }
  
  getAccessToken(): string | null {
    return this.accessToken;
  }
  
  setRefreshToken(token: string) {
    // Refresh token можно в sessionStorage для восстановления сессии
    sessionStorage.setItem('refreshToken', token);
  }
  
  getRefreshToken(): string | null {
    return sessionStorage.getItem('refreshToken');
  }
  
  clear() {
    this.accessToken = null;
    sessionStorage.removeItem('refreshToken');
  }
}

export const tokenStorage = new TokenStorage();
```

---

## 🔒 Дополнительные меры безопасности

1. **Короткий срок жизни access token** (15-30 минут)
2. **Автоматический refresh** перед истечением срока
3. **Content Security Policy (CSP)** для защиты от XSS
4. **HTTPS только** в production
5. **Rate limiting** на бэкенде для защиты от брутфорса

