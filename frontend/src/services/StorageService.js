const StorageService = {
  set(key, value) {
    if (value === undefined || value === null) {
      localStorage.removeItem(key);
    } else {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (e) {
        console.warn(`Failed to save ${key} to localStorage`, e);
      }
    }
  },

  get(key) {
    try {
      const item = localStorage.getItem(key);
      if (item && item !== 'undefined') {
        return JSON.parse(item);
      }
      return null;
    } catch (e) {
      console.warn(`Failed to parse ${key} from localStorage`, e);
      return null;
    }
  },

  remove(key) {
    localStorage.removeItem(key);
  },
};

export default StorageService;
