/**
 * Please see `./LICENSE` for license details.
 */

/**
 *
 */
export default class Buttons
{
   /**
    * @param {import('tinymce').Editor}  editor -
    */
   static register(editor)
   {
      editor.ui.registry.addToggleButton('typhonjs-wc', {
         tooltip: 'Insert stat block',
         icon: 'embed',
         onAction: () =>
         {
            editor.execCommand('typhonjsWC');
         },
         onSetup: stateSelectorAdapter(editor, ['img[data-mce-object]', 'span[data-mce-object]'])
      });

      editor.ui.registry.addMenuItem('typhonjs-wc', {
         icon: 'embed',
         text: 'Stat Block',
         onAction: () =>
         {
            editor.execCommand('typhonjsWC');
         }
      });
   }
}

/**
 * @param {import('tinymce').Editor}    editor -
 *
 * @param {string[]}  selector -
 *
 * @returns {function(import('tinymce').Toolbar.ToolbarToggleButtonInstanceApi): *} -
 */
const stateSelectorAdapter = (editor, selector) => (buttonApi) =>
 editor.selection.selectorChangedWithUnbind(selector.join(','), buttonApi.setActive).unbind;