export function encodeCursor(createdAt: string, id: string): string {
  const raw = `${createdAt}:${id}`;
  return Buffer.from(raw).toString('base64');
}

export function decodeCursor(cursor?: string | null): { createdAt: string, id: string } | null{
  if (!cursor) {
      return null; 
  }

  try {
    const decoded = Buffer.from(cursor, 'base64').toString('utf-8');
    const lastColonIndex = decoded.lastIndexOf(':');

    if (lastColonIndex === -1) {
      throw new Error(`Invalid cursor format: ${decoded}`);
    }

    const createdAt = decoded.substring(0, lastColonIndex);
    const id = decoded.substring(lastColonIndex + 1);
    
    return { createdAt, id };
  } catch (err) {
    throw new Error(`Failed to decode cursor: ${(err as Error).message}`);
  }
}