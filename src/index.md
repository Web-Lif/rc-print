---
nav:
    title: Components
    path: /components
group:
    path: /components/print
    title: 打印
---

## Print 打印

```tsx
/**
 * title: 打印
 * desc: 打印容器里面的内容
 */
import React, { useState, useRef } from 'react';
import { Print } from '@weblif/rc-print';

export default () => {
    const print = useRef();
    return (
        <>
            <button
                onClick={() => {
                    print.current.print();
                }}
            >
                点击打印
            </button>
            <Print print={print}>
                <table border="1">
                    <tr>
                        <td>row 1, cell 1</td>
                        <td>row 1, cell 2</td>
                    </tr>
                    <tr>
                        <td>row 2, cell 1</td>
                        <td>row 2, cell 2</td>
                    </tr>
                </table>
            </Print>
        </>
    );
};
```

```tsx
/**
 * title: 打印
 * desc: 打印容器里面的内容
 */
import React, { useState, useRef } from 'react';
import { Print } from '@weblif/rc-print';

export default () => {
    const printx = useRef();
    return (
        <>
            <button
                onClick={() => {
                    printx.current.print();
                }}
            >
                点击打印
            </button>
            <Print print={printx}>
                <table border="1">
                    <tr>
                        <td>row 1, cell 1</td>
                        <td>row 1, cell 2</td>
                    </tr>
                    <tr>
                        <td>row 2, cell 1</td>
                        <td>row 2, cell 2</td>
                    </tr>
                </table>
            </Print>
        </>
    );
};
```
