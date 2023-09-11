interface RabbitConnectionOptions {
  username: string;
  password: string;
  host: string;
  port: string;
}
export function getRabbitConnectionString({username, password, host, port}: RabbitConnectionOptions) {
  return `amqp://${username}:${password}@${host}:${port}`;
}
