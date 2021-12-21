export interface BeforeSetEvent<T> {
  value: T;
  newValue: T;
}

export interface AfterSetEvent<T> {
  value: T;
}
