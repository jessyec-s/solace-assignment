"use server"
import { getAdvocates } from "./actions";
import AdvocatesPage from "./components/advocates";

export default async function Page() {
  const advocates = await getAdvocates()

  return <AdvocatesPage advocates={advocates} />
}
