<script>
    export let data;
    // Transform the data object into an array of its properties
    const dataProperties = Object.entries(data);
    import { VariableStore } from '../../../charts/VariableStore.js';
  </script>
  
  <div class="py-12 relative">
    <div class="px-4 sm:px-0  ">
      <h3 class="text-lg font-semibold leading-7 text-gray-900">Properties</h3>
      <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Tweak to your liking</p>
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
                    <input
                        type="number"
                        class="mt-1  w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        bind:value={$VariableStore[propertyName].value}
              
                    />
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
                        class="mt-1  w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        bind:value={$VariableStore[propertyName].value}
              
                    />
                </div>
                    {:else if property.type === 'array'}
                <div>
                    <select
                        class="mt-1  w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        bind:value={$VariableStore[propertyName].value}
              
                    >
                        {#each property.enum as enumValue}
                        <option value={enumValue}>{enumValue}</option>
                        {/each}
                    </select>
                </div>
                    {:else if property.type === 'object'}
                <div>
                    <select
                        class="mt-1  w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        bind:value={$VariableStore[propertyName].value}
              
                    >
                        {#each Object.keys(property.properties) as propertyKey}
                        <option value={propertyKey}>{propertyKey}</option>
                        {/each}
                    </select>
                </div>
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
  