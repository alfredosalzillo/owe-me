import { DialogsProvider, NotificationsProvider } from "@toolpad/core";
import React from "react";

export type AppProvidersProps = {
  children: React.ReactNode;
};

const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <DialogsProvider>
      <NotificationsProvider>{children}</NotificationsProvider>
    </DialogsProvider>
  );
};

export default AppProviders;
