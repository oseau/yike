import { finder } from "@medv/finder";

export default defineContentScript({
  matches: ["*://photo.baidu.com/*"],
  main() {
    console.log("Hello from extension.");
    document.body.addEventListener("mousedown", (event) => {
      if (event.button == 2) {
        // right click
        const selector = finder(event.target);
        console.log(selector);
      }
    });
    setTimeout(() => {
      main();
    }, 1000);
  },
});

const main = async () => {
  const length = 1234;
  const idx = `.photo-item:nth-child(${length}) > .img-container`;
  await wait(idx);
  for (let i = 1; i <= length; i++) {
    const idx = `.photo-item:nth-child(${i}) > .img-container`;
    await wait(idx);
    query(idx).scrollIntoView(false);
    query(idx).click();
    await sleep(1);
    query(".yk-icon-datuxiazai").click();
    await sleep(4);
    query(".yk-preview__closeBtn > .yk-icons").click();
    await sleep(1);
    if (i % 10 === 0) {
      console.log(`downloading ${i}`);
    }
  }
};
