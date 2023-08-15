interface MongoUriInterface {
  username: string,
  password: string,
  host: string,
  port: string,
  dbName: string,
  authDB: string
}

export function getMongoConnectionString({username, password, host, port, dbName, authDB}: MongoUriInterface) {
  const result  = `mongodb://${username}:${password}@${host}:${port}/${dbName}?authSource=${authDB}`
  console.log(result)
  return result;
}
