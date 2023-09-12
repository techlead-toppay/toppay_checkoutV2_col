import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Menu, MenuOption, User } from '../interfaces';
import { ApiService } from './api.service';
import { PreferencesService } from './preferences.service';

@Injectable({
	providedIn: 'root'
})
export class UserService {

	private keyStorageUser: string;

	public user: User;
	public loggedIn: boolean;
	public menuServices: Array<MenuOption>;
	public fcmToken: string = '';
	public userSubject = new Subject<User>();
	public loggedInSubject = new Subject<boolean>();
	public menuServicesSubject = new Subject<Array<MenuOption>>();
	public fcmTokenSubject = new Subject<string>();

	constructor(private preferences: PreferencesService, private api: ApiService) {

		this.keyStorageUser = environment.user_storage_key;
		this.refreshUser();

		this.fcmTokenSubject.subscribe(fcm => this.fcmToken = fcm);

	}

	async saveUser(userdata: User): Promise<void> {

		this.user = userdata;
		const infouser = JSON.stringify(userdata);
		this.preferences.set(this.keyStorageUser, infouser);

	}
	async getUser(): Promise<User> {
		const userString = await this.preferences.get(this.keyStorageUser);
		const user = JSON.parse(userString) as User;
		return user;
	}
	async removeUser(): Promise<void> {

		this.preferences.remove(this.keyStorageUser);
		this.refreshUser();

	}
	async refreshUser(): Promise<void> {
		const infouser = await this.preferences.get(this.keyStorageUser);

		this.user = JSON.parse(infouser);

		this.userSubject.next(this.user);

		this.loggedIn = (this.user == null) ? false : true;
		this.loggedInSubject.next(this.loggedIn);

	}
	async updateItemUser(items: object): Promise<void> {

		const userData = { ...this.user, ...items };
		this.saveUser(userData);
		this.refreshUser();

	}


	/**
	 * Conseguir el saldo del usuario
	 */
	async getBalance() {
		this.api.request('apitop/versaldo', { id: this.user?.userid }).subscribe((res: any) => {

			if (res) {
				if (res[0].saldo) {
					let newInfoUser = { ...this.user };
					newInfoUser.balance = res[0].saldo;

					this.userSubject.next(newInfoUser);
					this.saveUser(newInfoUser);
				}
			}

		}, ({error}: any) => {
			console.log('Error al conseguir el saldo', error)
		});
	}
	/**
	 * Conseguir el menú de los servicios
	 */
	async getMenuServices(menu: Menu, callback: Function) {
		this.api.request('apitop/vermenu', { menu }).subscribe((res: any) => {

			if (res) {
				const menuItems: Array<MenuOption> = res.map((item: any): MenuOption => {
					const { m_titulo, m_img, m_link, m_msg, m_estado } = item;
					return {
						title: m_titulo,
						image: m_img,
						action: m_link,
						message: m_msg,
						state: m_estado,
					}
				});

				callback(menuItems);
			}

		}, (e: any) => console.log('Error al conseguir el menú', e));
	}
}
