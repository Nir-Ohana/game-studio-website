export const shots = '/images/games/shelly-jigsaw/screens';
export const screens = [
  { src: `${shots}/home.webp`, title: 'A gentle beginning', text: 'Meet Shelly and start with a 12-piece puzzle.', alt: 'Shelly welcomes a new player above a turtle reef picture and a Start button' },
  { src: `${shots}/adventure.webp`, title: 'Adventure', text: '192 puzzles, 32 chapters, one lovely journey.', alt: 'Sunlit Shallows, chapter 1 of 32, with six puzzles along a winding trail' },
  { src: `${shots}/daily.webp`, title: 'Your daily puzzle', text: 'Choose 12 to 432 pieces. Earlier puzzles wait for you, too.', alt: 'Daily Yarn Shop puzzle with six piece counts and an Earlier puzzles button' },
  { src: `${shots}/complete.webp`, title: 'Enjoy the picture', text: 'A moment to admire what you have made.', alt: 'Puzzle complete screen showing the finished Coral Turtle Reef picture and three stars' },
];

export const rocketShots = '/images/games/rocket-rabbit/screens';
export const rocketScreens = [
  { src: `${rocketShots}/home.webp`, title: 'Meet Rocket', text: 'One rabbit. One jetpack. A runaway carrot.', alt: 'Rocket Rabbit pixel art menu with Play, Friends, Shop and Settings buttons' },
  { src: `${rocketShots}/climb.webp`, title: 'Up, up and away', text: 'Bounce on islands, collect fuel and keep climbing.', alt: 'Rocket wearing a blue cap, bouncing among meadow platforms, coins and fuel cans' },
  { src: `${rocketShots}/friends.webp`, title: 'Bring a friend', text: 'Unlock Pip, Rusty and Pebble through play.', alt: 'Friends screen showing Rocket the rabbit, Pip the frog, Rusty the fox and Pebble the penguin' },
  { src: `${rocketShots}/shop.webp`, title: 'Make it yours', text: 'Spend collected coins on a whole new look.', alt: 'Rocket previews a wizard hat in the shop, with tabs for fur, hats, faces, jetpacks and trails' },
];

// Icon paths (24px, stroke) shared by the feature cards.
export const features = [
  {
    title: 'Easy to read',
    text: 'Large, clear text and big buttons. Choose Extra large text or Reduce motion to make yourself comfortable.',
    icon: '<path d="M4 7V5h12v2M10 5v14M7 19h6M14 12v-1h6v1M17 11v8M15.5 19h3"/>',
  },
  {
    title: 'No rush, no pressure',
    text: 'There is no countdown. Take two minutes or two days. Your puzzle waits exactly where you left it.',
    icon: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  },
  {
    title: 'Room for every piece',
    text: 'Pinch to zoom, sort edge and middle pieces, and let each piece snap gently into place. Optional zoom buttons help, too.',
    icon: '<path d="M9 3h4a2 2 0 1 1 4 0h2v6a2 2 0 1 0 0 4v6h-6a2 2 0 1 0-4 0H3v-6a2 2 0 1 1 0-4V3z"/>',
  },
  {
    title: 'A journey with Shelly',
    text: 'Explore 192 puzzles across 32 chapters. Finish each chapter to collect a Field Note with a little fact from Shelly.',
    icon: '<rect x="3" y="4" width="18" height="16" rx="3"/><circle cx="9" cy="10" r="2"/><path d="m21 16-5-5-9 9"/>',
  },
  {
    title: 'A gentle hint',
    text: 'Every puzzle starts with one free hint. Get another for 15 earned shells or choose to watch a short ad. You always see the cost first.',
    icon: '<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.6.6 1 1.4 1 2.5h6c0-1.1.4-1.9 1-2.5A6 6 0 0 0 12 3z"/>',
  },
  {
    title: 'A collection of your own',
    text: 'Finished pictures live in My puzzles, ready to play again. Puzzles work offline, and your progress stays on your phone.',
    icon: '<path d="M20 12v9H4v-9M2 7h20v5H2zM12 21V7M12 7H8a2.5 2.5 0 1 1 0-5c3 0 4 5 4 5zM12 7h4a2.5 2.5 0 1 0 0-5c-3 0-4 5-4 5z"/>',
  },
];

export const rocketFeatures = [
  { title: 'Bounce, then boost', text: 'Tilt to steer and hold the screen to fire your jetpack. Springs send you higher, and a bubble catches your first fall each run.' },
  { title: 'A world that keeps going', text: 'Climb from Meadow to Treetops, Clouds and Space, then discover Candy Clouds, Cheese Moon and more. The higher you go, the trickier it gets.' },
  { title: 'Friends and fresh looks', text: 'Complete challenges to play as Pip the frog, Rusty the fox or Pebble the penguin. Collected coins unlock hats, face accessories, furs, jetpacks and trails.' },
];

export interface Game {
  slug: string;
  path: string;
  demo: { src: string; intro: string; size: string };
  name: string;
  title: string;
  description: string;
  genre: string;
  tagline: string;
  introduction: string;
  detailHeading: string;
  details: string[];
  icon: string;
  hero: string;
  heroAlt: string;
  screens: typeof screens;
  features: { title: string; text: string; icon?: string }[];
  questions: { question: string; answer: string }[];
}

export const games: Game[] = [
  {
    slug: 'shelly-jigsaw',
    path: '/shelly-jigsaw/',
    demo: { src: '/play/index.html', intro: 'Solve one puzzle right here. Drag the pieces onto the board.', size: '25 MB' },
    name: 'Shelly Jigsaw',
    title: 'Shelly Jigsaw: Calm Android Puzzles',
    description: 'Discover Shelly Jigsaw, a relaxing Android puzzle game in development. Explore 192 Adventure puzzles, daily jigsaws and gentle hints with Shelly the turtle.',
    genre: 'Jigsaw puzzle',
    tagline: 'Relaxing jigsaw puzzles, one lovely picture at a time.',
    introduction: 'Join Shelly the sea turtle for calm jigsaw puzzles with big pieces, clear text and no countdown. Made for adults over 50 and anyone who enjoys a quiet moment.',
    detailHeading: 'A puzzle for the way you like to play',
    details: [
      'Start small with a 12-piece puzzle, or settle into a bigger Daily jigsaw with up to 432 pieces. Choose from six Daily sizes: 12, 48, 108, 192, 300 and 432. Missed a day? Earlier puzzles wait for you, so there is no need to keep a streak.',
      'Adventure takes you through 32 chapters and 192 puzzles, from sunny reefs to cozy storybook scenes. Each finished chapter brings a Field Note from Shelly. Your completed pictures stay together in My puzzles, where you can return to a favorite and play again.',
    ],
    icon: '/images/games/shelly-jigsaw/app-icon.png',
    hero: `${shots}/home.webp`,
    heroAlt: screens[0].alt,
    screens,
    features,
    questions: [
      { question: 'Can I download Shelly Jigsaw yet?', answer: 'Shelly Jigsaw is in development for Android. A public download link and release date have not been announced on this site.' },
      { question: 'Can I play the puzzles offline?', answer: 'Yes. The puzzle pictures are bundled with the game, and progress stays on your phone. You do not need an account to play. Ads and optional rewarded videos need an internet connection.' },
      { question: 'What makes the game comfortable for older players?', answer: 'Large controls, clear text, gentle snapping and an Extra large text setting help make play comfortable. You can pinch to zoom or turn on zoom buttons, sort edge and middle pieces, and reduce motion in Settings. There is no countdown to beat.' },
      { question: 'How do hints and ads work?', answer: 'Each puzzle starts with one free hint. Additional hints cost 15 shells earned through play, or you can choose a short rewarded ad. The game also has a banner below the puzzle and occasional full-screen ads between puzzles. Paid hints show their cost and ask for confirmation first.' },
    ],
  },
  {
    slug: 'rocket-rabbit',
    path: '/rocket-rabbit/',
    demo: { src: '/rocket-rabbit-play/index.html', intro: 'Climb as high as you can. Arrow keys to steer, hold Space to blast off.', size: '12 MB' },
    name: 'Rocket Rabbit',
    title: 'Rocket Rabbit: Pixel-Art Climbing Game',
    description: 'Meet Rocket Rabbit, an Android endless climber in development. Bounce, boost a jetpack, collect coins and unlock animal friends in a bright pixel-art world.',
    genre: 'Endless platformer',
    tagline: 'A little rabbit. A big sky. One more jump.',
    introduction: 'Chase a golden carrot that floated away on a balloon. Rocket bounces from island to island, fuels a jetpack and climbs into a colorful pixel-art sky in this cheerful game for younger players.',
    detailHeading: 'From the meadow to the stars',
    details: [
      'Every bounce sends Rocket higher. Moving clouds, crumbling platforms and springs keep the climb lively, while fuel cans give your jetpack another burst. A bubble catches your first fall each run, giving you a chance to get back into the climb.',
      'Travel through Meadow, Treetops, Clouds, Stratosphere and Space, then keep going through Candy Clouds, Rainbow Bridges, Cheese Moon, Jelly Planet, Aurora Ice and Bubble Sea. The stages repeat with shifting colors, and the climb gets trickier as you go.',
    ],
    icon: '/images/games/rocket-rabbit/app-icon.png',
    hero: `${rocketShots}/home.webp`,
    heroAlt: rocketScreens[0].alt,
    screens: rocketScreens,
    features: rocketFeatures,
    questions: [
      { question: 'Can I download Rocket Rabbit yet?', answer: 'Rocket Rabbit is in development for Android. A public download link and release date have not been announced on this site.' },
      { question: 'How do I control Rocket?', answer: 'On a phone, tilt to steer and hold a finger on the screen to fire the jetpack. In the desktop build, use the arrow keys or A/D to steer and Space to boost. Landing on a platform makes Rocket bounce automatically.' },
      { question: 'How do I unlock the other animals?', answer: 'Pip the frog joins after 30 spring bounces, Rusty the fox after 300 collected coins, and Pebble the penguin after a climb to 1,600 metres. These challenges track your progress across runs. The friends share the same movement and can wear your hats, face items, jetpacks and trails.' },
      { question: 'What are coins for?', answer: 'Coins go into a saved bank and unlock cosmetic items in the shop: fur colors for Rocket, hats, face accessories, jetpacks and trails. Fuel cans power the jetpack during a run; spending coins does not use up your fuel or undo progress toward unlocking Rusty.' },
    ],
  },
];
