import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { GoogleOAuthProvider } from "@react-oauth/google";
const MyApp = ({ Component, pageProps }: AppProps) => {
  // server-side rendering check
  const [isSSR, setIsSSR] = useState(true);
  useEffect(() => {
    setIsSSR(false);
  }, []);
  if (isSSR) return null;

  return (
    <GoogleOAuthProvider clientId={`${process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}`}>
      <Navbar />
      <div className="flex gap-6 md:gap-20">
        <div className="h-[90vh] overflow-hidden xl:hover:overflow-auto"><Sidebar /></div>
        <div className="h-[88vh] mt-4 flex flex-col videos overflow-auto gap-10 flex-1"><Component {...pageProps} /></div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default MyApp;


// <div>
    //   <Navbar />
    //   <div className='flex gap-6 md:gap-20'>
    //     <div className='h-[90vh] overflow-hidden xl:hover:overflow-auto'>
    //       <Sidebar />
    //     </div>
       
    //     <div className='mt-4  flex flex-col gap-10  overflow-auto h-[88vh] videos flex-1'>
    //       <Component {...pageProps} />
    //     </div>
       
       
    //   </div>
    // </div>
    