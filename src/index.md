---
nav:
    title: Components
    path: /components
group:
    path: /components/print
    title: 打印
---

## Table 表格

```tsx
/**
 * title: 打印
 * desc: 打印容器里面的内容
 */
import React, { useState, useRef } from 'react';
import { Print } from '@weblif/rc-print';

export default () => {
    const print = useRef()
    return (
        <>
            <button
                onClick={() => {
                    print.current.print()
                }}
            >
                点击打印
            </button>
            <Print
                print={print}
            >
               <div>你好</div>
               <div>你好</div>
               <div>你好</div>
               <div>你好</div>
               <div>你好</div>
            </Print>
        </>
    );
};
```

<br />

| 属性             | 说明                   | 类型                  | 默认值 |
| ---------------- | ---------------------- | --------------------- | ------ |
| width            | 表格的宽度             | `number`              | -      |
| height           | 表格的高度信息         | `number`              | -      |
| rows             | 表格的数据             | `T[]`                 | -      |
| columns          | 列信息                 | `Column<T>[]`         | -      |
| rowSelection     | 选择框的配置项         | `RowSelectType`       | -      |
| onRowClick       | 表格单击行触发的事件   | `(row: T) => void`    | -      |
| onRowDoubleClick | 表格双击行触发的事件   | `row: T) => void`     | -      |
| onChange         | 改变表格数据触发的事件 | `(rows: T[]) => void` | -      |
