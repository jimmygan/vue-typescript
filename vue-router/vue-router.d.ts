// Type definitions for vue-router 0.7.7
// Project: https://github.com/vuejs/vue-router
// Definitions by: kaorun343 <https://github.com/kaorun343>

declare namespace VueRouter {

	interface Transition<RootVueApp, FromParams, FromQuery, ToParams, ToQuery> {
		from: $route<RootVueApp, FromParams, FromQuery>;
		to: $route<RootVueApp, ToParams, ToQuery>;
		next(data?: any): void;
		abort(reason?: any): void;
		redirect(path: string): void;
	}
	
	interface RouterOption {
		hashbang?: boolean;
		history?: boolean;
		abstract?: boolean;
		root?: string;
		linkActiveClass?: string;
		saveScrollPosition?: boolean;
		transitionOnLoad?: boolean;
		suppressTransitionError?: boolean;
	}
	
	interface RouterStatic {
		new<RootVueApp>(option?: RouterOption): Router<RootVueApp>;
	}
	
	interface RouteMapObject {
		[path: string]: {
			component: any,
			subRoutes?: RouteMapObject,
			[key: string]: any
		}
	}

	interface Router<RootVueApp> {

		app: RootVueApp;
		mode: string;

		start(App: any, el: string | Element): void;
		stop(): void;
		map(routeMap: RouteMapObject): void;
		on(path: string, config: Object): void;
		go(path: string | Object): void;
		replace(path: string): void;
		redirect(redirectMap: Object): void;
		alias(aliasMap: Object): void;
		beforeEach<FP, FQ, TP, TQ>(hook: (transition: Transition<RootVueApp, FP, FQ, TP, TQ>) => any): void;
		afterEach<FP, FQ, TP, TQ>(hook: (transition: Transition<RootVueApp, FP, FQ, TP, TQ>) => any): void;
	}
	
	interface $route<RootVueApp, Params, Query> {
		path: string;
		params: Params;
		query: Query;
		router: Router<RootVueApp>;
		matched: string[];
		name: string;
		[key: string]: any;
	}
	
	interface TransitionHook<Root, FP, FQ, TP, TQ> {
		data?(transition?: Transition<Root, FP, FQ, TP, TQ>): Thenable<any> | void;
		activate?(transition?: Transition<Root, FP, FQ, TP, TQ>): Thenable<any> | void;
		deactivate?(transition?: Transition<Root, FP, FQ, TP, TQ>): Thenable<any> | void;
		canActivate?(transition?: Transition<Root, FP, FQ, TP, TQ>): Thenable<any> | boolean | void;
		canDeactivate?(transition?: Transition<Root, FP, FQ, TP, TQ>): Thenable<any> | boolean | void;
		canReuse?: boolean | ((transition: Transition<Root, FP, FQ, TP, TQ>) => boolean);
	}
}

declare namespace vuejs {
	interface ComponentOption {
		route?: VueRouter.TransitionHook<any, any, any, any, any>;
	}
}

declare module "vue-router" {
	var Constructor: VueRouter.RouterStatic;
	export = Constructor;
}
