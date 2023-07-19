import { ContextProvider } from '@/context/context'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Script from 'next/script'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import * as gtag from "../components/lib/analytics"


export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // useEffect(() => {
  //   hotjar.initialize(3395534, 6);
  // }, []);

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <>
      <Script 
        id="stark_ass"
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=AW-10793712364"
      />
      <Script
        id="stark"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);};
          gtag('js', new Date());
          gtag('config', 'AW-10793712364');`
        }}
      />
      
      {/* Facebook Pixel */}
      <Script 
        id="fb_pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
        __html: `
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '228071282158862');
          fbq('track', 'PageView');
        `
      }}>
      </Script>

      {/* Twitter Pixel */}
      <Script 
        id="twitter_pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
        __html: `
          !function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);
          },s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='https://static.ads-twitter.com/uwt.js',
          a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');
          twq('config','od5o9');
        `
      }}/>
      <ContextProvider>
        <Component {...pageProps} />
      </ContextProvider>
    </>
  )
}
