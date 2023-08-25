<script>
    // Import the VariableStore
    import { VariableStore } from "../../../charts/VariableStore";

    export let code;


    $: updateCode = () => {
        // Make $VariableStore an array of objects
        let variableStore = Object.entries($VariableStore);
        let newCode = code;
        for (let i = 0; i < variableStore.length; i++) {
            // Replace the value of each variable with the value from the VariableStore
            // In the code, they are of the form $VariableStore.variable.value
            newCode = newCode.replace(
                new RegExp(`\\$VariableStore.${variableStore[i][0]}.value`, "g"),
                variableStore[i][1].value
            );
        }

        return newCode;
    };

</script>

<pre class="w-1/2">
    {updateCode()}
</pre>
