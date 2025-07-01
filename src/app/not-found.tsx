import Link from 'next/link'
import { Layout } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <Layout>
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-9xl font-black text-primary/20 font-sans">404</h1>
            <h2 className="text-4xl font-black font-sans text-primary">
              STATE NOT FOUND
            </h2>
            <p className="text-xl text-muted-foreground max-w-md mx-auto leading-relaxed font-medium">
              The page you&apos;re looking for has collapsed into a superposition of 
              existing and non-existing states. Perhaps it was never observed?
            </p>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground font-mono">
              {`$$|\\text{page}\\rangle = \\alpha|0\\rangle + \\beta|404\\rangle$$`}
            </p>
            <p className="text-xs text-muted-foreground font-medium">
              Where the measurement yielded the 404 eigenstate
            </p>
          </div>

          <Button asChild className="bg-primary hover:bg-primary/90 font-bold">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              RETURN TO REALITY
            </Link>
          </Button>
        </div>
      </div>
    </Layout>
  )
} 