'use client'
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style jsx global>{`
        body {
          color: #ffffff;
          font-family: -apple-system, system-ui, sans-serif;
          overflow-x: hidden;
        }
        html,
        body {
          position: fixed;
          inset: 0;
          margin: 0;
          padding: 0;
          background: #0a0a0a;
        }
      `}</style>
      {children}
    </>
  )
}
