import {useState, useEffect} from 'react';

/** Customize a hook used to save state data into local storage
 * set item as state and check at localStorage for current value
 * if not found with the key give, then set it with the default, firstValue 
 * in the useEffect, re-render when item changes:
 * if new item state is null, then remove key from localStroage
 * else, set key with the updated item in the storage
 */

function useLocalStorage(key, firstValue = null) {
    const initialValue = localStorage.getItem(key) || firstValue;    
    const [item, setItem] = useState(initialValue);

    useEffect(function setKeyInLocalStorage() {
        console.debug("hooks useLocalStorage useEffect", "item=", item);

        if(item === null) {
            localStorage.removeItem(key);
        } else {
            localStorage.setItem(key, item);
        }
    }, [key, item]);

    return [item, setItem];
}

export default useLocalStorage;
