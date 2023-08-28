import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fillDb() {
  await prisma.category.upsert({
    where: { categoryId: 1 },
    update: {},
    create: {
      title: 'Telegram Bots',
      task: {
        create: [
          {
            title: 'Создать телеграм бот для взимодействия с google API',
            city: 'Moscow',
            tags: {
              create: {
                title: 'ASAP'
              }
            },
            comments: {
              create: [
                {
                  message: 'Объясните подробнее задание',
                  userId: '1'
                },
                {
                  message: 'Сделаю за 20 000 ₽',
                  userId: '2'
                }
              ]
            },
            taskImage: 'https://127.0.0.1/avatars/gmail-api-bot.png',
            status: 'New',
            userId: '3',
            description: 'Создать телеграм бота для получения и чтения писем от gmail api'
          }
        ]
      }
    }
  });
}

fillDb()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect()

    process.exit(1);
  })
