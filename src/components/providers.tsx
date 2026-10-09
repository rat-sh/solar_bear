'use client'

import { ReactNode } from 'react'
import { Authenticated, Unauthenticated, ConvexReactClient, AuthLoading } from 'convex/react'
import { ConvexProviderWithClerk } from 'convex/react-clerk'
import { ClerkProvider, SignInButton, SignIn, useAuth, SignUpButton, UserButton } from '@clerk/nextjs'
import { ThemeProvider } from './theme-provider'
import { UnauthenticatedView } from '@/features/auth/components/unauthenticated-view'
import { AuthLoadingView } from '@/features/auth/components/auth-loading-view'

if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
    throw new Error('Missing NEXT_PUBLIC_CONVEX_URL in your .env file')
}

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL)

export const Providers = ({ children }: { children: React.ReactNode }) => {

    return (
        <ClerkProvider>
            <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <Authenticated>
                        <UserButton />

                        {children}
                    </Authenticated>

                    <Unauthenticated>
                        <UnauthenticatedView />
                    </Unauthenticated>

                    <AuthLoading>
                        <AuthLoadingView />
                    </AuthLoading>

                </ThemeProvider>
            </ConvexProviderWithClerk>
        </ClerkProvider>
    );
};