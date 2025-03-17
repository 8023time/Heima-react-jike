// 封装token的一些方法
const token_name = 'token'

const use_token = {
    set_token:(token) => {
        localStorage.setItem(token_name, token)
    },
    get_token:() => {
        return localStorage.getItem(token_name)
    },
    remove_token:() => {
        localStorage.removeItem(token_name)
    }
}

export {
    use_token
}