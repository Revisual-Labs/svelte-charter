
import { dev } from '$app/environment';
export const csr = dev;
export const prerender = true;
import { VariableStore } from '../../../charts/VariableStore';
import { page } from '$app/stores';
/** @type {import('./$types').PageLoad} */
export async function load({ params }) {

    const component = await import(`../../../charts/${params.chart}/index.svelte`);
    const {metadata} = await import(`../../../charts/${params.chart}/readme.md`);
    
    console.log(metadata.config);
    // {
    //     "width": {
    //       "value": 500,
    //       "type": "number",
    //       "description": "Width of the chart",
    //       "min": 100,
    //       "max": 1000
    //     },
    //     "height": {
    //       "value": 300,
    //       "type": "number",
    //       "description": "Height of the chart",
    //       "min": 100,
    //       "max": 1000
    //     },
    //     "axisSuffix": {
    //       "value": "people",
    //       "type": "string",
    //       "description": "Suffix for axis labels"
    //     },
    //     "padding": {
    //       "top": {
    //         "value": 20,
    //         "type": "number",
    //         "description": "Top padding"
    //       },
    //       "right": {
    //         "value": 35,
    //         "type": "number",
    //         "description": "Right padding"
    //       },
    //       "bottom": {
    //         "value": 20,
    //         "type": "number",
    //         "description": "Bottom padding"
    //       },
    //       "left": {
    //         "value": 15,
    //         "type": "number",
    //         "description": "Left padding"
    //       }
    //     },
    //     "xAxisKey": {
    //       "value": "Year_R",
    //       "type": "string",
    //       "description": "Key for the x-axis data"
    //     },
    //     "numberOfTicks": {
    //       "value": 5,
    //       "type": "number",
    //       "description": "Number of ticks on the axes"
    //     },
    //     "nullValue": {
    //       "value": "NULL",
    //       "type": "string",
    //       "description": "Representation for null values"
    //     },
    //     "tickFormatStyle": {
    //       "value": ".2s",
    //       "type": "string",
    //       "description": "Format style for tick labels"
    //     },
    //     "toolTipFormatStyle": {
    //       "value": ",",
    //       "type": "string",
    //       "description": "Format style for tooltip labels"
    //     },
    //     "yAxisPosition": {
    //       "value": "right",
    //       "type": "string",
    //       "description": "Position of the y-axis (\"left\" or \"right\")"
    //     },
    //     "fontSize": {
    //       "value": "12px",
    //       "type": "string",
    //       "description": "Font size for text elements"
    //     },
    //     "axisStroke": {
    //       "value": "#161616",
    //       "type": "string",
    //       "description": "Color of axis lines"
    //     },
    //     "strokeWidth": {
    //       "value": 1,
    //       "type": "number",
    //       "description": "Width of strokes"
    //     },
    //     "smallWidthThreshold": {
    //       "value": 600,
    //       "type": "number",
    //       "description": "Threshold for small chart width"
    //     }
    //   }

    // set variables in the store
   VariableStore.set(metadata.config);
    return {
        props: {
            component: component.default,
            metadata: metadata
        }
    };

}  