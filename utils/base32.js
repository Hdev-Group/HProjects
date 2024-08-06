export function isValidBase32(str) {
    const base32Regex = /^[A-Z2-7]+=*$/;
    return base32Regex.test(str);
  }