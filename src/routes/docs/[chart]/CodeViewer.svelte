<script>
    // Import the VariableStore
    import { VariableStore } from "../../../charts/VariableStore";

    export let code;

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

        // remove // @variables-start and // @variables-end
        newCode = newCode.replace(new RegExp(`// @variables-start`, "g"), "");
        newCode = newCode.replace(new RegExp(`// @variables-end`, "g"), "");

        return newCode;
    };
</script>

<pre class="w-1/2">
    {updateCode()}
</pre>
