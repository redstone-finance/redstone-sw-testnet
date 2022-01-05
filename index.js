const {default: ArLocal} = require("arlocal");
const Arweave = require("arweave");

let arLocal;

let interval;

(async () => {
  arLocal = new ArLocal(
    1984,
    true,
    '.db',
    true);

const arweave = Arweave.init({
  host: "localhost",
  port: 1984,
  protocol: "http"
});

await arLocal.start();

interval = setInterval(async () => {
  await arweave.api.get('mine');
}, 10000);


process.on('SIGINT', stop);
process.on('SIGTERM', stop);
})
();

async function stop() {
  try {
    await arLocal.stop();
    clearInterval(interval);
  } catch (e) {
    console.error(e);
  }
}
