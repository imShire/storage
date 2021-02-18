/**
 * 设置默认值
 * @param value
 * @constructor
 */
export function DefaultValue(value: string) {
  return function (target: any, propertyName: string) {
    target[propertyName] = value;
  }
}
