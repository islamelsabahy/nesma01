import { useEffect } from "react";

export function Analytics() {
  useEffect(() => {
    const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID;
    const metaPixelId = import.meta.env.VITE_META_PIXEL_ID;

    if (gaId && !document.getElementById("ga-script")) {
      const gaScript = document.createElement("script");
      gaScript.id = "ga-script";
      gaScript.async = true;
      gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
      document.head.appendChild(gaScript);

      window.dataLayer = window.dataLayer || [];
      window.gtag = (...args: unknown[]) => window.dataLayer?.push(args);
      window.gtag("js", new Date());
      window.gtag("config", gaId);
    }

    if (metaPixelId && !document.getElementById("meta-pixel-script")) {
      const pixelScript = document.createElement("script");
      pixelScript.id = "meta-pixel-script";
      pixelScript.textContent = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?` +
        `n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;` +
        `n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;` +
        `t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}` +
        `(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');` +
        `fbq('init', '${metaPixelId}');fbq('track', 'PageView');`;
      document.head.appendChild(pixelScript);
    }
  }, []);

  return null;
}
