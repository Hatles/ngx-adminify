
import {Provider} from "@angular/core";
import {
    ADMINIFY_PROVIDER,
    ADMINIFY_PROVIDER_ARRAY,
    AdminifyOutletRouteProvider,
    AdminifyOutletRouteProviders
} from "../adminify-outlet-route-provider";

export function provideAdminifyProvider(provider: AdminifyOutletRouteProvider): Provider {
    return {provide: ADMINIFY_PROVIDER, multi: true, useValue: provider};
}

export function provideAdminifyProviders(providers: AdminifyOutletRouteProviders): Provider {
    return {provide: ADMINIFY_PROVIDER_ARRAY, multi: true, useValue: providers};
}
