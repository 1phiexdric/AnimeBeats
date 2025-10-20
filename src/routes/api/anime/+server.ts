import { fetchAniListPage } from "$lib";
import { json } from "@sveltejs/kit";

export async function GET({ url }) {
    const page = Number(url.searchParams.get('page') ?? '1')
    const data = await fetchAniListPage(page, 12);
    return json(data.data.Page.media)
}