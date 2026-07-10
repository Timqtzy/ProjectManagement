import { createClient } from "@/lib/utils/supabase/server";
import { cookies } from "next/headers";

export default async function Instruments() {
    const cookieStore = await cookies();
    const supabase = await createClient(cookieStore);
    const { data: instruments, error } = await supabase.from("instruments").select();

    if (error) {
        return <pre>{JSON.stringify(error, null, 2)}</pre>;
    }

    return <pre>{JSON.stringify(instruments, null, 2)}</pre>;
}

//YOOO! this is a test page to check if the database is connected and fetching data!
//I will delete this next time!
//I already setup the supabase ENV just check the notion, I will put it there!