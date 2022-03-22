<script>
   import { ApplicationShell }   from '@typhonjs-fvtt/runtime/svelte/component/core';

   export let elementRoot;
</script>

<svelte:options accessors={true}/>

<ApplicationShell bind:elementRoot>
<!--   <wc-doc-stat-block uuid="Actor.TVRkiUOF8iTUFDsV" />-->
   <wc-doc-stat-block />
</ApplicationShell>
