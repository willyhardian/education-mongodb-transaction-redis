const Redis = require("ioredis");
const redis = new Redis({
  port: 17329, // Redis port
  host: "redis-17329.c1.ap-southeast-1-1.ec2.cloud.redislabs.com", // Redis host
  username: "default", // needs Redis >= 6
  password: "JpPcS5nbeMYPx2Z204L7Tjdqy0hH2ZJn",
  db: 0, // Defaults to 0
});

module.exports = redis;
