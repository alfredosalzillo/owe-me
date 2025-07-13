/**
 * Groups an array of elements by a specified property or key selector function.
 * 
 * @template T - The type of elements in the array
 * @template K - The type of the grouping key
 * @param {T[]} array - The array to group
 * @param {string | ((item: T) => K)} keySelector - Property name or function to extract the grouping key
 * @returns {Record<string, T[]>} An object where keys are the grouping keys and values are arrays of matching elements
 */
const groupBy = <T, K extends string | number | symbol>(
  array: T[],
  keySelector: keyof T | ((item: T) => K)
): Record<string, T[]> => {
  return array.reduce((result, item) => {
    // Determine the key based on whether keySelector is a property name or a function
    const key = typeof keySelector === 'function'
      ? (keySelector as ((item: T) => K))(item)
      : String(item[keySelector as keyof T]);
    
    // Initialize the array for this key if it doesn't exist
    if (!result[key as string]) {
      result[key as string] = [];
    }
    
    // Add the item to the array for this key
    result[key as string].push(item);
    
    return result;
  }, {} as Record<string, T[]>);
};

export default groupBy;