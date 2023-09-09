export const isTypeof = (
  entity: any,
  checkedType:
    | 'string'
    | 'number'
    | 'bigint'
    | 'boolean'
    | 'symbol'
    | 'undefined'
    | 'object'
    | 'function',
) => typeof entity === checkedType;
