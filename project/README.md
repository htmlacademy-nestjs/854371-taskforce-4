# TASKFORCE - 
биржа фриланса для заказчиков и исполнителей

## Описание

Этот проект содержит два основных приложения: `task-space` и `users`. `task-space` предназначено для управления задачами, а `users` для управления пользователями.

## Запуск приложений

### Запуск task-space

1. Сборка приложения:

   ```bash
   nx run task-space:build:development
   ```

   или для продакшена:

   ```bash
   nx run task-space:build:production
   ```

2. Запуск приложения:

   ```bash
   nx run task-space:serve:development
   ```

   или для продакшена:

   ```bash
   nx run task-space:serve:production
   ```

### Запуск users

1. Сборка приложения:

   ```bash
   nx run users:build:development
   ```

   или для продакшена:

   ```bash
   nx run users:build:production
   ```

2. Запуск приложения:

   ```bash
   nx run users:serve:development
   ```

   или для продакшена:

   ```bash
   nx run users:serve:production
   ```

### Переменные окружения

Для `users` необходимо установить следующие переменные окружения:

```
MONGO_DB=
MONGO_HOST=
MONGO_PORT=
MONGO_USER=
MONGO_PASSWORD=
MONGO_AUTH_BASE=
PORT=
```

Для `project/libs/models/task-space-models`:

```
DATABASE_URL=
```

## Работа с базой данных (для task-space)

1. Проверка схемы базы данных:

   ```bash
   nx run task-space:db:lint
   ```

2. Миграция базы данных:

   ```bash
   nx run task-space:db:migrate
   ```

3. Сброс базы данных:

   ```bash
   nx run task-space:db:reset
   ```

4. Генерация клиента Prisma:

   ```bash
   nx run task-space:db:generate
   ```

5. Заполнение базы данных начальными данными:

   ```bash
   nx run task-space:db:seed
   ```
