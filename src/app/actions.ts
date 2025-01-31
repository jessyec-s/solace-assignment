"use server"

import db from "@/db";
import { advocates } from "@/db/schema";
import { ilike, or, sql } from "drizzle-orm";

export async function getAdvocates({ filterString }: { filterString?: string }) {
    const filterItems = !!filterString && filterString.length > 0
    const matchString = `%${filterString}%`
    return await db.select().from(advocates)
        .where(filterItems ? or(
            ilike(advocates.firstName, matchString),
            ilike(advocates.lastName, matchString),
            ilike(advocates.city, matchString),
            ilike(advocates.degree, matchString),
            sql<string>`${advocates.specialties}::text ilike ${matchString}`,
            sql<string>`cast(${advocates.yearsOfExperience} as text) ilike ${matchString}`,
            sql<string>`cast(${advocates.phoneNumber} as text) ilike ${matchString}`) : undefined)
        .orderBy(advocates.firstName)
        .limit(5);

}