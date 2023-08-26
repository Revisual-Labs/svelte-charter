<script>
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
    import LineChart from './LineChart.svelte';
    

</script>

<Meta title="Charts/Line Chart" component={LineChart}  />

<Template let:args>
    <LineChart {...args} />
</Template>

<Story name="Default" />
