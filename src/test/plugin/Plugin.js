import { appendConfigString } from './appendConfigString.js';

export class PluginWC
{
   /**
    * @param {import('tinymce').Editor}  editor -
    */
   constructor(editor)
   {
      editor.addCommand('typhonjsWC', () => editor.insertContent('<wc-doc-stat-block>&nbsp;</wc-doc-stat-block>'));

      // Register button.
      editor.ui.registry.addToggleButton('typhonjs-wc', {
         tooltip: 'Insert stat block',
         icon: 'embed-page',
         onAction: () => editor.execCommand('typhonjsWC')
      });

      editor.settings.extended_valid_elements = appendConfigString(editor.settings.extended_valid_elements,
       'wc-doc-stat-block[*]');

      editor.settings.custom_elements = appendConfigString(editor.settings.custom_elements, 'wc-doc-stat-block');

      editor.on('init', () =>
      {
         // Get the iframe window object and the iframes document object
         // and call our setup function that creates the web component
         // https://www.tiny.cloud/docs/api/tinymce/tinymce.editor/#getwin
         // https://www.tiny.cloud/docs/api/tinymce/tinymce.editor/#getdoc
         const win = editor.getWin();
         const doc = editor.getDoc();

         // Assign Foundry globals from parent to TinyMCE iFrame.
         win.foundry = globalThis.foundry;
         win.game = globalThis.game;
         win.ui = globalThis.ui;
         win.Hooks = globalThis.Hooks;
         win.fromUuid = globalThis.fromUuid;

         // Add web components to TinyMCE iFrame.
         const script = doc.createElement('script');
         script.type = 'module';
         script.src = '/modules/typhonjs-webcomponent/dist/typhonjs-webcomponent.js';
         doc.head.append(script);
      });

      // The preinit event is fired after the editor is loaded but before
      // the content is loaded
      // https://www.tiny.cloud/docs/advanced/events/#editorcoreevents
      editor.on('preinit', () => {
         editor.parser.addNodeFilter('wc-doc-stat-block', (nodes) =>
         {
            for (const node of nodes)
            {
               node.attr('active', 'true');
               node.attr('contenteditable', 'false')
            }
         });


         // During the creation of the web component we set contenteditable false
         // on the web component to make it behave like a noneditable but selectable
         // element inside TinyMCE. But we don't want the contenteditable attribute
         // to be saved with the content. We therefore need to filter out the attribute
         // upon serialization (which happens on "save", view sourcecode and preview
         // among others).
         // https://www.tiny.cloud/docs/api/tinymce.dom/tinymce.dom.serializer/#addnodefilter
         editor.serializer.addNodeFilter('wc-doc-stat-block', (nodes) => {
            // Iterate through all filtered nodes and remove the active and contenteditable attributes.
            for (const node of nodes)
            {
               if (!!node.attr('active')) { node.attr('active', null); }
               if (!!node.attr('contenteditable')) { node.attr('contenteditable', null); }
            }
         });
      });
   }

   getMetadata()
   {
      return {
         name: 'TyphonJS Web Components',
         url: 'https://github.com/typhonjs-fvtt/typhonjs-webcomponent'
      };
   }
}

export default () =>
{
   tinymce.PluginManager.add('typhonjs-wc', PluginWC);
};