import { ActivatedRouteSnapshot, DetachedRouteHandle, BaseRouteReuseStrategy } from '@angular/router';

export class AppRouteReuseStrategy extends BaseRouteReuseStrategy {

    public override shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        let shouldreuse = (future.routeConfig === curr.routeConfig) && !future.data['reloadComponent'];
        return shouldreuse;
    }
}