<script>
      import { Tabs, TabItem } from 'flowbite-svelte';
    // Import the VariableStore
    import { VariableStore } from "../../../charts/VariableStore";
    import Prism from 'prismjs';
	import { onMount } from 'svelte';
        export let code;
        export let sampleData;

    $: updateCode = () => {
        // Make $VariableStore an array of objects
        let variableStore = Object.entries($VariableStore);

        let newCode = code;

        // Remove the import statement for VariableStore
        newCode = newCode.replace(
            new RegExp(`import { VariableStore } from '..\\/VariableStore';`, "g"),
            ""
        );

        // Extract the content between @variables-start and @variables-end
        const variablesStartIndex = newCode.indexOf("// @variables-start");
        const variablesEndIndex = newCode.indexOf("// @variables-end") + "// @variables-end".length;
        let variablesContent = newCode.substring(variablesStartIndex, variablesEndIndex);

        // Replace $: occurrences only within @variables-start and @variables-end
        variablesContent = variablesContent.replace(
            new RegExp(`\\$:\\s`, "g"),
            "export let "
        );

        // Replace individual variable occurrences
        for (let i = 0; i < variableStore.length; i++) {
            variablesContent = variablesContent.replace(
                new RegExp(`\\$VariableStore.${variableStore[i][0]}.value`, "g"),
                variableStore[i][1].value
            );
        }

        // Put the modified content back into the code
        newCode = newCode.substring(0, variablesStartIndex) + variablesContent + newCode.substring(variablesEndIndex);
        newCode = newCode.replace(/(\n\s*){3,}/g, "\n\n    ");
        // remove // @variables-start and // @variables-end
        newCode = newCode.replace(new RegExp(`// @variables-start`, "g"), "");
        newCode = newCode.replace(new RegExp(`// @variables-end`, "g"), "");

        return newCode;
    };


</script>


<Tabs style="pill" contentClass="pt-2" defaultClass="space-x-0 flex">
    <TabItem open activeClasses="px-3 py-2 rounded-tl-lg rounded-bl-lg text-black bg-white shadow-sm hover:bg-slate-50 border border-slate-300" inactiveClasses="px-3 py-2 rounded-tl-lg rounded-bl-lg bg-white text-slate-600 shadow-none hover:bg-slate-50 border border-slate-200">
      <span slot="title">Chart</span>
      <pre id="component-code" contenteditable>
        <code>{@html Prism.highlight(updateCode(), Prism.languages['javascript'])}</code>
    </pre>
    
    </TabItem>
    <TabItem  activeClasses="px-3 py-2 rounded-tr-lg rounded-br-lg text-black bg-white shadow-sm hover:bg-slate-50 border border-slate-300" inactiveClasses="px-3 py-2 rounded-tr-lg rounded-br-lg bg-white text-slate-600 shadow-none hover:bg-slate-50 border border-slate-200"  >
      <span slot="title">Sample Data</span>
      <pre id="component-data" contenteditable spellcheck="false">
        <code>{@html Prism.highlight(sampleData, Prism.languages['javascript'])}</code>
    </pre>
    </TabItem>
   
  </Tabs>

<style>
    #component-code {
        padding: 1rem;
        background-color: #f5f5f5;
        border-radius: 0.1rem;
        font-size: 0.875rem;
        line-height: 1.5rem;
        overflow-y: auto;
        max-height: 30rem;
        
    }

    #component-code code {
        font-family: 'Fira Code', monospace;
        font-size: 0.875rem;
        line-height: 1.5rem;
    }

    #component-data {
        padding: 1rem;
        background-color: #f5f5f5;
        border-radius: 0.1rem;
        font-size: 0.875rem;
        line-height: 1.5rem;
        overflow-y: auto;
        max-height: 30rem;
    }



</style>