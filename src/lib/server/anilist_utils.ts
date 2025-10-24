function buildBatchQuery(anilistIDs: Array<number>){
    let queries = '';
    anilistIDs.forEach((id, index) => {
        queries += `
            a_${index}: Media(id: ${id}, type: ANIME) {
                id
                title {
                    romaji
                    english
                }
                coverImage {
                    extraLarge
                }
            }
        `;
    });

    return `query AnimeBatch { ${queries} }`;
}

export {buildBatchQuery}