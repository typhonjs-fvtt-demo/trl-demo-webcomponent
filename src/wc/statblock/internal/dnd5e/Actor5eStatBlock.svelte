<svelte:options tag="wc-doc-stat-block-actor5estatblock" />

<script>
   export let doc;
</script>

{#if doc}
   <img class=img src={doc.data.img} alt="doc">
   <div class=content>
      Name: {doc.data.name}
      <br>
      AC: {doc.data?.data.attributes?.ac.value}
   </div>
{/if}

