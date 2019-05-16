module.exports = {
  apps: [{
    name: 'pm2-port-8080',
    script: './server.js',

    env: {
      'PORT': 8080,
      'NODE_ENV': 'development',
      'REDIS_PORT':18400,
      'REDIS_HOST':'redis-18400.c9.us-east-1-4.ec2.cloud.redislabs.com',
      'REDIS_PASS':'FtaBnzIDlp2FcipHYoAotG46tmxMxH4Z'
    }
  },
    {
      name: 'pm2-port-8081',
      script: './server.js',

      env: {
        'PORT': 8081,
        'NODE_ENV': 'development',
        'REDIS_PORT':18400,
        'REDIS_HOST':'redis-18400.c9.us-east-1-4.ec2.cloud.redislabs.com',
        'REDIS_PASS':'FtaBnzIDlp2FcipHYoAotG46tmxMxH4Z'
      }
    }]
}
