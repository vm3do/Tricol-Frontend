import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { AuthResponse, LoginRequest, RegisterRequest } from '../../core/models/user.model';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'Login': props<{ credentials: LoginRequest }>(),
    'Login Success': props<{ response: AuthResponse }>(),
    'Login Failure': props<{ error: string }>(),

    'Register': props<{ data: RegisterRequest }>(),
    'Register Success': props<{ message: string }>(),
    'Register Failure': props<{ error: string }>(),

    'Logout': emptyProps(),
    'Clear Error': emptyProps(),
  },
});
