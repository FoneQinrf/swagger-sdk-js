# swagger-sdk-js
根据swagger数据生成请求函数
#### 使用方式
```cmd

npm install swagger-sdk-js

yarn add swagger-sdk-js

```

```javascript

const swaggerGen = require('swagger-sdk-js');

const swaggerApi = new swaggerGen(jsonData)
const codeResult = swaggerApi.getApi();

```
