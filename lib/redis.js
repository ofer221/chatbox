const redis = require('redis')
const {promisify} = require('util')
let redisClient

redisClient = redis.createClient(process.env.REDIS_PORT,process.env.REDIS_HOST,{password:process.env.REDIS_PASS})
let redisClientSubscrib = redis.createClient(process.env.REDIS_PORT,process.env.REDIS_HOST,{password:process.env.REDIS_PASS})
// redisClient = redis.createClient()
// let redisClientSubscrib = redis.createClient()
module.exports = {
  connect: () => {


    redisClient.on('connect', () => {
      console.log('Redis Server Connected')
    })
    redisClient.on('error', (err) => {
      console.log('Error ' + err)
    })
    return redisClient
  },
  getSubscibClient: () => {
    return redisClientSubscrib
  },
  getClient: () => {
    return redisClient
  },
  subscribe:promisify(redisClient.subscribe).bind(redisClient),
  publish:promisify(redisClient.publish).bind(redisClient),
  lrange:promisify(redisClient.lrange).bind(redisClient),
  lpush:promisify(redisClient.lpush).bind(redisClient),
  srem:promisify(redisClient.srem).bind(redisClient),
  hexists: promisify(redisClient.hexists).bind(redisClient),
  hmset: promisify(redisClient.hmset).bind(redisClient),
  hget:promisify(redisClient.hget).bind(redisClient),
  hset:promisify(redisClient.hset).bind(redisClient),
  sadd:promisify(redisClient.sadd).bind(redisClient),
  lrange:promisify(redisClient.lrange).bind(redisClient),
  smembers:promisify(redisClient.smembers).bind(redisClient)
}
