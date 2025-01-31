"use client"
import { Advocate } from "@/db/schema";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Advocate>[] = [
    {
        header: 'First Name',
        accessorKey: 'firstName',
    },
    {
        header: 'Last Name',
        accessorKey: 'lastName',
    },
    {
        header: 'City',
        accessorKey: 'city',
    },
    {
        header: 'Degree',
        accessorKey: 'degree',
    },
    {
        header: 'Specialties',
        accessorFn: (row) => row.specialties.join(", "),
        cell: ({ row }) => <div className="max-w-sm" >{row.original.specialties.join(", ")}</div>
    },
    {
        header: 'Years of Experience',
        accessorKey: 'yearsOfExperience',
    },
    {
        header: 'Phone Number',
        accessorKey: 'phoneNumber',
    },



]