export type Template = 'Multiple Choice' | 'Word Cloud' | 'Open Ended' | 'Scales' | 'Ranking' | 'Q&A' | 'Guess the Number' | '100 Points' | '2x2 Grid' | 'Pin on Image';
export type Element = TextField | WordCloud;

export type Position = {
  /** X-coordinate of the element's top edge, in pixels. */
  x: number;
  /** Y-coordinate of the element's left edge, in pixels. */
  y: number;
};

export type Dimensions = {
  /** Width of the element, in pixels. */
  width: number;
  /** Height of the element, in pixels. */
  height: number;
};

export type Background = {
  /** Hex-code of the background color. */
  color: string;
  /** URL of image from backend. */
  image: string | null;
};

export type Text = {
  /** Font style of the text. */
  font: string;
  /** Hex-code of the text color. */
  color: string;
  /** Text size. */
  size: number;
  /** Text styles. */
  styles: TextStyles;
};

export type TextStyles = {
  bold: boolean;
  italics: boolean;
  underline: boolean;
  strikethrough: boolean;
  link?: string;
  items: 'left' | 'center' | 'right';
  justify: 'left' | 'center' | 'right';
  align: 'left' | 'center' | 'right';
  wrap: boolean;
};

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
  /** Array of slides, each representing 1 slide of the presentation. */
  slides: Slide[];
};

export type Slide = {
  /** ID of the slide. */
  id: string;
  /** Array of elements, each representing 1 element. */
  elements: Element[];
  /** Speaker notes. */
  speakerNotes: string;
  /** Dimensions of the slide, in pixels. */
  dimensions: Dimensions;
  /** Information about the background of the slide. */
  background: Background;
  /** Default text styles for the slide. */
  text: Text;
  /** Other settings of the slide. */
  settings: {
    /** Whether or not to show the join code on the slide. */
    showCode: boolean;
    /** Type of template. */
    template: Template;
  };
};

export type TextField = {
  /** ID of the element. */
  id: string;
  /** (X, Y) coordinate of the element's top-left vertex, in pixels. */
  position: Position;
  /** Dimensions of the element, in pixels. */
  dimensions: Dimensions;
  /** Text styles for the element. */
  text: Text;
};

export type WordCloud = {
  /** ID of the element. */
  id: string;
  /** (X, Y) coordinate of the element's top-left vertex, in pixels. */
  position: Position;
  /** Dimensions of the element, in pixels. */
  dimensions: Dimensions;
  /** Text styles for the element. */
  text: Text;
  /** 2D array of words in the word cloud.
   *
   * Each inner array should be `[word, size]`.
   *
   * @example [["hello", 10], ["world", 5]]
   */
  words: (string | number)[][];
};
