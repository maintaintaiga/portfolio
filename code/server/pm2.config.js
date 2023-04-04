/** pm2 configuration
 *    Note: The name field must not contain spaces.
 */
module.exports = {
  apps: [
    {
      script: "/etc/kate/application/server/index.js",
      name: "Kate-Portfolio-Server",
      node_args:
        "-r /etc/kate/application/server/node_modules/dotenv/config" +
        " /etc/kate/application/server/index.js" +
        " dotenv_config_path=/etc/kate/application/server/.env.production",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
      },
    }
  ],
};