import "styles/index.scss";
import "manifest.json";
import "favicon.ico";
import "browserconfig.xml";
import "safari-pinned-tab.svg";
import "images/android-chrome-512x512.png";
import "images/android-chrome-192x192.png";
import "images/favicon-32x32.png";
import "images/favicon-16x16.png";
import "images/apple-touch-icon.png";
import "images/mstile-150x150.png";

if (process.env.NODE_ENV === "production") {
    /* eslint-disable */
    (function(i,s,o,g,r,a,m){i["GoogleAnalyticsObject"]=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments);},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m);
    })(window,document,"script","//www.google-analytics.com/analytics.js","ga");
    ga("create", "UA-15660898-1", "auto");
    ga("send", "pageview");
    /* eslint-enable */
}
