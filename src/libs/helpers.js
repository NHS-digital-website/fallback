export function guid() {
  return window.crypto.randomUUID();
}

// A web-browsers HMAC-SHA256 signature using window.crypto.subtle
// https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/sign
export async function slackSign(key, message) {

    // Convert the key and the message to ArrayBuffers
    const keyBuffer = new TextEncoder().encode(key);
    const messageBuffer = new TextEncoder().encode(message);

    // Import the key into the Web Crypto API
    const cryptoKey = await window.crypto.subtle.importKey(
        "raw",
        keyBuffer,
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"]
    );

    // Generate the HMAC
    const signature = await window.crypto.subtle.sign(
        "HMAC",
        cryptoKey,
        messageBuffer
    );

    // Convert the HMAC to a hexadecimal representation
    const signatureArray = Array.from(new Uint8Array(signature));
    const signatureHex = signatureArray.map(b => b.toString(16).padStart(2, '0')).join('');

    return `v0=${signatureHex}`;
}