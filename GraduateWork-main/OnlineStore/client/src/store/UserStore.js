import {makeAutoObservable} from "mobx" // слежка за переменными, которые будут переданы в параметр функции

export default class userStore {

    constructor() {

        this._isAuth = false
        this._user = {}
        makeAutoObservable(this)

    }

    setIsAuth(bool) {
        this._isAuth = bool
    }

    setUser(user) {
        this._user = user
    }

    get isAuth() { // гетеры для оптимизации переменных, которые были изменены
        return this._isAuth
    }

    get user() { // гетеры для оптимизации переменных, которые были изменены
        return this._user
    }

}