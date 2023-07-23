import React from "react";
import Script from "next/script";
import '@styles/globals.css';
import Provider from "@components/Provider";

export const metadata = {
  title: "HighSeasMarket",
  description: "Shop our extensive range of high-quality agricultural, materials, and hardware products to enhance productivity, construction, and maintenance, with competitive prices, exceptional customer service, and a seamless shopping experience.",
}

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Provider>
          {children}
        </Provider>
        <Script src="https://kit.fontawesome.com/0fd24d817a.js" crossOrigin="anonymous" />
      </body>
    </html>
  );
};

export default RootLayout;
