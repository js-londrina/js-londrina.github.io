(function GoogleAnalytics() {
  const dlPush = (args) => window.dataLayer.push(args);

  window.dataLayer = window.dataLayer || [];
  dlPush({ js: new Date() });
  dlPush({ config: 'UA-143821088-1' });
}()); // prettier-ignore
