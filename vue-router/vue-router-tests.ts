import Vue = require('vue');
import VueRouter = require('vue-router');
Vue.use(VueRouter);

namespace TestBasic {
	"use strict";
	
	var Foo = Vue.extend({
		template: '<p>This is foo!</p>',
		route: {
			canActivate(transition: VueRouter.Transition<any, any, any, any, any>) {
				return true;
			}
		}
	});
	
	var Bar = Vue.extend({
		template: '<p>This is bar!</p>'
	});
	
	var App = Vue.extend({});
	
	var router = new VueRouter<typeof App.prototype>();
	
	router.map({
		'/foo': {
			component: Foo
		},
		'/bar': {
			component: Bar
		}
	});
	
	router.start(App, '#app');
}

namespace TestAdvanced {
	"use strict";
	
	namespace App {
	
		export class App {
			authenticating: boolean;
			
			data() {
				return {
					authenticating: false
				}
			}
		}
	}
	
	namespace Inbox {
		export class Index {
			static route: VueRouter.TransitionHook<App.App, any, any, {id: number}, any> = {
				canActivate: function(transition) {
					var n: number = transition.to.params.id;
					transition.next();
				},
				activate: function() {
					return new Promise((resolve) => {
						resolve();
					})
				},
				deactivate: function({next}) {
					next();
				}
			}
		}
	}
	
	namespace RouteConfig {
		export function configRouter(router: VueRouter.Router<App.App>) {
			router.map({
				'/about': {
					component: {},
					auth: false
				},
				'*': {
					component: {}
				}
			});
			
			router.redirect({
				'/info': '/about',
				'/hello/:userId': '/user/:userId'
			});
			
			router.beforeEach((transition) => {
				if (transition.to.path === '/forbidden') {
					router.app.authenticating = true;
					setTimeout(() => {
						router.app.authenticating = false;
						alert('');
						transition.abort();
					}, 3000)
				} else {
					transition.next();
				}
			})
		}
	}
	
	import configRouter = RouteConfig.configRouter;
	
	const router = new VueRouter<App.App>({
		history: true,
		saveScrollPosition: true
	});
	
	configRouter(router);
	router.start(App, '#app');
}