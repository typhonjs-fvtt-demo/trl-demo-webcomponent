export function appendConfigString(setting, append)
{
   return typeof setting === 'string' && !setting.includes(append) && setting.length > 0 ?
    `${setting},${append}` : append;
}