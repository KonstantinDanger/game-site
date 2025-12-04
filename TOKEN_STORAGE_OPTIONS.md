# Варіанти зберігання токенів без localStorage

## Проблема
- `localStorage` вразливий до XSS-атаків
- Cookies з `httpOnly` не працюють при різних хостах (CORS) без правильного налаштування
- Потрібно знайти баланс між безпекою та зручністю використання

## Варіанти рішення

### 1. ✅ **SessionStorage (рекомендується для початку)**
**Безпека:** Середня (краще, ніж localStorage)
**Зручність:** Висока
**CORS:** Працює скрізь

**Переваги:**
- Автоматично очищається при закритті вкладки
- Менше ризик витоку при XSS (дані не зберігаються між сесіями)
- Працює при різних хостах без налаштування
- Проста міграція з localStorage

**Недоліки:**
- Все ще вразливий до XSS (але менший ризик)
- Токени губляться при закритті вкладки

**Реалізація:**
```typescript
// Просто замінити localStorage на sessionStorage
sessionStorage.setItem('accessToken', token);
sessionStorage.getItem('accessToken');
````

---

### 2. ✅ **In-Memory Storage (Redux State) - найбезпечніший**
**Безпека:** Висока
**Зручність:** Середня (вимагає повторної авторизації при перезавантаженні)
**CORS:** Працює скрізь

**Переваги:**
- Токени не зберігаються на диску
- Недоступні для XSS-скриптів
- Автоматично очищаються при закритті вкладки

**Недоліки:**
- Токени губляться при перезавантаженні сторінки
- Вимагає повторної авторизації після refresh
- Потрібно зберігати refresh token окремо (у sessionStorage або cookie)

**Реалізація:**
```typescript
// Зберігати access token тільки у Redux
// Refresh token у sessionStorage для відновлення сесії
````

---

### 3. ✅ **Гібридний підхід (кращий баланс)**
**Безпека:** Висока
**Зручність:** Висока
**CORS:** Працює скрізь

**Стратегія:**
- **Access Token** → у пам'яті (Redux state) або sessionStorage
- **Refresh Token** → в httpOnly cookie (якщо бекенд підтримує) або sessionStorage
- При перезавантаженні сторінки використовувати refresh token для отримання нового access token

**Переваги:**
- Access token не зберігається на диску
- Refresh token можна безпечно зберігати
- Автоматичне відновлення сесії

---

### 4. ⚠️ **HttpOnly Cookies (вимагає налаштування бекенду)**
**Безпека:** Дуже висока
**Зручність:** Висока
**CORS:** Вимагає правильного налаштування

**Важливо:** Cookies **МОЖУТЬ** працювати при різних хостах, якщо правильно налаштувати CORS!

**Вимоги на бекенді:**
```javascript
// Приклад для Express.js
app.use(cors({ 
origin: 'https://your-frontend-domain.com', 
credentials: true, // ВАЖЛИВО! 
дозволеніГедери: ['Content-Type', 'Authorization']
}));

// При установці cookie
res.cookie('refreshToken', token, { 
httpOnly: true, 
secure: true, // тільки HTTPS 
sameSite: 'none', // для cross-origin 
domain: '.your-domain.com' // якщо потрібно
});
````

**На фронтенді:**
```typescript
// axios повинен відправляти credentials
axios.defaults.withCredentials = true;
````

**Переваги:**
- HttpOnly cookies недоступні для JavaScript (захист від XSS)
- Автоматично відправляються із запитами
- Працює при правильному налаштуванні CORS

**Недоліки:**
- Вимагає змін на бекенді
- Потрібне правильне налаштування CORS
- Може бути складніше для налагодження

---

## 🎯 Рекомендації щодо реалізації

### Варіант A: Швидка міграція (SessionStorage)
1. Замінити `localStorage` на `sessionStorage`
2. Мінімальні зміни коду
3. Поліпшення безпеки без великих змін

### Варіант B: Оптимальний (Гібридний)
1. Access token у Redux state (пам'ять)
2. Refresh token у sessionStorage
3. При перезавантаженні сторінки автоматично оновлювати access token через refresh token
4. Кращий баланс безпеки та UX

### Варіант C: Максимальна безпека (HttpOnly Cookies)
1. Налаштувати CORS на бекенді з `credentials: true`
2. Використовувати httpOnly cookies для refresh token
3. Access token у пам'яті (Redux)
4. Вимагає координації з бекенд-командою

---

## 📝 Приклад реалізації гібридного підходу

```typescript
//api/tokenStorage.ts
class TokenStorage { 
private accessToken: string | null = null; 

setAccessToken(token: string) { 
this.accessToken = token; 
// НЕ зберігаємо в localStorage/sessionStorage 
} 

getAccessToken(): string | null { 
return this.accessToken; 
} 

setRefreshToken(token: string) { 
// Refresh token можна у sessionStorage для відновлення сесії 
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

export const tokenStorage = новий TokenStorage();
````

---

## 🔒 Додаткові заходи безпеки

1. **Короткий термін життя access token** (15-30 хвилин)
2. **Автоматичний refresh** перед закінченням терміну
3. **Content Security Policy (CSP)** для захисту від XSS
4. **HTTPS тільки** у production
5. **Rate limiting** на бекенді для захисту від брутфорсу
