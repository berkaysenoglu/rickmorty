export const baseURL = 'https://rickandmortyapi.com/api'

export const episodeURL = `${baseURL}/episode`
export const characterURL = `${baseURL}/character`
export const locationURL = `${baseURL}/location`

export const pages = ['Episodes', 'Characters', 'Locations'];

export const settings = ['Favorites'];

export const formatEpisode = (episode) => {
    const match = episode.match(/S(\d+)E(\d+)/);
    if (!match) return episode;

    const season = parseInt(match[1], 10);
    const episodeNumber = parseInt(match[2], 10);
    return `Season ${season} Episode ${episodeNumber}`;
};