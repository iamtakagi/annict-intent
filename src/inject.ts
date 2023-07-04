const main = async (currentURL: string = location.href) => {
  const url = new URL(currentURL);
  if (url.pathname.startsWith('/')) {
    console.log('foo');
  }
};

window.addEventListener('load', () => {
  main().catch(e => {
    console.error(e);
  });
});
