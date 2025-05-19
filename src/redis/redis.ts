import Redis from 'ioredis';
 
const redis = new Redis({
host: process.env.REDIS_HOST || '127.0.0.1',
  port: parseInt(process.env.REDIS_PORT || '6379', 10),
  password: process.env.REDIS_PASSWORD || undefined,
  db: parseInt(process.env.REDIS_DB || '0', 10),
});
 
redis.on('connect', () => console.log('Redis connected'));
redis.on('error', err => console.error('Redis connection error:', err));
 
export async function cacheSet<T>(key: string, value: T, ttlSeconds = 60): Promise<void> {
  await redis.set(key, JSON.stringify(value), 'EX', ttlSeconds);
}
 
export async function cacheGet<T>(key: string): Promise<T | null> {
  const raw = await redis.get(key);
  return raw ? JSON.parse(raw) : null;
}
 
export async function cacheDel(key: string): Promise<number> {
  return await redis.del(key);
}
 
export default redis;