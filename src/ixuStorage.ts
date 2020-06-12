// @ts-ignore
import { version } from '../package'
const DEFAULT_PREFIX = 'ixu.me';
class IxuStorage {
    private readonly _prefix_: string;
    private readonly _Storage: any;
    private readonly _disabled: boolean;
    private readonly version: string;

    constructor(Storage: Storage, prefix: string | number) {
        // _${prefix}_${key}
        this.version = version;
        this._Storage = Storage;
        this._disabled = this.hasLocalStorage();
        this._prefix_ = `_${String(prefix || DEFAULT_PREFIX).toUpperCase()}_`;
        console.log('Storage this._prefix', Storage, this._prefix_);
        this.queryUseSize()
    }

    getKey(key: string | number) {
        return `${this._prefix_}${key}`;
    }

    /**
     * 判断浏览器是否支持localStorage
     */
    private hasLocalStorage(): boolean {
        if (!this._Storage) {
            console.log('浏览器不支持', this._Storage);
            return true;
        }
        return false;
    }

    /**
     * 存储localStorage
     * @param {*} key
     * @param {*} content
     */
    set(key: string | number, content: any) {
        if (this._disabled) return;
        if (!key) return;
        if (typeof content !== 'string') {
            content = JSON.stringify(content);
        }
        // 防止超出本地存储限额！
        try {
            this._Storage.setItem(this.getKey(key), content);
        } catch (oException) {
            if (oException.name === 'QuotaExceededError') {
                console.log('超出本地存储限额！');
            }
        }
    }

    has (key: string | number) {
        return this.get(key) !== undefined
    }

    get(key: string | number, parse = false) {
        if (this._disabled) return;
        if (!key) return;
        let val =  deserialize(this._Storage.getItem(this.getKey(key)));
        return (val === undefined ? parse : val)
    }

    remove(key: string | number) {
        if (this._disabled) return;
        if (!this.getKey(key)) return;
        this._Storage.removeItem(this.getKey(key));
    }

    /**
     * 清空clearStorage
     * @param {*} key
     */
    clear(key: string | number) {
        if (this._disabled) return;
        if (!this.getKey(key)) return;
        this._Storage.clear();
    }

    /**
     * 当前localStorage剩余容量
     */
    queryUseSize(): void {
        if (this._disabled) {
            return;
        }
        let size = 0;
        for (const key in this._Storage) {
            // eslint-disable-next-line no-prototype-builtins
            if (this._Storage.hasOwnProperty(key)) {
                size += this._Storage.getItem(key).length;
            }
        }
        console.log('当前localStorage剩余容量为' + (size / 1024).toFixed(2) + 'kb');
    }
}

function serialize (val: any) {
    return JSON.stringify(val)
}

function deserialize (val: any) {
    if (typeof val !== 'string') {
        return undefined
    }
    try {
        return JSON.parse(val)
    } catch (e) {
        return val || undefined
    }
}

export default IxuStorage;
