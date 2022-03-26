<script>
   import { ApplicationShell }   from '@typhonjs-fvtt/runtime/svelte/component/core';

   export let elementRoot;
</script>

<svelte:options accessors={true}/>

<ApplicationShell bind:elementRoot>
<main>
   <span>Document Stat Block:</span>
   <wc-doc-stat-block active=true></wc-doc-stat-block>
   <div class=container>
      <span>Usage: &lt;wc-doc-stat-block uuid="<code>string</code>" active="<code>string</code>" /&gt;</span>
      <span>uuid - A Foundry document UUID.</span>
      <span>active - Enables document drag & drop when 'true'.</span>
   </div>
</main>
</ApplicationShell>

<style>
   div.container {
      background: lightblue;
      display: flex;
      flex-direction: column;
      border-radius: 4px;
      border: 2px solid rgba(100, 150, 255, 0.8);
      padding: 0.25em;
      margin-top: 0.25em;
   }
</style>
