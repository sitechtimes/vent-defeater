export type Presentation = {
  /** ID of the presentation. */
  id: string;
  /** Name of the presentation. */
  name: string;
  /** Type of the presentation.
   *
   * Shown in the search bar.
   */
  type: 'Quiz' | 'Survey' | 'Poll';
  /** Time since epoch, in seconds.
   * @see https://www.epochconverter.com/
   */
  lastOpened: number;
};
