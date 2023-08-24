---
title: Line Chart
config:

  height:
    value: 500
    type: number
    description: Height of the chart
    min: 300
    max: 900

  axisSuffix:
    value: "people"
    type: string
    description: Suffix for axis labels

  padding:
    top:
      value: 20
      type: number
      description: Top padding
    right:
      value: 35
      type: number
      description: Right padding
    bottom:
      value: 20
      type: number
      description: Bottom padding
    left:
      value: 15
      type: number
      description: Left padding
      
  xAxisKey:
    value: "Year_R"
    type: array
    options: ["Year_R"]
    description: Key for the x-axis data

  numberOfTicks:
    value: 5
    max: 10
    min: 2
    type: number
    description: Number of ticks on the axes

  nullValue:
    value: "NULL"
    disabled: true
    type: string
    description: Representation for null values

  tickFormatStyle:
    value: ".1s"
    type: string
    description: Format style for tick labels

  toolTipFormatStyle:
    value: ","
    type: string
    description: Format style for tooltip labels

  yAxisPosition:
    value: "right"
    type: array
    options: ["left", "right"]
    description: Position of the y-axis ("left" or "right")

  fontSize:
    value: 12
    type: number
    max: 20
    min: 8
    description: Font size for text elements

  axisStroke:
    value: "#161616"
    type: color
    description: Color of axis lines

  strokeWidth:
    value: 1
    type: number
    max: 5
    min: 1
    description: Width of strokes

  smallWidthThreshold:
    value: 600
    type: number
    description: Threshold for small chart width
---

# Line Chart

Line chart which supports multiple lines and voronoi hover. It can handle multiple groups, which you can configure in a `dataConig` object.

```js
// First create a data config object
let config = {
    Line_1: {
        color: "#324555",
        tooltipSuffix: "people",
    },
    Line_2: {
        color: "#ff6f00",
        tooltipSuffix: "people",
    },
}
```

Here, `Line_1` and `Line_2` are the names of the groups. The `color` property is the color of the line and the `tooltipSuffix` is the suffix for the tooltip labels.

Then, pass the config object to the `dataConfig` prop of the chart.

