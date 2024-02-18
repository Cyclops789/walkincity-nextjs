/**
 * YouTube URL regex.
 *
 * Patterns:
 *   https://www.youtube.com/watch?v=<ID>
 *   https://www.youtube.com/watch?v=<ID>&feature=youtu.be
 *   https://youtu.be/<ID>
 *   https://youtu.be/<ID>?t=1s
 */
const regex = /(youtube\.com\/watch\?v=|youtu\.be\/)([0-9A-Za-z_-]{10}[048AEIMQUYcgkosw])/;

/**
 * Get the YouTube video ID from a URL or string.
 *
 * @param url - The URL or string.
 * @returns - The video ID.
 */
export default function YouTubeVideoId(url: string): string {
    const match = url.match(regex);

    if (match?.length && match[2]) {
        return (match[2].includes(".com") ? 'invalid_url' : match[2]);
    }

    return (url.includes(".com") ? 'invalid_url' : url);
}