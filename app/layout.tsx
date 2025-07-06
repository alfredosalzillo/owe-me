import type { Viewport } from "next";
import type { FC } from "react";
import React from "react";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  height: "device-height",
  initialScale: 1.0,
  userScalable: true,
};

type RootLayoutProps = {
  children: React.ReactNode;
};
const RootLayout: FC<RootLayoutProps> = ({ children }) => <>{children}</>;

export default RootLayout;
