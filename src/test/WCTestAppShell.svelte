<script>
   import { ApplicationShell }   from '@typhonjs-fvtt/runtime/svelte/component/core';

   export let elementRoot;
</script>

<svelte:options accessors={true}/>

<ApplicationShell bind:elementRoot>
   Hello Test!
   <br>
   <wc-doc-stat-block/>
</ApplicationShell>
