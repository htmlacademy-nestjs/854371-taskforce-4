export type DateTimeUnit = 's' | 'h' | 'd' | 'm' | 'y'
export type TimeWithUnit = {
  unit: DateTimeUnit;
  value: number;
}

export function parseTime(time: string): TimeWithUnit {
  const regex = /^(\d+)([shdmy])/;
  const match = regex.exec(time);

  if (!match) {
    throw new Error(`[parseTime] Bad time string: ${time}`);
  }

  const [ , valueRaw, unitRaw ] = match;
  const value = parseInt(valueRaw, 10);
  const unit = unitRaw as DateTimeUnit;

  if (isNaN(value)) {
    throw new Error(`[parseTime] Can't parse value count. Result is NaN.`);
  }

  return { value, unit };
}
