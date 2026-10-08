/**
 * State machine stages for the interactive opening flow.
 * Each transition is explicit and guaranteed with no dead ends.
 */
export type FlowStage =
  | 'PASSWORD'             // Stage 1: Birthday password prompt
  | 'QUESTION_LOVE'        // Stage 2: "Do you love me?"
  | 'LOVE_NO_RESPONSE'     // Stage 2 playful fallback: "Please say yes 🥺"
  | 'GIFT_OFFER'           // Stage 3: "Here is a little gift 🎁"
  | 'GIFT_REJECT_RESPONSE' // Stage 3 playful fallback: "You have to accept..."
  | 'GIFT_BOX'             // Stage 4: Gift box revealed, awaiting tap
  | 'BIRTHDAY_REVEAL'      // Stage 5: Celebratory box opened & birthday message
  | 'LETTER'               // Stage 6: Intimate personal birthday letter
  | 'NEXT_PAGE'            // Stage 6 alias
  | 'POETRY_PAGE';         // Stage 7: Future poetry-book section placeholder
