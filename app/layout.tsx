import React, { PropsWithChildren } from "react";
import Script from "next/script";
import '@/styles/globals.css';
import Provider from "@/components/Provider";

export const metadata = {
  title: "HighSeasMarket",
  description: "Shop our extensive range of high-quality agricultural, materials, and hardware products to enhance productivity, construction, and maintenance, with competitive prices, exceptional customer service, and a seamless shopping experience.",
}

interface RootLayoutProps extends PropsWithChildren {
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
