import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { UserProvider } from '@auth0/nextjs-auth0/client';

export default function App({ Component, pageProps }) {
    const queryClient = new QueryClient();

    return (
        <UserProvider>
            <QueryClientProvider client={queryClient}>
                <Component {...pageProps} />
            </QueryClientProvider>
        </UserProvider>
    )
}