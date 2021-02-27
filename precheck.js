const chalk = require("chalk");
const detect = require("detect-port");

const preCheck = async (port) => {
  const result = await detect(port);
  if (result == port) return true;
  throw new Error(`Required port [${port}] is currently in use`);
};

(async () => {
  try {
    await preCheck(5000);
    await preCheck(5001);
    await preCheck(5002);
  } catch (error) {
    console.error(chalk.yellowBright(error));
    process.exit(1);
  }
  process.exit(0);
})();
