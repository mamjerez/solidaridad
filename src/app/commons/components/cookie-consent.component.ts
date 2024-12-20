import { AfterViewInit, Component } from '@angular/core';
import { run } from 'vanilla-cookieconsent';

@Component({
	selector: 'app-cookie-consent',
	template: '',
	standalone: true
})
export class CookieConsentComponent implements AfterViewInit {
	ngAfterViewInit(): void {
		run({
			// autoClearCookies: true,
			// autoShow: true,
			// disablePageInteraction: false,
			// hideFromBots: true,
			manageScriptTags: false,
			// revision: 0,
			// root: null,
			// mode: 'opt-in',

			guiOptions: {
				consentModal: {
					layout: 'box wide',
					position: 'bottom center',
					equalWeightButtons: true,
					flipButtons: false
				},
				preferencesModal: {
					layout: 'box',
					equalWeightButtons: true,
					flipButtons: false
				}
			},

			onFirstConsent: ({ cookie }) => {
				console.log('onFirstConsent fired');
			},

			onConsent: ({ cookie }) => {
				// console.log('onConsent fired');
			},

			onChange: ({ cookie, changedCategories, changedServices }) => {
				console.log('onChange fired', changedCategories, changedServices);
			},

			onModalShow: ({ modalName }) => {
				console.log(modalName, 'visible');
			},

			onModalHide: ({ modalName }) => {
				console.log(modalName, 'hidden');
			},

			categories: {
				necessary: {
					enabled: true,
					readOnly: true
				},
				analytics: {
					enabled: false,
					readOnly: false,
					autoClear: {
						cookies: [{ name: /^(_ga|_gid)/ }]
					},
					services: {
						ga4: {
							label: 'Google Analytics 4',
							onAccept: () => {
								console.log('enabled ga4');
							},
							onReject: () => {
								console.log('disabled ga4');
							}
						},
						another: {
							label: 'Generic Service',
							onAccept: () => {
								console.log('enabled generic service');
							},
							onReject: () => {
								console.log('disabled generic service');
							}
						}
					}
				},
				ads: {
					enabled: false,
					readOnly: false
				}
			},

			language: {
				default: 'en',
				// autoDetect: "browser"
				translations: {
					en: {
						consentModal: {
							title: '¡Si tambien podemos usar cookies!',
							description:
								'Lo sentimos, pero nos obligan a mostrar este aviso. Podemos utilizar cookies para proporcionar una experiencia personalizada. Puedes aceptar todas las cookies haciendo clic en el botón "Aceptar todo" o rechazar todas las cookies haciendo clic en el botón "Rechazar todo".',
							acceptAllBtn: 'Aceptar todo',
							acceptNecessaryBtn: 'Rechazar todo',
							showPreferencesBtn: 'Gestionar preferencias individuales',
							footer: `
            
                <a href="#privacy">Política de privacidad</a>
              `
						},
						preferencesModal: {
							title: 'CookieConsent Center',
							acceptAllBtn: 'Accept all',
							acceptNecessaryBtn: 'Reject all',
							savePreferencesBtn: 'Accept current selection',
							closeIconLabel: 'Close modal',
							serviceCounterLabel: 'Service|Services',
							sections: [
								{
									title: 'Cookie Usage',
									description:
										'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod '
								},
								{
									title: 'Strictly Necessary Cookies <span class="pm__badge">always enabled</span>',
									description: 'Category description',
									linkedCategory: 'necessary'
								},
								{
									title: 'Performance & Analytics Cookies',
									description: 'Category description',
									linkedCategory: 'analytics'
								},
								{
									title: 'Advertisement Cookies',
									description: 'Category description',
									linkedCategory: 'ads'
								},
								{
									title: 'Last section',
									description:
										'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequa'
								}
							]
						}
					}
				}
			}
		});
	}
}
