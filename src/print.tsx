import React, { FC, useEffect, useRef, useState } from 'react';
import html2canvas from 'html2canvas';

interface PrintInstance {
    print: (element?: HTMLElement) => Promise<void>
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

    const printSnapshotDom = async (element: HTMLElement) => {
        const cvs = document.createElement('canvas');
        const { width, height } = element.getBoundingClientRect()
        cvs.width = width * 2
        cvs.height = height * 2
        cvs.style.width = width + 'px'
        cvs.style.height = height + 'px'
        const context = cvs.getContext('2d')!
        context.scale(2, 2)

        const canvas = await html2canvas(element, {
            canvas: cvs,
            logging: false
        })

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

    useEffect(() => {
        print.current = {
            print: async (element?: HTMLElement) => {
                if (element) {
                    await printSnapshotDom(element)
                }else if (divRef.current) {
                    await printSnapshotDom(divRef.current)
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
