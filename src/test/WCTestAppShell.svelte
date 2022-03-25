<script>
   import { ApplicationShell }   from '@typhonjs-fvtt/runtime/svelte/component/core';

   export let elementRoot;

   let iframe;

   $: if (iframe)
   {
      // on Firefox must wait until IFrame is loaded - Chrome doesn't receive this event.
      // iframe.contentWindow.addEventListener('load', () => console.log('!!! iframe loaded'));

      // TODO REMOVE - test iframe - timeout for Firefox
      setTimeout(() =>
      {
         const win = iframe.contentWindow;
         const doc = iframe.contentDocument;

         // Assign Foundry globals from parent to iFrame.
         win.foundry = globalThis.foundry;
         win.game = globalThis.game;
         win.ui = globalThis.ui;
         win.Hooks = globalThis.Hooks;
         win.fromUuid = globalThis.fromUuid;

         win.addEventListener('drop', () => { console.log('webview drop') });
         win.addEventListener('dragenter', (ev) => { console.log('webview dragenter: ', ev.dataTransfer.getData('text/plain')) });

         // Add web components to iFrame.
         const script = doc.createElement('script');
         script.type = 'module';
         script.src = '/modules/typhonjs-webcomponent/dist/typhonjs-webcomponent.js';
         doc.head.appendChild(script);

         const wcElem = doc.createElement('wc-doc-stat-block');
         doc.body.appendChild(wcElem);

         // TODO: remove - test DIV
         const divElem = doc.createElement('div');
         divElem.style.width = 'auto';
         divElem.style.height = '50px';
         divElem.style.background = 'red';
         divElem.addEventListener('drop', () => console.log('! dropped on DIV'))
         divElem.addEventListener('dragenter', () => console.log('! drag enter on DIV'))
         doc.body.appendChild(divElem);

         // TODO: this doesn't appear to work.
         wcElem.uuid = 'Actor.TVRkiUOF8iTUFDsV';
      }, 100);
   }

</script>

<svelte:options accessors={true}/>

<ApplicationShell bind:elementRoot>
   <wc-doc-stat-block uuid="Actor.TVRkiUOF8iTUFDsV" />
<!--   <wc-doc-stat-block />-->
   <hr>
   <iframe bind:this={iframe} title="test"></iframe>
</ApplicationShell>
