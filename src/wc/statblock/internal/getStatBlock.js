import BasicStatBlock   from './BasicStatBlock.svelte';
import Actor5eStatBlock from './dnd5e/Actor5eStatBlock.svelte';

const compMap = new Map();

compMap.set('Actor5e', Actor5eStatBlock);

export function getStatBlock(doc)
{
   const result = compMap.get(doc.constructor.name);
   return result ? result : BasicStatBlock;
}