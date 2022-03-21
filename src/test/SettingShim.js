import openTestApp   from './openTestApp.js';

/**
 * Provides a shim for the module settings menu that simply triggers launching the main settings menu.
 *
 * This prevents duplicate Settings apps from launching from module settings and allows for macro launching of settings
 * sharing the same single app.
 */
export default class SettingsShim extends FormApplication
{
   /**
    * @inheritDoc
    */
   constructor(options = {})
   {
      super({}, options);

      openTestApp();
   }

   /**
    * @override
    * @protected
    * @ignore
    */
   async _updateObject(event, formData) {}

   /**
    * @override
    * @protected
    * @ignore
    */
   render() { this.close(); }
}