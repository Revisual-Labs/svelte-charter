
/**
 * @function slugify - Converts a string to a slug
 * @param {*} str 
 * @returns string
 */
export function slugify(str) {
    return str.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
}