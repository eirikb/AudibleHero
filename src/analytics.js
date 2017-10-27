const ga = document.createElement('script');
ga.async = true;
ga.src = 'https://www.googletagmanager.com/gtag/js?id=UA-69263799-2';
const ga2 = document.createElement('script');
ga2.innerHTML = `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-69263799-2');
`;
document.head.appendChild(ga);
document.head.appendChild(ga2);
