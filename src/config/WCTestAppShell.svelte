<script>
   import { ApplicationShell }   from '@typhonjs-fvtt/runtime/svelte/component/core';

   export let elementRoot;
</script>

<svelte:options accessors={true}/>

<ApplicationShell bind:elementRoot>
<main>
   <span>Document Stat Block:</span>
   <wc-doc-stat-block active=true></wc-doc-stat-block>
</main>
</ApplicationShell>
