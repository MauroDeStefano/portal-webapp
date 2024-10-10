export function loginFields(data: any) {
    return {
        mail: data.email,
        password: data.password,
        remember_me: (!!data?.remember_me).toString(),
        locale: data.locale
    }
}
