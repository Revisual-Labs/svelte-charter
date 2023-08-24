<script>
    export let data;
    // Transform the data object into an array of its properties
    const dataProperties = Object.entries(data);
    import { VariableStore } from '../../../charts/VariableStore.js';
  </script>
  
  <div class="py-4 border-t border-slate-100">
    <div class="px-4 sm:px-0 sticky top-2 ">
      <h3 class="text-lg font-semibold leading-7 text-gray-900">Properties</h3>
    </div>
    <div class="mt-6 border-t border-gray-100">
      <dl class="divide-y divide-gray-100">
        {#each dataProperties as [propertyName, property]}
        <div class="px-4 py-2 sm:grid sm:grid-cols-3 sm:px-0">
          <dt class="text-sm font-medium leading-6 text-gray-900">{propertyName}</dt>
          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0">{property.description}</dd>
              <!-- Input based on type of value -->
                {#if property.type === 'number'}
                <div>
             


<input id="default-range" type="range" max={$VariableStore[propertyName].max} min={$VariableStore[propertyName].min} bind:value={$VariableStore[propertyName].value} class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer ">

                </div>
                    {:else if property.type === 'boolean'}
                <div>
                    <input
                        type="checkbox"
                        class="mt-1  w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        bind:checked={$VariableStore[propertyName].value}
                    />
                </div>
                    {:else if property.type === 'string'}
                <div>
                    <input
                        type="text"
                        disabled={$VariableStore[propertyName]?.disabled}
                        class="mt-1  w-full rounded-md border-gray-300 shadow-sm  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        bind:value={$VariableStore[propertyName].value}
              
                    />
                </div>
                    {:else if property.type === 'array'}
                <div>
                    <select
                        class="mt-1  w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        bind:value={$VariableStore[propertyName].value}
              
                    >
                        {#each property.options as enumValue}
                        <option value={enumValue}>{enumValue}</option>
                        {/each}
                    </select>
                </div>
                    <!-- {:else if property.type === 'object'}
                <div>
                    <select
                        class="mt-1  w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        bind:value={$VariableStore[propertyName].value}
              
                    >
                        {#each Object.keys(property.properties) as propertyKey}
                        <option value={propertyKey}>{propertyKey}</option>
                        {/each}
                    </select>
                </div> -->
                    {:else if property.type === 'color'}
                <div>
                    <input
                        type="color"
                        class="mt-1  w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        bind:value={$VariableStore[propertyName].value}
              
                    />
                </div>

                    {/if}

        </div>
        {/each}
      </dl>
    </div>
  </div>
  