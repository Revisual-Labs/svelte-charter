import { slugify } from "../../utils/url-utils";
/**
 * Represents a chart object with title and path properties.
 * @typedef {Object} ChartObject
 * @property {string} title - The title of the chart.
 * @property {string} path - The slugified path of the chart.
 */


export async function load() {


    const chartComponents = import.meta.glob('../../charts/*/*.md');
    /**
     * @type {ChartObject[]}
     */
    const charts = [];

    for (const path in chartComponents) {
        // @ts-ignore
        const { metadata } = await chartComponents[path]();
        charts.push({
            title: metadata.title,
            path: slugify(metadata.title)
        });
    }

    return {
        props: {
            charts
        }
    };

}
