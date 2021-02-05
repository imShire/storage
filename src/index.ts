import IxuStorage from './ixuStorage';

// 单例模式
function getInstance(options: { [x: string]: any; }) {
  let defaultOptions = {
    name: '$storage',
    prefix: '',
  };
  for (let property in options) {
    // @ts-ignore
    defaultOptions[property] = options[property];  // 使用 options 的配置
  }
  let instance: any;
  // 判断是否已经new过1个实例
  if (!instance) {
    instance = new IxuStorage(window.localStorage, defaultOptions.prefix);
    instance.session = new IxuStorage(window.sessionStorage, defaultOptions.prefix);
  }
  // 如果这个唯一的实例已经存在，则直接返回
  return instance;
}

export default getInstance;
