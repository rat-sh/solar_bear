import { Spinner } from '@/components/ui/spinner';

export const AuthLoadingView = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-background" >
            <div className="w-full max-w-lg bg-muted" >
                <Spinner className="size-6 text-ring" />
            </div>
        </div>
    )
}
