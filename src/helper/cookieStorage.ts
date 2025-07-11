export function getItem(item: string): string {
  if (typeof document !== "object") return "";
  const cookies = document?.cookie?.split(";");
  return getItemFromCookie(cookies, item);
}

export function getItemFromCookie(cookies: string[], item: string): string {
  return cookies.reduce((acc, currCookie) => {
    const trimmedCookie = currCookie.trim();
    if (trimmedCookie.startsWith(`${item}=`)) {
      acc = trimmedCookie.replace(`${item}=`, "");
    }
    if (acc !== "") {
      return acc;
    }
    return acc;
  }, "");
}

export function setItem(key: string, value: string) {
  document.cookie = `${key}=${value}; path=/`;
}

export function removeItem(key: string) {
  const cookies = document.cookie.split(";");
  const updatedCookie = cookies
    .map((currCookie) => {
      const trimmedCookie = currCookie.trim();
      if (trimmedCookie.startsWith(`${key}=`)) {
        return `${key}=;Expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/`;
      }
      return trimmedCookie;
    })
    .join(";");
  document.cookie = updatedCookie;
}

export function clearAllCookie() {
  const cookies = document.cookie.split(";");
  cookies.forEach((currCookie) => {
    const trimmedCookie = currCookie.trim();
    const eqPos = trimmedCookie.indexOf("=");
    const name = eqPos > -1 ? trimmedCookie.substr(0, eqPos) : trimmedCookie;
    document.cookie = `${name}=;Expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/`;
  });
}
