"use client"

import { ColumnDef, flexRender, getCoreRowModel, useReactTable, getPaginationRowModel } from '@tanstack/react-table';
import { useState } from 'react';

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {

    const [pagination, setPagination] = useState({
        pageIndex: 0, //initial page index
        pageSize: 5, //default page size
    });

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination, //update the pagination state when internal APIs mutate the pagination state
        state: {
            pagination,
        },
    })

    const Button = ({ children, onClick, disabled }: { children: string, disabled: boolean, onClick: () => void }) => (
        <button className='border rounded p-1 text-xs w-6 h-6 align-center text-gray-600'
            onClick={onClick}
            disabled={disabled}

        >
            {children}
        </button>)

    return (
        <div >
            <div className='border-gray-300 border rounded-md overflow-auto h-[500px]'>
                <table className="w-full" >
                    <thead className='font-semibold text-sm text-left text-gray-600 bg-gray-100'>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th key={header.id} className='p-2'>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <div></div>
                    <tbody >
                        {table.getRowModel().rows.map(row => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <td className='align-top text-sm text-left p-2' key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table >
            </div>
            <div className='p-2 flex items-center text-sm space-x-2 justify-end'>
                <div>
                    {`Page ${table.getState().pagination.pageIndex + 1} of ${table.getPageCount().toLocaleString()}`}
                </div>
                <div className='space-x-1'>
                    <Button
                        onClick={() => table.firstPage()}
                        disabled={!table.getCanPreviousPage()}

                    >
                        {'<<'}
                    </Button>
                    <Button
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        {'<'}
                    </Button>
                    <Button
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        {'>'}
                    </Button>
                    <Button
                        onClick={() => table.lastPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        {'>>'}
                    </Button>
                </div>
            </div>
        </div>
    );
}