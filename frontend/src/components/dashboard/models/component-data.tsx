export interface ComponentData<T> {
  /*
   * Identificador del componente, debe ser único. Es el valor que se utiliza para identificar el componente en el tablero.
   */
  id: string;

  /*
   * Información que tendrá el componente.
   */
  data: T;
}
