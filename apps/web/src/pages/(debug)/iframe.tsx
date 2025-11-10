import { ScrollArea } from '@afilmory/ui'

export const Component = () => {
  return (
    <ScrollArea rootClassName="h-screen">
      <div className="mx-auto w-[60ch] py-8">
        <iframe
          src="http://localhost:1924/share/iframe?id=DSCF0842"
          height={500}
          className="w-full"
          allowTransparency
          sandbox="allow-scripts allow-same-origin allow-popups"
        />

        <iframe
          src="http://localhost:1924/share/iframe?id=DSCF0842"
          height={400}
          className="w-[400px]"
          allowTransparency
          sandbox="allow-scripts allow-same-origin allow-popups"
        />

        <iframe
          src="http://localhost:1924/share/iframe?id=IMG_0030&id=DSCF0842"
          height={400}
          className="w-full"
          allowTransparency
          sandbox="allow-scripts allow-same-origin allow-popups"
        />
      </div>
    </ScrollArea>
  )
}
