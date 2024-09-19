export type Template = 'Multiple Choice' | 'Word Cloud' | 'Open Ended' | 'Scales' | 'Ranking' | 'Q&A' | 'Guess the Number' | '100 Points' | '2x2 Grid' | 'Pin on Image';
export type Element = TextField | WordCloud;

/** Settings for element position. */
export type Size = {
  /** Y-coordinate of the element's top edge, in pixels. */
  top: number;
  /** X-coordinate of the element's left edge, in pixels. */
  left: number;
  /** Y-coordinate of the element's bottom edge, in pixels. */
  bottom: number;
  /** X-coordinate of the element's right edge, in pixels. */
  right: number;
};

export type Dimensions = {
  /** Width of the element, in pixels. */
  width: number;
  /** Height of the element, in pixels. */
  height: number;
}

/** Settings for backgrounds. */
export type Background = {
  /** Hex-code of the background color. */
  color: string;
  /** URL of image from backend. */
  image: string | null;
};

/** Settings for text. */
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

/** Settings for text styles. */
export type TextStyles = {
  bold: boolean;
  italics: boolean;
  underline: boolean;
  strikethrough: boolean;
  /** Hyperlink. */
  link?: string;
  /** Text alignment. */
  align: 'left' | 'center' | 'right';
  wrap: boolean;
};

/** Presentation data. */
export type Presentation = {
  /** ID of the presentation. */
  id: string;
  /** Name of the presentation. */
  name: string;
  /** Type of the presentation.
   *
   * Shown in the search bar.
   */
  type: 'Presentation' | 'Quiz' | 'Survey' | 'Poll';
  /** Time since epoch, in seconds.
   * @see https://www.epochconverter.com/
   */
  lastOpened: number;
  /** Array of slides, each representing 1 slide of the presentation. */
  slides: Slide[];
};

/** Slide data. */
export type Slide = {
  /** ID of the slide. */
  id: string;
  /** @readonly */
  type: 'Slide';
  /** Array of elements, each representing 1 element. */
  elements: Element[];
  /** Speaker notes. */
  speakerNotes: string | null;
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
    template: Template | null;
  };
  /** Whether or not the element is currently selected by the user.
   *
   * Should only be present in edit view.
   */
  selected?: boolean;
};

/** Element data for Text Fields. */
export type TextField = {
  /** ID of the element. */
  id: string;
  /** @readonly */
  type: 'Text Field';
  /** (X,Y) coordinates of the element's corners, in pixels. */
  position: Size;
  /** Information about the element's background. */
  background: Background;
  /** Text styles for the element. */
  text: Text;
  /** Content of the text field. */
  content: string;
  /** Flex properties of the element. */
  flex: {
    /** Flex property for align-items. */
    items: 'left' | 'center' | 'right';
    /** Flex property for justify-content. */
    justify: 'left' | 'center' | 'right';
    /** Flex property for align-content. */
    align: 'left' | 'center' | 'right';
    /** Flex property for flex-wrap. */
    wrap: boolean;
  };
  /** Z-Index of the element. */
  zIndex: number;
  /** Whether or not the element is currently selected by the user.
   *
   * Should only be present in edit view.
   */
  selected?: boolean;
};

/** Element data for Word Clouds. */
export type WordCloud = {
  /** ID of the element. */
  id: string;
  /** @readonly */
  type: 'Word Cloud';
  /** (X,Y) coordinates of the element's corners, in pixels. */
  position: Size;
  /** Information about the element's background. */
  background: Background;
  /** Text styles for the element. */
  text: Text;
  /** 2D array of words in the word cloud.
   *
   * Each inner array should be `[word, size]`.
   *
   * @example [["hello", 10], ["world", 5]]
   */
  words: (string | number)[][];
  /** Flex properties of the element. */
  flex: {
    /** Flex property for align-items. */
    items: 'left' | 'center' | 'right';
    /** Flex property for justify-content. */
    justify: 'left' | 'center' | 'right';
    /** Flex property for align-content. */
    align: 'left' | 'center' | 'right';
    /** Flex property for flex-wrap. */
    wrap: boolean;
  };
  /** Z-Index of the element. */
  zIndex: number;
  /** Whether or not the element is currently selected by the user.
   *
   * Should only be present in edit view.
   */
  selected?: boolean;
};
