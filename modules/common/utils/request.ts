export function extractAuthToken(authorization) {
  if (typeof authorization !== 'string' || !authorization) {
    return null;
  }

  const headerParts = authorization.split(' ');

  if (headerParts[0].toLowerCase() === 'bearer') {
    return headerParts[1];
  }

  return null;
}
