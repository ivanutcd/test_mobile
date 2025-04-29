import { ResponseValues } from 'axios-hooks';

export interface ExtendsResponseValues<TResponse, TBody, TError>
  extends ResponseValues<TResponse, TBody, TError> {
  firstLoading: boolean;
}
