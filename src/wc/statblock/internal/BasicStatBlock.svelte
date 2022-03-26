<svelte:options tag="wc-doc-stat-block-basicstatblock" />

<script>
   export let doc;
</script>

{#if doc}
   <img class=img src={doc.data.img} alt="doc">
   <div class=content>
      Name: {doc.data.name}
   </div>
{/if}

