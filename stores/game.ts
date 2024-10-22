type ImageShowcase = {
  /** @readonly */
  type: "image";
  /** Source of image from /public */
  src: string;
};

type VideoShowcase = {
  /** @readonly */
  type: "video";
  /** Source of video from /public */
  src: string;
};

export type Game = {
  /** Name of the game. */
  name: string;
  /** Description of the game. */
  description: string;
  /** 2 categories of the game.
   * @example ["Strategy Games", "Roguelites"]
   */
  categories: [string, string];
  /** 5-length array of showcases, 1 video and 4 images. */
  showcases: [VideoShowcase, ImageShowcase, ImageShowcase, ImageShowcase, ImageShowcase];
  /** Game stats. */
  stats: {
    /** (name, number of reviews) of the recent reviews.
     * @example ["Overwhelmingly Sussy", 6900]
     */
    recentReviews: [string, number];
    /** (name, number of reviews) of the total reviews.
     * @example ["Overwhelmingly Sussy", 420000]
     */
    allReviews: [string, number];
    releaseDate: Date;
    developer: string;
    publisher: string;
    platforms: ("PC" | "Tablet" | "Mobile")[];
    /** Reviews of the game. */
    reviews: {
      /** Name of reviewer. */
      name: string;
      /** Profile image of reviewer. */
      img?: string;
      /** Whether or not the review is recommended. */
      recommended: boolean;
      /** Hours played of reviewer. */
      hours: string;
      /** Text of the review. */
      review: string;
      /** Whether or not the review was rated helpful by the user. */
      helpful: number;
      /** Whether or not the user has reviewed this review. */
      reviewed: boolean;
      /** Review of the user. */
      userReview: "yes" | "no" | undefined;
    }[];
  };
};

export const useGameStore = defineStore("gameStore", () => {
  const currentGame = ref<Game>({});
  const smallScreen = ref(false);

  const energy = ref(100);
  const currentElement = ref<GameElement>();
  const elementGrid = ref<number[][]>([]);
  const levels = ref<Level[]>([]);
  const isDead = ref(false);

  const relicOfDeath = ref(false);
  const showBrainrot = ref(false);
  const noCombust = ref(false);
  const heartAttack = ref(false);

  return { smallScreen, energy, currentElement, elementGrid, levels, isDead, relicOfDeath, showBrainrot, noCombust, heartAttack };
});
