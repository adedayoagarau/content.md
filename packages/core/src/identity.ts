const RECORD_ID_PATTERN = /^[a-z][a-z0-9]*(?:[._-][a-z0-9]+)*$/;

export function isRecordId(value: string): boolean {
  return RECORD_ID_PATTERN.test(value);
}

export function assertRecordId(value: string): void {
  if (!isRecordId(value)) {
    throw new TypeError(`Invalid record_id: ${value}`);
  }
}
