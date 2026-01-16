import { createReducer, on } from '@ngrx/store';
import { AuthActions } from './auth.actions';

export interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  registerSuccess: string | null;
}

export const initialAuthState: AuthState = {
  isAuthenticated: false,
  loading: false,
  error: null,
  registerSuccess: null,
};

export const authReducer = createReducer(
  initialAuthState,

  on(AuthActions.login, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AuthActions.loginSuccess, (state) => ({
    ...state,
    isAuthenticated: true,
    loading: false,
    error: null,
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(AuthActions.register, (state) => ({
    ...state,
    loading: true,
    error: null,
    registerSuccess: null,
  })),
  on(AuthActions.registerSuccess, (state, { message }) => ({
    ...state,
    loading: false,
    registerSuccess: message,
  })),
  on(AuthActions.registerFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(AuthActions.logout, () => initialAuthState),

  on(AuthActions.clearError, (state) => ({
    ...state,
    error: null,
    registerSuccess: null,
  })),
);
