import Buttons from './ui/Buttons.js';

export class PluginWC
{
   constructor(editor)
   {
      editor.addCommand('typhonjsWC', () => editor.insertContent('<wc-doc-stat-block>*</wc-doc-stat-block>'));

      Buttons.register(editor);

      // Add custom element to settings
      if (typeof editor.settings.custom_elements === 'string')
      {
         if (!editor.settings.custom_elements.includes('wc-doc-stat-block'))
         {
            if (editor.settings.custom_elements.length === 0)
            {
               editor.settings.custom_elements = '~wc-doc-stat-block';
            }
            else
            {
               editor.settings.custom_elements += ', ~wc-doc-stat-block';
            }
         }
      }
      else
      {
         editor.settings.custom_elements = '~wc-doc-stat-block';
      }

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

         // Add web components to TinyMCE iFrame.
         const script = doc.createElement('script');
         script.type = 'module';
         script.src = '/modules/typhonjs-webcomponent/dist/typhonjs-webcomponent.js';
         doc.head.appendChild(script);
      });

      // The preinit event is fired after the editor is loaded but before
      // the content is loaded
      // https://www.tiny.cloud/docs/advanced/events/#editorcoreevents
      editor.on('preinit', () => {
         // During the creation of the web component we set contenteditable false
         // on the web component to make it behave like a noneditable but selectable
         // element inside TinyMCE. But we don't want the contenteditable attribute
         // to be saved with the content. We therefore need to filter out the attribute
         // upon serlialization (which happens on "save", view sourcecode and preview
         // among others).
         // https://www.tiny.cloud/docs/api/tinymce.dom/tinymce.dom.serializer/#addnodefilter
         editor.serializer.addNodeFilter('wc-doc-stat-block', (nodes) => {
            // console.log(`!!! ADD NODE FILTER`);

            // Iterate through all filtered nodes and remove the contenteditable attribute
            // nodes.forEach((node) => {
            //    if (!!node.attr('contenteditable')) {
            //       node.attr('contenteditable', null);
            //    }
            // });
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