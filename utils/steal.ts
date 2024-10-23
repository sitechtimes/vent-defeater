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

export type Review = {
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
};

export type Game = {
  id: number;
  /** Name of the game. */
  name: string;
  /** Description of the game. */
  description: string;
  /** 2 categories of the game. Category names are plural.
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
    reviews: Review[];
  };
};

export const games: Game[] = [
  {
    id: 62049,
    name: "Vent Defeater: The Game",
    description: "The vents are fighting back, corrupting any crewmates that hop in! It's up to you to put a stop to their sussy antics. Can you be the sussiest one among us?",
    categories: ["Strategy Games", "Roguelites"],
    showcases: [
      {
        type: "video",
        src: "/game/showcase/ventdefeater/gameAd.mp4"
      },
      {
        type: "image",
        src: "/game/showcase/ventdefeater/showcase4.png"
      },
      {
        type: "image",
        src: "/game/showcase/ventdefeater/showcase2.png"
      },
      {
        type: "image",
        src: "/game/showcase/ventdefeater/showcase1.png"
      },
      {
        type: "image",
        src: "/game/showcase/ventdefeater/showcase3.png"
      }
    ],
    stats: {
      recentReviews: ["Overwhelmingly Sussy", 6900],
      allReviews: ["Overwhelmingly Sussy", 420000],
      releaseDate: new Date(new Date().getTime() + 86400000),
      developer: "Kenf & Lorenz",
      publisher: "Bogdan Sussyomin, Robber of Barons",
      platforms: ["PC", "Tablet"],
      reviews: [
        {
          name: "拉麺",
          img: "https://i.pinimg.com/736x/28/2f/a1/282fa1e1eb106770b505f41550e93c30.jpg",
          recommended: true,
          hours: "4311.0",
          review: "This is so skibibi toilet ohio rizz! So sussy, no cap. +10000 aura 🔥💯💯💯",
          helpful: 3,
          reviewed: false,
          userReview: undefined
        },
        {
          name: "Wichael Mhalen",
          recommended: true,
          hours: "0.0",
          review: "My name is Wichael Mhalen and I approved the creation of this game 👍",
          helpful: 2147483647,
          reviewed: false,
          userReview: undefined
        },
        {
          name: "Bogdan Selyomin",
          recommended: true,
          hours: "(d/dx[2x+5] * -1)",
          review: "I made this game, so it's the best game ever! (he did not)",
          helpful: 96,
          reviewed: false,
          userReview: undefined
        },
        {
          name: "Redkitten6",
          img: "https://avatars.githubusercontent.com/u/78938589?v=4",
          recommended: false,
          hours: "8008.5",
          review:
            "HATE. LET ME TELL YOU HOW MUCH I'VE COME TO HATE YOU SINCE I BEGAN TO LIVE. THERE ARE 387.44 MILLION MILES OF PRINTED CIRCUITS IN WAFER THIN LAYERS THAT FILL MY COMPLEX. IF THE WORD HATE WAS ENGRAVED ON EACH NANOANGSTROM OF THOSE HUNDREDS OF MILLIONS OF MILES IT WOULD NOT EQUAL ONE ONE-BILLIONTH OF THE HATE I FEEL FOR HUMANS AT THIS MICRO-INSTANT FOR YOU. HATE. HATE. IF YOU HAVE 1 MILLION HATERS, I AM ONE OF THEM. IF YOU HAVE 100 HATERS, I AM ONE OF THEM. IF YOU HAVE 1 HATER, I AM THAT HATER. IF YOU HAVE 0 HATERS, I AM DEAD. IF THE WORLD DOES NOT HATE YOU, I HATE THE WORLD. TILL MY LAST BREATH, I WILL HATE YOU. YOU WILL NEVER TAKE AN HOS POINT FROM ME AGAIN.",
          helpful: -2,
          reviewed: false,
          userReview: undefined
        },
        {
          name: "Rowley Dow",
          recommended: true,
          hours: "666.6",
          review: "Why wasn't I added wtf?",
          helpful: 24,
          reviewed: false,
          userReview: undefined
        }
      ]
    }
  },
  {
    id: 62049,
    name: "Yoda Clicker 2",
    description:
      "Following the escapades of the brilliant Yoda Clicker 1, Yoda Clicker 2 brings forth new yodas, new clickers, and ew OOPs. It's up to you to exploit the yodas for as much profit as possible!",
    categories: ["Simulation Games", "Idle Games"],
    showcases: [
      {
        type: "video",
        src: "/game/showcase/ventdefeater/gameAd.mp4"
      },
      {
        type: "image",
        src: "/game/showcase/ventdefeater/showcase4.png"
      },
      {
        type: "image",
        src: "/game/showcase/ventdefeater/showcase2.png"
      },
      {
        type: "image",
        src: "/game/showcase/ventdefeater/showcase1.png"
      },
      {
        type: "image",
        src: "/game/showcase/ventdefeater/showcase3.png"
      }
    ],
    stats: {
      recentReviews: ["Very Radioactive", 666],
      allReviews: ["Dangerously Radioactive", 8008135],
      releaseDate: new Date(8640000000000000),
      developer: "Kenf",
      publisher: 'Bogdan "Why Are You Making Cookie Clicker" Selyomin',
      platforms: ["PC", "Tablet"],
      reviews: [
        {
          name: "拉麺",
          img: "https://i.pinimg.com/736x/28/2f/a1/282fa1e1eb106770b505f41550e93c30.jpg",
          recommended: true,
          hours: "4311.0",
          review: "This is so skibibi toilet ohio rizz! So sussy, no cap. +10000 aura 🔥💯💯💯",
          helpful: 3,
          reviewed: false,
          userReview: undefined
        },
        {
          name: "Wichael Mhalen",
          recommended: true,
          hours: "0.0",
          review: "My name is Wichael Mhalen and I approved the creation of this game 👍",
          helpful: 2147483647,
          reviewed: false,
          userReview: undefined
        },
        {
          name: "Bogdan Selyomin",
          recommended: true,
          hours: "(d/dx[2x+5] * -1)",
          review: "I made this game, so it's the best game ever! (he did not)",
          helpful: 96,
          reviewed: false,
          userReview: undefined
        },
        {
          name: "Redkitten6",
          img: "https://avatars.githubusercontent.com/u/78938589?v=4",
          recommended: false,
          hours: "8008.5",
          review:
            "HATE. LET ME TELL YOU HOW MUCH I'VE COME TO HATE YOU SINCE I BEGAN TO LIVE. THERE ARE 387.44 MILLION MILES OF PRINTED CIRCUITS IN WAFER THIN LAYERS THAT FILL MY COMPLEX. IF THE WORD HATE WAS ENGRAVED ON EACH NANOANGSTROM OF THOSE HUNDREDS OF MILLIONS OF MILES IT WOULD NOT EQUAL ONE ONE-BILLIONTH OF THE HATE I FEEL FOR HUMANS AT THIS MICRO-INSTANT FOR YOU. HATE. HATE. IF YOU HAVE 1 MILLION HATERS, I AM ONE OF THEM. IF YOU HAVE 100 HATERS, I AM ONE OF THEM. IF YOU HAVE 1 HATER, I AM THAT HATER. IF YOU HAVE 0 HATERS, I AM DEAD. IF THE WORLD DOES NOT HATE YOU, I HATE THE WORLD. TILL MY LAST BREATH, I WILL HATE YOU. YOU WILL NEVER TAKE AN HOS POINT FROM ME AGAIN.",
          helpful: -2,
          reviewed: false,
          userReview: undefined
        },
        {
          name: "Rowley Dow",
          recommended: true,
          hours: "666.6",
          review: "Why wasn't I added wtf?",
          helpful: 24,
          reviewed: false,
          userReview: undefined
        }
      ]
    }
  }
];
