"use client";

import { Advocate } from "@/db/schema";
import { useEffect, useState } from "react";
import { getAdvocates } from "../actions";
import { DataTable } from "./data_table";
import { columns } from "./data_table/advocate_columns";


const AdvocatesPage = ({ advocates }: { advocates: Advocate[] }) => {
    const [filteredAdvocates, setFilteredAdvocates] = useState(advocates);
    const [filterString, setFilterString] = useState<undefined | string>(undefined);

    useEffect(() => {
        const doGetAdvocates = async () => {
            const advocates = await getAdvocates({ filterString });
            setFilteredAdvocates(advocates)
        }

        if (filterString != undefined) {
            doGetAdvocates()
        }
    }, [filterString])

    return (
        <div className="space-y-4">
            <h1 className="font-bold text-2xl text-emerald-800">Solace Advocates</h1>
            <input
                placeholder="Search..."
                className="p-1 border rounded text-sm border-gray-300 w-[400px]"
                onChange={(e) => setFilterString(e.target.value)}
            />
            <DataTable columns={columns} data={filteredAdvocates} />
        </div>
    );
}

export default AdvocatesPage
