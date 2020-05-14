/*
 * @Author: Fone丶峰
 * @Date: 2020-05-13 14:32:37
 * @LastEditors: Fone丶峰
 * @LastEditTime: 2020-05-14 10:49:20
 * @Description: msg
 * @Email: qinrifeng@163.com
 * @Github: https://github.com/FoneQinrf
 */
const Handlebars = require('handlebars')
const fs = require('fs')
const path = require('path')
const beautify = require('js-beautify').js_beautify
const request = fs.readFileSync(path.join(__dirname, './src/template/request.hbs'), 'utf-8')
const method = fs.readFileSync(path.join(__dirname, './src/template/method.hbs'), 'utf-8')
const service = fs.readFileSync(path.join(__dirname, './src/template/service.hbs'), 'utf-8')
Handlebars.registerPartial('method', method)
Handlebars.registerPartial('request', request)
Handlebars.registerPartial('service', service)

class createApi {

    constructor(swaggerJson) {
        if (!swaggerJson) {
            throw new Error('传入数据为空')
        }
        this.swaggerJson = swaggerJson
    }

    getApi() {
        return this.createFnc()
    }

    createFnc() {
        const methodsList = this.getMethodJson()
        const data = {
            methods: methodsList,
            info: this.swaggerJson.info
        }
        let json = beautify(Handlebars.compile(request)(data))
        return json;
    }

    getMethodJson() {
        if (this.swaggerJson) {
            const getJson = (options, path) => {
                const data = {}
                data.path = path
                data.method = this.getRequstMethod(options)
                data.methodName = options[data.method].operationId
                data.parameters = this.getParameters(options[data.method].parameters, path)
                data.summary = options[data.method].summary
                return data;
            }

            const { paths } = this.swaggerJson;
            const array = [];
            for (const key in paths) {
                array.push(getJson(paths[key], key))
            }
            return array
        }
    }

    getRequstMethod(options) {
        let method;
        for (const key in options) {
            method = key.toLowerCase()
        }
        return method;
    }

    getParameters(options, path) {
        const str = path.match(/{(\S*?)}/)
        const isParameters = str && str[1] ? true : false
        options.forEach(element => {
            element.isParameters = isParameters
        });
        return [options[options.length - 1]]
    }
}

module.exports = createApi