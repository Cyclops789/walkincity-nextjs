import crypto from "crypto";

export function createHash(password: string) {
    const hash = crypto.createHash('sha256').update(password).digest('hex')
    return hash;
}

export function verifyHash(password: string, hashed: string) {
  const newHash = createHash(password);
  return newHash === hashed;
}