import axios from 'axios';
class Api {
    constructor() {
        this.instance = '';
        this.initAxios();
    }

    /**
     * 初始化axions
     */
    initAxios() {
        this.instance = axios.create({
            baseURL:'',
            timeout: 6000,
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        });

        // 请求头拦截器
        this.instance.interceptors.request.use(
            function(config) {
                // post数据序列化  针对post需要
                return config;
            },
            function(error) {
                // Do something with request error
                return Promise.reject(error);
            }
        );

        // 响应头 拦截器
        this.instance.interceptors.response.use(
            function(response) {
                // Do something with response data
              
                return response;
            },
            function(error) {
                // Do something with response error
                return Promise.reject(error);
            }
        );
    }

    /**
     * post请求
     * @params {url} Object 请求路径
     * @params {params} Object 请求参数
     * @params {config} Object axios附加配置
     */
    post(url, params, config = {}) {
        return new Promise((resolve, reject) => {
            this.instance
                .post(url, params, config)
                .then(res => {
                    let {
                        data: { code, msg, data }
                    } = res;

                    if (code === 200) {
                        resolve(data);
                    } else {
                        if (code === 401) {
                            // location.href = '/';
                        }
                        reject(msg);
                    }
                })
                .catch(err => {
                    reject(err);
                });
        });
    }
    /**
     * get请求
     * @params {url} Object 请求路径
     * @params {params} Object 请求参数
     * @params {config} Object axios附加配置
     */
    get(url, params, config = {}) {
        return new Promise((resolve, reject) => {
            this.instance
                .get(url, params, config)
                .then(res => {
                    let returnCode = (res.data.status !== undefined && res.data.status.code !== undefined) ? res.data.status.code : res.data.code;
                    res.data.data.systemDate = res.data.systemDate;
                    console.log(typeof returnCode);
                    if (+returnCode === 0 || +returnCode === 1) {
                        // 更新本地时间
                        resolve(res.data.data);
                    }
                })
                .catch(err => {
                    reject(err);
                });
        });
    }
}

export default new Api();
