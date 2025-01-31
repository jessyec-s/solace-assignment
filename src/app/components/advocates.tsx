"use client";

import { Advocate } from "@/db/schema";
import { useEffect, useState } from "react";
import { getAdvocates } from "../actions";
import { DataTable } from "./data_table";
import { columns } from "./data_table/advocate_columns";


const AdvocatesPage = ({ advocates }: { advocates: Advocate[] }) => {
    const [filteredAdvocates, setFilteredAdvocates] = useState(advocates);
    const [filterString, setFilterString] = useState<undefined | string>(undefined);

    const onChange = (e) => {
        const searchTerm = e.target.value;
        document.getElementById("search-term").innerHTML = searchTerm;
        setFilterString(searchTerm)
    };

    useEffect(() => {
        const doGetAdvocates = async () => {
            const advocates = await getAdvocates({ filterString });
            setFilteredAdvocates(advocates)
        }

        if (filterString != undefined) {
            doGetAdvocates()
        }
    }, [filterString])

    const onClick = () => {
        console.log(advocates);
        setFilterString("")
    };

    return (
        <main style={{ margin: "24px" }}>
            <h1>Solace Advocates</h1>
            <br />
            <br />
            <div>
                <p>Search</p>
                <p>
                    Searching for: <span id="search-term"></span>
                </p>
                <input style={{ border: "1px solid black" }} onChange={onChange} />
                <button onClick={onClick}>Reset Search</button>
            </div>
            <br />
            <br />
            <DataTable columns={columns} data={filteredAdvocates} />
        </main>
    );
}

export default AdvocatesPage
