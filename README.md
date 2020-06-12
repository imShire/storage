# storage
a storage lib which support sessionStorage and localStorage with the same api

## Install

```
 npm install @shire/storage
```

## Usage

```
 import storage from '@shire/storage'
 
 // localStorage
 storage.set(key,val) 
 
 storage.get(key, parse)
 
 // sessionStorage
 storage.session.set(key, val)
 
 storage.session.get(key, val)
 
```

## API

#### set(key, val)

set storage with key and val

#### get(key, parse)

get storage with key, return def if not find

#### remove(key)

remove storage with key

#### has(key)

determine storage has the key

#### clear()
clear all storages
