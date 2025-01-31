"use client";

import { Advocate } from "@/db/schema";
import { useEffect, useState } from "react";
import { getAdvocates } from "../actions";


const AdvocatesPage = ({ advocates }: { advocates: Omit<Advocate, "id" | "createdAt">[] }) => {
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
            <table>
                <thead>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>City</th>
                    <th>Degree</th>
                    <th>Specialties</th>
                    <th>Years of Experience</th>
                    <th>Phone Number</th>
                </thead>
                <tbody>
                    {filteredAdvocates.map((advocate) => {
                        return (
                            <tr>
                                <td>{advocate.firstName}</td>
                                <td>{advocate.lastName}</td>
                                <td>{advocate.city}</td>
                                <td>{advocate.degree}</td>
                                <td>
                                    {advocate.specialties.map((s) => (
                                        <div>{s}</div>
                                    ))}
                                </td>
                                <td>{advocate.yearsOfExperience}</td>
                                <td>{advocate.phoneNumber}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </main>
    );
}

export default AdvocatesPage
