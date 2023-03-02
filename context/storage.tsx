export function saveItem(key: any, value: any) {
    sessionStorage.setItem(key, JSON.stringify(value));
  }
  
  export function getItem(key: any) {
    const got = sessionStorage.getItem(key);
    return JSON.parse(got as string);
  }
  