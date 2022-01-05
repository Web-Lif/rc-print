import React, { FC, useEffect, useImperativeHandle, useRef, useState } from 'react';
import html2canvas from 'html2canvas';

interface PrintInstance {
    print: () => Promise<void>
}

interface PrintProps {
    print: React.MutableRefObject<PrintInstance>
}

const Print: FC<PrintProps> = ({
    print,
    children
}) => {

    const [srcDoc, setSrcDoc] = useState<string>('')

    const divRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        print.current = {
            print: async () => {
                if (divRef.current ) {

                    // see https://github.com/niklasvh/html2canvas/issues/390

                    const canvas = await html2canvas(divRef.current)
                    const ctx = canvas.getContext('2d')!
                    ctx.imageSmoothingEnabled = false;
                    const base64Url = canvas.toDataURL("image/png")
                    setSrcDoc(`
                        <!DOCTYPE html>
                        <html lang="zh-CN">
                            <head>
                                <meta charset="UTF-8">
                                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                <title></title>
                                <style type="text/css">
                                    @page { size: auto;  margin: 0mm; }
                                </style>
                                <script>
                                    window.print()
                                </script>
                            </head>
                            <body>
                                <img src='${base64Url}'></img>
                            </body>
                        </html>
                    `)
                }
            }
        }
    }, [])

    return (
        <>
            <iframe
                style={{
                    display: 'none'
                }}
                srcDoc={srcDoc}
            />
            <div
                ref={divRef}
            >
                {children}
            </div>
        </>
    );
};

export default Print;
