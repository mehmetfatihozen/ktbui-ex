export default function authHeader() {
    let token = localStorage.getItem('token');

    if (token) {
        return { Token: token };
    } else {
        return {};
    }
}