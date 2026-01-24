import { StoreProvider } from "easy-peasy";
import { Toaster } from "./components/ui/sonner";
import store from "./store/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";

const queryClient = new QueryClient();

export default function GlobalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <HelmetProvider>
      <StoreProvider store={store}>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        <Toaster />
      </StoreProvider>
    </HelmetProvider>
  );
}
