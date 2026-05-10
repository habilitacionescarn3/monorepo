import Link from "next/link"

export default function Page() {
  return (
    <div className="flex min-h-svh items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-4xl font-bold">Hello World</h1>
        <Link href="/showcase" className="text-primary underline">
          Component Showcase
        </Link>
      </div>
    </div>
  )
}
