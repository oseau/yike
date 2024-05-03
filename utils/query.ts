export default function query(url: string): any {
  return document.querySelector.bind(document)(url);
}
