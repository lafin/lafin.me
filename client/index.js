import "./style.css";
import "./sw.js";
import "./manifest.json";

const swPath = "/sw.js";
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.getRegistrations().then(function(registrations) {
        for(let registration of registrations) {
            if (registration.active.scriptURL.slice(registration.scope.length-1) !== swPath)
                registration.unregister();
        }
    });
    navigator.serviceWorker.register(swPath, {
        scope: "/"
    }).then(function() {
        console.info("Registration succeeded.");
    }).catch(function(error) {
        console.warn("Registration failed with " + error);
    });
}

(function(i,s,o,g,r,a,m){i["GoogleAnalyticsObject"]=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments);},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m);
})(window,document,"script","//www.google-analytics.com/analytics.js","ga");
ga("create", "UA-15660898-1", "auto");
ga("send", "pageview");