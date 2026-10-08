/**
 * ============================================================================
 * ROMANTIC BIRTHDAY GIFT EXPERIENCE — CONFIGURATION
 * ============================================================================
 * 
 * Edit this file to customize:
 * 1. The expected birthday password
 * 2. All dialogue and question text strings
 * 3. Color accents and animation timings
 * 4. Destination for the next page
 */

export const CONFIG = {
  // --------------------------------------------------------------------------
  // 1. PASSWORD / BIRTHDAY CONFIGURATION
  // --------------------------------------------------------------------------
  // The expected birthday password.
  // Accepted format: DDMMYYYY (09/10/2005 -> "09102005").
  // The input strips slashes, dashes, and spaces, so entering
  // "09/10/2005", "09-10-2005", or "09102005" will all match.
  // 
  // >>> CHANGE HER BIRTHDATE HERE <<<
  EXPECTED_BIRTHDAY: "09102005",

  // --------------------------------------------------------------------------
  // 2. TEXT STRINGS & LABELS
  // --------------------------------------------------------------------------
  STAGE_1_PASSWORD: {
    title: "Before we begin...",
    subtitle: "Enter the date that belongs to you.",
    placeholder: "DD / MM / YYYY",
    submitButton: "Unlock ❤️",
    errorMessage: "Not quite. Try again ❤️",
    hintNote: "A special day in DDMMYYYY format",
  },

  STAGE_2_LOVE: {
    question: "Do you love me?",
    buttonYes: "Yes ❤️",
    buttonNo: "No",
    noResponseText: "Please say yes 🥺",
    noResponseButton: "Yes ❤️",
  },

  STAGE_3_GIFT: {
    question: "Here is a little gift 🎁",
    buttonAccept: "Accept",
    buttonReject: "Reject",
    rejectResponseText: "You have to accept.\nYou do not have any choice. 😌",
    rejectResponseButton: "Accept",
  },

  STAGE_4_GIFT_BOX: {
    instructionText: "Tap the gift 🎁",
    subtitleText: "A small piece of my heart, wrapped for you",
  },

  STAGE_5_CELEBRATION: {
    headline: "HAPPY BIRTHDAY ❤️",
    subtext: "Wishing you the sweetest, most magical day.",
    personalNote:
      "After all the different birthdays,\nyou finally found the day that was yours.\nAnd I'm really glad I get to be here for it. ❤️",
    nextPageButton: "Open your letter ✨",
  },

  STAGE_6_LETTER: {
    title: "For You, My Love",
    date: "09.10",
    paragraphs: [
      "Idk where to start but , my love , Happy your first real birthday , I'm glad that I'm here for you and to celebrate your 1st ever real birthday and i want to make it really special for you but the things are very limited . I realised that neither ik your address to give you physical gift nor I'm capable enough to meet you in person and make your birthday more beautiful , neither i have enough photos to make any edits and u also told me not to do that so i have to think about something else . I do not know too much about you , the things ik are not too much different from what others know about you , but still i wanna know more ❤️🩹 .",
      "You are the only one in this world who saw this side of me and I don't think anyone will ever again will see this, maybe not even you. But regardless of these restrictions and limitations I want to make you feel loved , feel wanted , feel happiness on your first ever real birthday.",
      "I'm glad that tere ko apni real dob pata chali and mere ko bataya cuz this day is not only special for you , but also for me ,cuz this is the day when my beautiful baby born and out of all circumstance and infinite possibilities we met and here we are.",
      "Really happy for you my girl , although i can't able to give you what you deserve but I'll give you everything what i can , I'll try to make you feel loved and special so you never Even have single thoughts that \"mere sath koi nhi rehta , sare bichad jaate and mujhe chor ke dur chale jaate , no one loves me , I'm alone\" cuz jabtk me hu you will feel love.",
      "You never have to ask me about to give you attention or give you priority , you are my 1st priority and my all attention and love is for you.",
      "Maybe I'll act rude someday , act like bitch someday but I hope you will not get hurt by that , because I'll always come back to you in your feets apologizing about my wrongs and faults.",
      "Happy birthday 🎂 my darling 😘 may you always keep smiling, Happy and good in health.",
    ],
    nextButton: "There's more →",
  },

  // --------------------------------------------------------------------------
  // POETRY SECTION — CHUNK 1
  // --------------------------------------------------------------------------
  POETRY_CHUNK_1: {
    // Step 1: Poetry Introduction (exact text, unmodified)
    introParagraphs: [
      "Here are some of my feelings that I somehow put into words.",
      "I never thought I'd write poems for someone. Neither was I ever too invested in writing poems — like, sitting down and thinking, “Aaj beth ke poem likhunga.”",
      "It was always just natural.",
      "Sometimes the emotions became so overwhelming that I had this urge to somehow put them into words.",
      "I'm not very good at it, and I know these aren't perfect. But I just try to put my emotions into words the best way I can.",
      "And these are some of those moments.",
    ],
    introSwipePrompt: "Swipe to continue →",
    introNextButton: "Next page →",

    // Step 3: First-Impression Note
    poem1Heading: "The first expression of you I ever put into words.",
    poem1Note: "This was how I saw you when I first started noticing you.",

    // Step 4: Canonical Artwork Asset
    poem1ImageSrc: "/HER_EYES_FINAL.png",
    poem1ImageAlt: "Her Eyes — Canonical Poem Artwork",

    // Step 5: Continuation to Chunk 2
    poem1NextPrompt: "There's another page →",
    poem1NextButton: "Next poem →",

    // Chunk 2 Placeholder
    chunk2Title: "To Be Continued...",
    chunk2Subtitle: "Chunk 2: The Next Poem",
    chunk2Message:
      "Chunk 2 placeholder reached! The next poems (Parallel Hearts, Two Birds One Moon, etc.) will be connected here seamlessly.",
  },

  // --------------------------------------------------------------------------
  // POETRY SECTION — CHUNK 2
  // --------------------------------------------------------------------------
  POETRY_CHUNK_2: {
    poem2Heading: "The first time I felt something genuinely strange — a feeling I'd never felt before.",
    poem2Note: "And somehow, I still chose that feeling, even though I already knew how it might end.",
    poem2ImageSrc: "/PARALLEL_HEARTS.png",
    poem2ImageAlt: "Parallel Hearts — Canonical Poem Artwork",
    poem2NextPrompt: "There's another page →",
    poem2NextButton: "Next poem →",
    chunk3Title: "To Be Continued...",
    chunk3Subtitle: "Chunk 3: The Next Poem",
    chunk3Message:
      "Chunk 3 placeholder reached! The upcoming poems will be connected here seamlessly.",
  },

  // --------------------------------------------------------------------------
  // POETRY SECTION — CHUNK 3
  // --------------------------------------------------------------------------
  POETRY_CHUNK_3: {
    poem3Heading: "I still remember that night when we were talking about something that felt close to impossible.",
    poem3Note: "And these are the emotions I felt that night.",
    poem3ImageSrc: "/TWO_BIRDS_ONE_MOON.png",
    poem3ImageAlt: "Two Birds One Moon — Canonical Poem Artwork",
    poem3NextPrompt: "There's another page →",
    poem3NextButton: "Next poem →",
    chunk4Title: "To Be Continued...",
    chunk4Subtitle: "Chunk 4: The Next Poem",
    chunk4Message:
      "Chunk 4 placeholder reached! The upcoming poems will be connected here seamlessly.",
  },

  // --------------------------------------------------------------------------
  // POETRY SECTION — CHUNK 4
  // --------------------------------------------------------------------------
  POETRY_CHUNK_4: {
    poem4Note: "You remember we wrote this poem together that night",
    poem4ImageSrc: "/WAQT_KA_PARDA.png",
    poem4ImageAlt: "Waqt Ka Parda — Canonical Poem Artwork",
    poem4NextPrompt: "There's another page →",
    poem4NextButton: "Next poem →",
    chunk5Title: "To Be Continued...",
    chunk5Subtitle: "Final Poem: Yearning Night",
    chunk5Message:
      "Chunk 5 placeholder reached! The final poem (Yearning Night) will be connected here seamlessly.",
  },

  // --------------------------------------------------------------------------
  // POETRY SECTION — CHUNK 5 (FINAL POEM)
  // --------------------------------------------------------------------------
  POETRY_CHUNK_5: {
    poem5Note: "Every night I crave for you, every day I hope for you.",
    poem5ImageSrc: "/YEARNING_NIGHT.png",
    poem5ImageAlt: "Yearning Night — Canonical Poem Artwork",
    closingLabel: "End of Poetry Collection",
    closingSubtitle: "You have reached the final page of this collection.",
    goToDiaryButton: "Small Diary →",
  },

  // --------------------------------------------------------------------------
  // SMALL DIARY SECTION
  // --------------------------------------------------------------------------
  SMALL_DIARY: {
    sectionTitle: "Small Diary",
    introParagraphs: [
      "My love, although I'm not capable of celebrating your birthday in person or meeting you in person, and I don't have your address, any way to send you a gift, or enough photos to make edits for you. This is what I can do.",
      "This is a small part of some of our memories — some happy moments, some sad moments. Sometimes we fought, sometimes we fixed things, but one thing is sure: every time we went through something together, we became closer and closer.",
    ],
    introButton: "Open Diary Pages →",
    page1Label: "Page 1 · 03 April 2025",
    page1ImageSrc: "/1.jpg",
    page1ImageAlt: "Handwritten Diary Page 1 — 03 April 2025",
    page1NextButton: "Next page →",
    page2Label: "Page 2 · July 2025",
    page2ImageSrc: "/2.jpg",
    page2ImageAlt: "Handwritten Diary Page 2 — July 2025 continuation",
    closingNote: "These are just the first few pages. I'll give you the complete diary separately, so you can read it whenever you have the time. ❤️",
    finalMessageButton: "Final Birthday Message →",
  },

  // --------------------------------------------------------------------------
  // FINAL BIRTHDAY MESSAGE SECTION (Emotional Culmination)
  // --------------------------------------------------------------------------
  FINAL_MESSAGE: {
    transitionIntro: "And now, one last thing…",
    heading: "I'm so Thankful for You.",
    paragraphs: [
      "Thank you for coming into my life, for making me smile, for understanding me, for standing with me in every situation.",
      "I'm thankful that the Universe sent you and I'm thankful that I found You!!",
      "I'm not very capable but I'll try to give you everything what I can and love you with my everything, you will be never alone my darling.",
      "And I'm sorry for the times I've hurt you, for my mistakes, my wrongs, and the moments when I wasn't the person you needed me to be. I'm still learning, and I'll keep trying to become better for you.",
    ],
    birthdayWish: "Happy birthday to you.",
    finalSignoff: "Made with everything I could give you.",
    finalHeart: "❤️",
  },

  STAGE_7_POETRY: {
    placeholderTitle: "Poetry Collection Awaits",
    placeholderMessage:
      "Stage 7 placeholder reached! This is where your custom poetry collection and intimate verse pages will connect.",
    replayButton: "Back to Beginning ↺",
  },

  // --------------------------------------------------------------------------
  // 3. ANIMATION & TIMING SETTINGS
  // --------------------------------------------------------------------------
  TIMINGS: {
    modalTransitionMs: 400, // Duration of popup exit/enter
    doubleTapLockMs: 500,   // Debounce window to prevent rapid double-clicks
    boxOpenDelayMs: 600,    // Delay between tapping the box and the celebratory burst
  },
};
