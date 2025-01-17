const redis = require("redis");
// const client = redis.createClient();
require("dotenv").config();


const client = redis.createClient({
    url: 'redis://redis:6379',
  });
 
client.on("error", (err) => console.error("Redis client error:", err));
 
(async () => {
    let connected = false;
    while (!connected) {
      try {
        await client.connect();
        connected = true;
      } catch (err) {
        console.error("Waiting for Redis to be ready...");
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  })();
 
exports.getCache = async (key) => {
    try {
        const data = await client.get(key);
        return data ? JSON.parse(data) : null;
    } catch (err) {
        console.error(`Error getting cache for key "${key}":`, err);
        throw err;
    }
};
 
exports.setCache = async (key, value, options) => {
    try {
        const ttl = options && options.EX ? options.EX : 3600;
        await client.set(key, JSON.stringify(value), { EX: ttl });
    } catch (err) {
        console.error(`Error setting cache for key "${key}":`, err);
        throw err;
    }
};