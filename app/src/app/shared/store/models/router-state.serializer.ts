import { RouterStateSnapshot } from '@angular/router';
import { RouterStateSerializer } from '@ngrx/router-store';
import { RouterState } from './router-state.model';

export class RouterStateSerialize
  implements RouterStateSerializer<RouterState>
{
  serialize(routerState: RouterStateSnapshot): RouterState {
    const { url } = routerState;
    const { queryParams } = routerState.root;

    let lastChild = routerState.root;
    while (lastChild.firstChild) {
      lastChild = lastChild.firstChild;
    }
    const { params } = lastChild;

    return {
      url,
      params,
      queryParams,
    };
  }
}
