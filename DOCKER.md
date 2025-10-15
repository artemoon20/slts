# Docker Setup for Angular Application

## Файлы Docker конфигурации

- `Dockerfile` - Multi-stage build для продакшена
- `Dockerfile.dev` - Для разработки
- `docker-compose.yml` - Оркестрация сервисов
- `nginx.conf` - Конфигурация Nginx
- `.dockerignore` - Исключения для Docker

## Команды для запуска

### Разработка
```bash
# Запуск в режиме разработки
docker-compose up slts-dev

# Или напрямую через Dockerfile.dev
docker build -f Dockerfile.dev -t slts-dev .
docker run -p 4200:4200 -v $(pwd):/app -v /app/node_modules slts-dev
```

### Продакшен
```bash
# Сборка и запуск продакшен версии
docker-compose up slts-prod

# Или напрямую
docker build -t slts-prod .
docker run -p 80:80 slts-prod
```

### С Nginx (альтернативный способ)
```bash
# Сначала соберите приложение локально
npm run build

# Затем запустите с Nginx
docker-compose up slts-nginx
```

## Полезные команды

```bash
# Остановка всех сервисов
docker-compose down

# Пересборка образов
docker-compose build --no-cache

# Просмотр логов
docker-compose logs -f slts-dev

# Вход в контейнер
docker exec -it <container_name> sh
```

## Порты

- **4200** - Development server
- **80** - Production (Nginx)
- **8080** - Alternative Nginx setup

## Особенности

- Multi-stage build для оптимизации размера образа
- Hot reload в режиме разработки через volume mounting
- Nginx с оптимизированной конфигурацией для продакшена
- Gzip compression и кэширование статических файлов
- Security headers
- Поддержка Angular routing
